from table import Table, AssiciatedTable
import boto3
from boto3.dynamodb.conditions import Key, Attr
from uuid import uuid4
from subactions import mix_colors, serialize_note

# All the CRUD that the users can do to a table.


class User():
    user_uuid = None
    user_table = None
    tags_table = None
    notes_table = None
    note_tag_association_table = None

    def __init__(self, user_uuid):
        self.user_uuid = user_uuid
        self.user_table = Table('SunriseNotes-Users')
        self.tags_table = Table('SunriseNotes-Tags')
        self.notes_table = AssiciatedTable('SunriseNotes-Notes', 'SunriseNotes-NoteTagAssociation', 'SunriseNotes-Tags',
                                           'NoteUUID-index', 'NoteUUID', 'TagUUID-index', 'TagUUID')
        self.note_tag_association_table = Table(
            'SunriseNotes-NoteTagAssociations')

    def get_all_tags(self):
        return self.tags_table.query(
            "UserUUID-index", Key("UserUUID").eq(self.user_uuid))

    def get_all_notes(self):
        return self.notes_table.query(
            "UserUUID-index", Key("UserUUID").eq(self.user_uuid), True)

    # returns the tag object from the table
    def get_tag(self, uuid):
        return self.tags_table.get_item(uuid)

    # returns the note object from the table
    def get_note(self, uuid):
        return self.notes_table.get_item(uuid)

    # puts the tag object in the table
    def put_tag(self, tag_object):
        if ('UUID' not in tag_object) or tag_object['UUID'] is -1:
            tag_object['UUID'] = uuid4().hex
        tag_object['UserUUID'] = self.user_uuid

        return self.tags_table.put_item(tag_object)

    # puts the note object in the table
    def put_note(self, note_object):
        if ('UUID' not in note_object) or note_object['UUID'] is -1:
            note_object['UUID'] = uuid4().hex
        note_object['UserUUID'] = self.user_uuid

        return self.notes_table.put_item({**note_object, 'tagUUIDs': None}, note_object['tagUUIDs'])

    # deletes the tag and removes itself from any notes
    def delete_tag(self, uuid):
        pass

    def delete_note(self, uuid):
        pass

    def generate_note_rgb(self, note):
        return {'r': 100, 'g': 200, 'b': 300}

    # returns a set of colored notes
    def get_noteset_by_tag_uuids(self, tag_uuids, operation):
        # get all notes
        notes = self.get_all_notes()

        # apply the correct filter
        if (len(tag_uuids) == 0):
            notes = list(filter(lambda note: len(
                note['associatedItems']) == 0, notes))
        elif operation == "intersection":
            notes = list(filter(lambda note:
                                all(tag in tag_uuids for tag in note['associatedItems']), notes))
        elif operation == "union":
            notes = list(filter(lambda note:
                                any(tag in tag_uuids for tag in note['associatedItems']), notes))

        # color
        for note in notes:
            note['rgb'] = self.generate_note_rgb(note)
        return notes
