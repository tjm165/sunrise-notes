from table import Table
import boto3
from boto3.dynamodb.conditions import Key, Attr
import uuid

class Actions():
    def get_tags_by_userUUID(user_uuid):
        user_table = Table('NotesApp-Users')
        tag_table = Table('NotesApp-Tags')
        
        user = user_table.get_item(user_uuid)
        tag_uuids = user['tagUUIDs']
        tags = []

        for uuid in tag_uuids:
            tags.append(tag_table.get_item(uuid))
        return tags
        
    def get_note_by_uuid(note_uuid):
        note_table = Table('NotesApp-Notes')
        junction_table = Table('NotesApp-NoteTagJunction')
        
        note = note_table.get_item(note_uuid)
        note['tags'] = []
        for junction in junction_table.scan(Key('noteUUID').eq(note_uuid)):
            note['tags'].append(junction['tagUUID'])
        return note
        
