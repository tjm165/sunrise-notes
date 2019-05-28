import boto3
import json
import decimal
from uuid import UUID
import uuid
from boto3.dynamodb.conditions import Key, Attr

class Actions():
    #takes a user UUID and returns the corresponding tag UUIDs
    def get_tags(input):
        table = Helper.get_users_table()
        UUID = input['UUID']
        try: #get the user's tagUUIDs property
            tagUUIDs = table.get_item(
                Key={
                    'UUID': UUID
                }
            )['Item']['tagUUIDs']
        except ClientError as e:
            return e.response['Error']['Message']
        else: #get all the tags in tagUUIDs
            table = Helper.get_tags_table()
            tags = []
            for UUID in tagUUIDs:
                tags.append(Helper.get_tag(UUID))
        return tags
        
    #get notes
    
    def put_tag(body):
        table = Helper.get_tags_table()
        
        if hasattr(body, 'UUID'):
            UUID = body['UUID']
        else:
            UUID = Helper.newUUID()
            
        if hasattr(body, 'noteIndexes'):
            noteIndexes=body['noteIndexes']
        else:
            noteIndexes= None

        value=body['value']
        userUUID=body['userUUID']
        
        response = table.put_item(Item={
            'value':value,
            'UUID' : UUID,
            'noteIndexes' :noteIndexes,
            'userUUID' : userUUID
            }
        )
        return UUID
            
    def put_note(event):
        table = Helper.get_notes_table()
    
        if hasattr(event, 'UUID'):
            UUID = event['UUID']
        else:
            UUID = Helper.newUUID()
            
        value=event['value']
        tagIndexes=event['tagIndexes']
        userUUID=event['userUUID']
        
        response = table.put_item(Item={
            'value':value,
            'UUID' : UUID,
            'tagIndexes' :tagIndexes,
            'userUUID' : userUUID
            }
        )
        return UUID
        
class Helper():
    def get_users_table():
        dynamodb = boto3.resource('dynamodb', region_name='us-east-2')
        return dynamodb.Table('NotesApp-Users')
    def get_tags_table():
        dynamodb = boto3.resource('dynamodb', region_name='us-east-2')
        return dynamodb.Table('NotesApp-Tags')
    def get_notes_table():
        dynamodb = boto3.resource('dynamodb', region_name='us-east-2')
        return dynamodb.Table('NotesApp-Notes')
    def newUUID():
        #return json.dumps(uuid.uuid4(), cls=UUIDEncoder);
        return uuid.uuid4().hex
    def get_tag(tagUUID):
        table = Helper.get_tags_table()
        try:
            response = table.get_item(
                Key={
                    'UUID': tagUUID
                }
            )
        except ClientError as e:
            return e.response['Error']['Message']
        else:
            item = response['Item']
        return item

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

def test(action):
    return action

#decides what action to call
def lambda_handler(event, context):

    action = event['action']
    body = event['body-json']
    querystring = event['params']['querystring']
    
    if (action == "get_tags"):
        return Actions.get_tags(querystring)
    if (action == "put_tag"):
        return Actions.put_tag(body)
    if (action == "get_notes"):
        return Actions.get_note(querystring)
    if (action == "put_note"):
        return Actions.put_note(body)
    if (action == "test"):
        return test(action)

        
    return "action not supported: " + action
   