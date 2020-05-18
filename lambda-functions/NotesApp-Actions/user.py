from table import Table, AssiciatedTable
import boto3
from boto3.dynamodb.conditions import Key, Attr
from uuid import uuid4
from subactions import *
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
        self.notes_table = AssiciatedTable('SunriseNotes-Notes', 'SunriseNotes-NoteTagAssociation', 'SunriseNotes-Tags',
                                           'NoteUUID-index', 'NoteUUID', 'TagUUID-index', 'TagUUID')
        self.tags_table = AssiciatedTable('SunriseNotes-Tags', 'SunriseNotes-NoteTagAssociation', 'SunriseNotes-Notes',
                                          'TagUUID-index', 'TagUUID', 'NoteUUID-index', 'NoteUUID')

        self.note_tag_association_table = Table(
            'SunriseNotes-NoteTagAssociations')

    def get_all_tags(self):
        return self.tags_table.query(
            "UserUUID-index", Key("UserUUID").eq(self.user_uuid))

    def get_all_notes(self, only_associate_uuid):
        return self.notes_table.query(
            "UserUUID-index",
            Key("UserUUID").eq(self.user_uuid),
            True,
            "tagUUIDs",
            only_associate_uuid)

    # returns the tag object from the table
    def get_tag(self, uuid):
        return self.tags_table.get_item(uuid)

    # returns the note object from the table
    def get_note(self, uuid, only_associate_uuid):
        return self.notes_table.get_item(uuid, True, "tagUUIDs", only_associate_uuid)

    # puts the tag object in the table
    def put_tag(self, tag_object):
        if ('UUID' not in tag_object) or tag_object['UUID'] == "NEW":
            tag_object['UUID'] = uuid4().hex
        tag_object['UserUUID'] = self.user_uuid
        self.tags_table.put_item(tag_object)
        return {'UUID': tag_object['UUID']}

    # puts the note object in the table
    def put_note(self, note_object):
        if ('UUID' not in note_object) or note_object['UUID'] == "NEW":
            note_object['UUID'] = uuid4().hex
        note_object['UserUUID'] = self.user_uuid
        self.notes_table.put_item(
            {**note_object, 'tagUUIDs': None}, note_object['tagUUIDs'])
        return {'UUID': note_object['UUID']}

    # deletes the tag and removes itself from any notes
    def delete_tag(self, uuid):
        return self.tags_table.delete_item(uuid)

    def delete_note(self, uuid):
        return self.notes_table.delete_item(uuid)

    def generate_relative_note_rgb(self, note, relative_tag_uuids):
        color = {'r': 0, 'g': 0, 'b': 0}
        common_tag_uuids = intersection(relative_tag_uuids, note['tagUUIDs'])

        # return {'rel': relative_tag_uuids, 'note': note['tagUUIDs'], 'com': common_tag_uuids}
        if (len(common_tag_uuids) > 0):
            color = self.get_tag(common_tag_uuids[0])['rgb']
            for tag_uuid in common_tag_uuids[0:]:
                color = mix_colors(
                    color, self.get_tag(tag_uuid)['rgb'])
        return color

    # returns a set of colored notes
    def get_noteset_by_tag_uuids(self, tag_uuids, operation):
        # get all notes
        notes = self.get_all_notes(True)
        note_dict = {}

        # apply the correct filter
        if (len(tag_uuids) == 0):
            notes = list(filter(lambda note: len(
                note['tagUUIDs']) == 0, notes))
        elif operation == "intersection":
            notes = list(filter(lambda note:
                                all(tag in tag_uuids for tag in note['tagUUIDs']), notes))
        elif operation == "union":
            notes = list(filter(lambda note:
                                any(tag in tag_uuids for tag in note['tagUUIDs']), notes))

        # color
        for note in notes:
            note['rgb'] = self.generate_relative_note_rgb(note, tag_uuids)
            note_dict[note['UUID']] = note
        note_dict["NEW"] = {'rgb': {'r': 0, 'g': 0, 'b': 0},
                            'content': "", 'secondaryContent': False}
        return note_dict
