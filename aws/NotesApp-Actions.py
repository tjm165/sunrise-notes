import boto3
import json
import decimal
from uuid import UUID
import uuid
from boto3.dynamodb.conditions import Key, Attr

class Actions():
    def get_tag(event):
        table = Helper.get_tags_table();
        UUID = event['UUID']
        try:
            response = table.get_item(
                Key={
                    'UUID': UUID
                }
            )
        except ClientError as e:
            return e.response['Error']['Message']
        else:
            item = response['Item']
            return json.dumps(item, indent=4, cls=DecimalEncoder)
    
    def put_tag(event):
        table = Helper.get_tags_table();
    
        if hasattr(event, 'UUID'):
            UUID = event['UUID'];
        else:
            UUID = Helper.newUUID();
            
        value=event['value'];
        noteIndexes=event['noteIndexes'];
        userId=event['userId'];
        
        response = table.put_item(Item={
            'value':value,
            'UUID' : UUID,
            'noteIndexes' :noteIndexes,
            'userId' : userId
            }
        )
        return UUID
    
    def get_note(event):
        table = Helper.get_notes_table();
        UUID = event['UUID']
        try:
            response = table.get_item(
                Key={
                    'UUID': '1'
                }
            )
        except ClientError as e:
            return e.response['Error']['Message']
        else:
            item = response['Item']
            return json.dumps(item, indent=4, cls=DecimalEncoder)
            
    def put_note(event):
        table = Helper.get_notes_table();
    
        if hasattr(event, 'UUID'):
            UUID = event['UUID'];
        else:
            UUID = Helper.newUUID();
            
        value=event['value'];
        tagIndexes=event['tagIndexes'];
        userId=event['userId'];
        
        response = table.put_item(Item={
            'value':value,
            'UUID' : UUID,
            'tagIndexes' :tagIndexes,
            'userId' : userId
            }
        )
        return UUID
        
class Helper():
    def get_tags_table():
        dynamodb = boto3.resource('dynamodb', region_name='us-east-2');
        return dynamodb.Table('NotesApp-Tags');
    def get_notes_table():
        dynamodb = boto3.resource('dynamodb', region_name='us-east-2');
        return dynamodb.Table('NotesApp-Notes');
    def newUUID():
        #return json.dumps(uuid.uuid4(), cls=UUIDEncoder);
        return uuid.uuid4().hex
        
# Helper class to convert a DynamoDB item to JSON.
class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            if o % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)
        
class UUIDEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, UUID):
            # if the obj is uuid, we simply return the value of uuid
            return obj.hex
        return json.JSONEncoder.default(self, obj)

#decides what action to call
def lambda_handler(event, context):
    action = event['action'];
    
    #return Helper.newUUID();
    
    if (action == "get_tag"):
        return Actions.get_tag(event)
    if (action == "put_tag"):
        return Actions.put_tag(event)
    if (action == "get_note"):
        return Actions.get_note(event)
    if (action == "put_note"):
        return Actions.put_note(event)

        
    return "action not supported"
   