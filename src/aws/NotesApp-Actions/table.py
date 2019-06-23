import boto3
from boto3.dynamodb.conditions import Key, Attr

class Table():
    table = None
    dynamodb = boto3.resource('dynamodb', region_name='us-east-2')

    def __init__(self, table_name):
        self.table = self.dynamodb.Table(table_name)

    def get_item(self, UUID):
        return self.table.get_item(Key={'UUID': UUID})['Item']

    def put_item(self, item):
        return self.table.put_item(Item=item)
        
    def delete_item(self, key):
        return self.table.delete_item(Key=key)
        
    def scan(self, fe):
        return self.table.scan(FilterExpression=fe)['Items']
        
    def table(self):
        return self.table
         