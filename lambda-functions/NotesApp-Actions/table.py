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
        clone = item.copy()

        for key, val in item.items():
            if val == set():
                del clone[key]

        return self.table.put_item(Item=clone)

    def delete_item(self, UUID):
        return self.table.delete_item(Key={'UUID': UUID})

    def query(self, index_name, key_condition_expression):
        return self.table.query(IndexName=index_name, KeyConditionExpression=key_condition_expression)


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

    def get_item(self, UUID):
        item = super().get_item(UUID)
        item["associatedItems"] = {}
        associations = self.association_table.query(
            self.index_name,
            Key(self.key_name).eq(UUID),
        )['Items']

        for association in associations:
            associated_uuid = association[self.associated_key_name]
            associated_item = self.associated_table.get_item(
                associated_uuid)
            item["associatedItems"][associated_uuid] = associated_item

        return item

    def put_item(self, item, associated_items):
        if ('UUID' not in item) or item['UUID'] is -1:
            item['UUID'] = new_uuid()

        super().put_item(item)
        for associated_item in associated_items:
            self.associated_table.put_item(associated_item)
            self.association_table.put_item(
                {'UUID': new_uuid(), self.key_name: item['UUID'], self.associated_key_name: associated_item['UUID']})

        return item['UUID']

    def delete_item(self, UUID):
        # so if this is a notes table then here is a note
        # you need to delete the note and the assiciations
        return None
