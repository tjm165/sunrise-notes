import boto3
from boto3.dynamodb.conditions import Key, Attr
from subactions import new_uuid


class Table():
    table = None
    dynamodb = boto3.resource('dynamodb', region_name='us-east-2')

    def __init__(self, table_name):
        self.table = self.dynamodb.Table(table_name)

    def get_item(self, UUID):
        return self.table.get_item(Key={'UUID': UUID})['Item']

    def put_item(self, item):
        clone = item

        for key, val in item.items():
            if val == set():
                del clone[key]

        return self.table.put_item(Item=clone)

    def delete_item(self, UUID):
        return self.table.delete_item(Key={'UUID': UUID})

    def query(self, index_name, key_condition_expression):
        return self.table.query(IndexName=index_name, KeyConditionExpression=key_condition_expression)['Items']


class AssiciatedTable(Table):
    association_table = None
    associated_table = None
    index_name = None
    key_name = None
    associated_index_name = None
    associated_key_name = None

    def __init__(self, table_name, association_table_name, associated_table_name, index_name, key_name, associated_index_name, associated_key_name):
        super().__init__(table_name)
        self.association_table = Table(association_table_name)
        self.associated_table = Table(associated_table_name)
        self.index_name = index_name
        self.key_name = key_name
        self.associated_index_name = associated_index_name
        self.associated_key_name = associated_key_name

    def __get_associations(self, uuid):
        return self.association_table.query(
            self.index_name,
            Key(self.key_name).eq(uuid),
        )

    def __associate(self, item, alias="associatedItems", only_associate_uuid=False):
        associations = self.__get_associations(item['UUID'])

        if only_associate_uuid:
            item[alias] = []
            for association in associations:
                associated_uuid = association[self.associated_key_name]
                item[alias].append(associated_uuid)
        else:
            item[alias] = {}
            for association in associations:
                associated_uuid = association[self.associated_key_name]
                associated_item = self.associated_table.get_item(
                    associated_uuid)
                item[alias][associated_uuid] = associated_item
        return item

    def query(self, index_name, key_condition_expression, with_associated_items=False, alias="associatedItem", only_associate_uuid=True):
        items = super().query(index_name, key_condition_expression)

        if with_associated_items:
            for item in items:
                item = self.__associate(item, alias, only_associate_uuid)
        return items

    def get_item(self, UUID, with_associated_items=False, alias=False, only_associate_uuid=False):
        item = super().get_item(UUID)

        if with_associated_items:
            item = self.__associate(item, alias, only_associate_uuid)

        return item

    # the associated_items must already exist
    def put_item(self, item, associated_item_uuids=None):
        if ('UUID' not in item) or item['UUID'] is -1:
            item['UUID'] = new_uuid()

        super().put_item(item)

        if associated_item_uuids:
            for association in self.__get_associations(item['UUID']):
                self.association_table.delete_item(association['UUID'])

            # then call this
            for associated_item_uuid in associated_item_uuids:
                self.association_table.put_item({
                    'UUID': new_uuid(),
                    self.key_name: item['UUID'],
                    self.associated_key_name: associated_item_uuid
                })

        return item['UUID']

    def delete_item(self, UUID):
        associations = self.__get_associations(UUID)
        super().delete_item(UUID)
        for association in associations:
            self.association_table.delete_item(association['UUID'])

        return None
