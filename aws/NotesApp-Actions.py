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
        
    def get_notes(input):
        tagUUIDs = input.split(",")
        noteUUIDset = set()
        
        tagTable=Helper.get_tags_table()
        for tagUUID in tagUUIDs:
            tags = tagTable.get_item(
                Key={
                    'UUID': tagUUID
                }
            )['Item']['noteUUIDs']
            noteUUIDset.update(tags)
            
        notes = []
        noteTable=Helper.get_notes_table()
        for noteUUID in noteUUIDset:
            note = noteTable.get_item(
                Key={
                    'UUID':noteUUID
                }
            )['Item']
            notes.append(note)
        
        return notes
    
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

def test(args):
    #return args["array"]
    #return json.loads(args["array"])
    return args

#decides what action to call
def lambda_handler(event, context):

    action = event['action']
    body = event['body-json']
    querystring = event['params']['querystring']
    header = event['params']['header']

    if (action == "get_tags"):
        return Actions.get_tags(querystring)
    if (action == "put_tag"):
        return Actions.put_tag(body)
    if (action == "get_notes"):
        return Actions.get_notes(header)
    if (action == "put_note"):
        return Actions.put_note(body)
    if (action == "test"):
        return test(querystring)

        
    return "action not supported: " + action
   