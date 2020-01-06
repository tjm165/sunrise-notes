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

    def __init__(self, user_uuid):
        self.user_uuid = user_uuid
        self.user_table = Table('SunriseNotes-Users')
        self.tags_table = Table('SunriseNotes-Tags')
        self.notes_table = AssiciatedTable('SunriseNotes-Notes', 'SunriseNotes-NoteTagAssociation', 'SunriseNotes-Tags',
                                           'NoteUUID-index', 'NoteUUID', 'TagUUID-index', 'TagUUID')

    def get_all_notes(self):
        note_uuids = self.notes_table.query(
            "UserUUID-index", Key("UserUUID").eq(self.user_uuid))['Items']

        notes = []
        for uuid in note_uuids:
            notes.append(self.get_note(uuid))
        return notes

    def get_all_tags(self):
        tag_uuids = self.tags_table.query(
            "UserUUID-index", Key("UserUUID").eq(self.user_uuid))['Items']
        return tag_uuids

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

        return self.notes_table.put_item(note_object)

    # deletes the tag and removes itself from any notes
    def delete_tag(self, uuid):
        self.tags_table.delete_item(uuid)
        for note in self.get_all_notes():
            if uuid in note['tagUUIDs']:
                note['tagUUIDs'].remove(uuid)
            self.notes_table.put_item(note)

    def delete_note(self, uuid):
        self.notes_table.delete_item(uuid)

    # returns a set of colored notes
    # This is the only function that is O(Junctions)

    def get_noteset_by_tag_uuids(self, tag_uuids, operation):
        if (len(tag_uuids) == 0):
            return self.get_notes_with_no_tags()
        if operation == "union":
            return self.get_notes_with_any_tags(tag_uuids)
        if operation == "intersection":
            return self.get_notes_with_all_tags(tag_uuids)
        if operation == "complement":
            return self.get_notes_without_any_of(tag_uuids)

    def get_notes_with_no_tags(self):
        notes = {}
        for note in self.get_all_notes():
            if (len(note['tagUUIDs']) == 0):
                notes[note['UUID']] = note
                notes[note['UUID']]['rgb'] = {'r': 255, 'g': 255, 'b': 255}
        return notes

    def get_notes_with_all_tags(self, tag_uuids):
        noteset = self.get_all_notes().copy()

        mixed_colors = self.get_tag(tag_uuids[0])['rgb']
        iter_tags = iter(tag_uuids)
        next(iter_tags)

        for tag_uuid in iter_tags:
            mixed_colors = mix_colors(
                mixed_colors, self.get_tag(tag_uuid)['rgb'])

        notedict = {}
        for note in noteset:
            notedict[note['UUID']] = note

        for note in noteset:
            for tag in tag_uuids:
                if note['UUID'] in notedict:
                    if tag not in note['tagUUIDs']:
                        del notedict[note['UUID']]
                    else:
                        notedict[note['UUID']]['rgb'] = mixed_colors

        return notedict

    def get_notes_with_any_tags(self, tag_uuids):
        noteset = {}
        for note in self.get_all_notes():
            for tag_uuid in note['tagUUIDs']:
                if tag_uuid in tag_uuids:
                    tag_rgb = self.get_tag(tag_uuid)['rgb']
                    if note['UUID'] in noteset:
                        noteset[note['UUID']]['rgb'] = mix_colors(tag_rgb,
                                                                  noteset[note['UUID']]['rgb'])
                    else:
                        noteset[note['UUID']] = note
                        noteset[note['UUID']]['rgb'] = tag_rgb
        return noteset

    def get_notes_without_any_of(self, tag_uuids):
        noteset = self.get_all_notes().copy()

        notedict = {}
        for note in noteset:
            notedict[note['UUID']] = note

        for note in noteset:
            for tag in tag_uuids:
                if note['UUID'] in notedict:
                    if tag in note['tagUUIDs']:
                        del notedict[note['UUID']]
                    else:
                        notedict[note['UUID']]['rgb'] = {
                            'r': 255, 'g': 255, 'b': 255}

        return notedict
