import boto3
import json
import decimal
from uuid import UUID
import uuid
from boto3.dynamodb.conditions import Key, Attr

class Actions():
    def get_tags_by_userUUID(userUUID):
        table = Table('NotesApp-Users')
        tagUUIDs = table.get_item(userUUID)['tagUUIDs']
        table = Table('NotesApp-Tags')
        tags = []

        for UUID in tagUUIDs:
            tags.append(table.get_item(UUID))
        return tags

    def get_notes_by_UUIDs(noteUUIDs):
        table = Table('NotesApp-Notes')
        notes = []

        for UUID in noteUUIDs:
            notes.append(table.get_item(UUID))
        return notes

    def get_noteset_by_tagUUIDs(tagUUIDs):
        table = Table('NotesApp-Tags')
        noteUUIDset = set()

        for tagUUID in tagUUIDs:
            noteUUIDs = table.get_item(tagUUID)['noteUUIDs']
            noteUUIDset.update(noteUUIDs) #this is the line that'll change based on the operation
            #https://www.w3schools.com/python/python_sets.asp

        return Actions.get_notes_by_UUIDs(noteUUIDset)

class Table():
    table = None
    dynamodb = boto3.resource('dynamodb', region_name='us-east-2')

    def __init__(self, table_name):
        self.table = self.dynamodb.Table(table_name)

    def get_item(self, UUID):
        return self.table.get_item(Key={'UUID': UUID})['Item']

class Helper():
    def newUUID():
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

    action = event['action']
    body = event['body-json']
    querystring = event['params']['querystring']
    
    if (action == "get_tags"):
        return Actions.get_tags_by_userUUID(querystring['UUID'])
    if (action == "put_tag"):
        return Actions.put_tag(body)
    if (action == "get_notes"):
        return Actions.get_notes_by_UUIDs(querystring['UUIDs'].split(","))
    if (action == "get_noteset"):
        return Actions.get_noteset_by_tagUUIDs(querystring['UUIDs'].split(","))
    if (action == "put_note"):
        return Actions.put_note(body)

        
    return "action not supported: " + action
