from table import Table
import boto3
from boto3.dynamodb.conditions import Key, Attr
import uuid

class Actions():
    def get_tags_by_user_uuid(user_uuid):
        user_table = Table('NotesApp-Users')
        tag_table = Table('NotesApp-Tags')
        
        user = user_table.get_item(user_uuid)
        tag_uuids = user['tagUUIDs']
        tags = []

        for uuid in tag_uuids:
            tags.append(tag_table.get_item(uuid))
        return tags
        
    def get_noteset_by_tag_uuids(tag_uuids):
        junction_table = Table('NotesApp-NoteTagJunction')
        notes_table = Table('NotesApp-Notes')
        
        dict = {}
        for tag_uuid in tag_uuids:
            for junction in junction_table.scan(Key('tagUUID').eq(tag_uuid)):
                note_uuid = junction['noteUUID']
                if note_uuid in dict:
                    dict[note_uuid]['color'] = 'mixed'
                else:
                    dict[note_uuid] = notes_table.get_item(note_uuid)
                    dict[note_uuid]['color'] = 'og'
        
        return dict
        
    def get_note_by_uuid(note_uuid):
        note_table = Table('NotesApp-Notes')
        junction_table = Table('NotesApp-NoteTagJunction')
        
        note = note_table.get_item(note_uuid)
        note['tags'] = []
        for junction in junction_table.scan(Key('noteUUID').eq(note_uuid)):
            note['tags'].append(junction['tagUUID'])
            
        return note
        
