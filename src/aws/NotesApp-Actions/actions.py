from table import Table
import boto3
from boto3.dynamodb.conditions import Key, Attr
import uuid
from subactions import mix_colors

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
        
    def get_note_set_by_tag_uuids(tag_uuids):
        junction_table = Table('NotesApp-NoteTagJunction')
        notes_table = Table('NotesApp-Notes')
        tags_table = Table('NotesApp-Tags')
        
        dict = {}
        for tag_uuid in tag_uuids:
            for junction in junction_table.scan(Key('tagUUID').eq(tag_uuid)):
                note_uuid = junction['noteUUID']
                tag_rgb = tags_table.get_item(tag_uuid)['rgb']
                if note_uuid in dict:
                    dict[note_uuid]['rgb'] = mix_colors(dict[note_uuid]['rgb'], tag_rgb)
                else:
                    dict[note_uuid] = notes_table.get_item(note_uuid)
                    dict[note_uuid]['rgb'] = tag_rgb
        
        return dict
        
    def get_note_by_uuid(note_uuid):
        note_table = Table('NotesApp-Notes')
        junction_table = Table('NotesApp-NoteTagJunction')
        
        note = note_table.get_item(note_uuid)
        note['tagUUIDs'] = []
        for junction in junction_table.scan(Key('noteUUID').eq(note_uuid)):
            note['tagUUIDs'].append(junction['tagUUID'])
            
        return note
        
    def post_note(data):
        note_object = data['noteObject']
        insert_tags = data['insertTags']
        remove_tags = data['removeTags']
        
        note_table = Table('NotesApp-Notes')
        junction_table = Table('NotesApp-NoteTagJunction')

        if 'UUID' not in note_object:
           note_object['UUID'] = uuid.uuid4().hex
        for tagUUID in insert_tags: #handle the insert tags
            junction={}
            junction['UUID'] = uuid.uuid4().hex
            junction['noteUUID'] = note_object['UUID']
            junction['tagUUID'] = tagUUID
            junction_table.put_item(junction) 
            
        for tagUUID in remove_tags: #handle the insert tags.. 
            junction={}
            junction['UUID'] = uuid.uuid4().hex
            note_uuid = note_object['UUID']
            junctionUUID = junction_table.scan(Key('noteUUID').eq(note_uuid) & Key('tagUUID').eq(tagUUID))[0]['UUID']
            junction_table.delete_item({'UUID': junctionUUID}) 

        note_table.put_item(note_object)
        return True
        
        