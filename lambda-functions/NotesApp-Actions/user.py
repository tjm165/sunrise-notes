from table import Table
import boto3
from boto3.dynamodb.conditions import Key, Attr
from uuid import uuid4
from subactions import mix_colors, serialize_note

# All the CRUD that the users can do to a table.
# All public functions are secure


class User():
    user_table = None
    tags_table = None
    notes_table = None

    __secure_user_object = None

    def __init__(self, user_uuid):
        self.user_table = Table('NotesApp-Users')
        self.tags_table = Table('NotesApp-Tags')
        self.notes_table = Table('NotesApp-Notes')
        self.__secure_user_object = self.user_table.get_item(user_uuid)

    def get_secure_note_uuids(self):
        if "noteUUIDs" not in self.__secure_user_object:
            self.__secure_user_object['noteUUIDs'] = set()
        return self.__secure_user_object['noteUUIDs']

    def get_secure_tag_uuids(self):
        if "tagUUIDs" not in self.__secure_user_object:
            self.__secure_user_object['tagUUIDs'] = set()
        return self.__secure_user_object['tagUUIDs']

    def save_permissions(self):
        return self.user_table.put_item(self.__secure_user_object)

    def is_tag_secure(self, uuid):
        return uuid in self.get_secure_tag_uuids()

    def is_note_secure(self, uuid):
        return uuid in self.get_secure_note_uuids()

    def get_all_notes(self):
        notes = []
        for uuid in self.get_secure_note_uuids():
            notes.append(self.get_note(uuid))
        return notes

    def get_all_tags(self):
        tags = []
        for uuid in self.get_secure_tag_uuids():
            tags.append(self.get_tag(uuid))
        return tags

    # returns the tag object from the table

    def get_tag(self, uuid):
        self.is_tag_secure(uuid)
        return self.tags_table.get_item(uuid)

    # returns the note object from the table
    def get_note(self, uuid):
        self.is_note_secure(uuid)
        return self.notes_table.get_item(uuid)

    # puts the tag object in the table
    def put_tag(self, tag_object):
        self.is_tag_secure(tag_object['UUID'])
        if ('UUID' not in tag_object) or tag_object['UUID'] is -1:
            tag_object['UUID'] = uuid4().hex
            self.get_secure_tag_uuids().add(tag_object['UUID'])

        return self.tags_table.put_item(tag_object)

    # puts the note object in the table
    def put_note(self, note_object):
        self.is_note_secure(note_object['UUID'])
        if ('UUID' not in note_object) or note_object['UUID'] is -1:
            note_object['UUID'] = uuid4().hex
            self.get_secure_note_uuids().add(note_object['UUID'])

        return self.notes_table.put_item(note_object)

    # deletes the tag and removes itself from any notes
    def delete_tag(self, uuid):
        self.is_tag_secure(uuid)
        self.tags_table.delete_item(uuid)
        self.get_secure_tag_uuids().remove(uuid)
        for note in self.get_all_notes():
            if uuid in note['tagUUIDs']:
                note['tagUUIDs'].remove(uuid)
            self.notes_table.put_item(note)

    def delete_note(self, uuid):
        self.is_note_secure(uuid)
        self.notes_table.delete_item(uuid)
        self.get_secure_note_uuids().remove(uuid)

    # returns a set of colored notes
    # This is the only function that is O(Junctions)

    def get_noteset_by_tag_uuids(self, tag_uuids, operation):
        if (len(tag_uuids) == 0):
            return self.get_notes_with_no_tags()
        if operation == "union":
            return self.get_notes_with_all_tags(tag_uuids)
        if operation == "intersection":
            return self.get_notes_with_any_tags(tag_uuids)
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

        notedict = {}
        for note in noteset:
            notedict[note['UUID']] = note

        for note in noteset:
            for tag in tag_uuids:
                if note['UUID'] in notedict:
                    if tag not in note['tagUUIDs']:
                        del notedict[note['UUID']]
                    else:
                        notedict[note['UUID']]['rgb'] = {'r': 255, 'g': 255, 'b': 255}

        return notedict

    def get_notes_with_any_tags(self, tag_uuids):
        noteset = {}
        for note in self.get_all_notes():
            for tag_uuid in note['tagUUIDs']:
                if tag_uuid in tag_uuids:
                    tag_rgb = self.get_tag(tag_uuid)['rgb']
                    if note['UUID'] in tag_uuids:
                        noteset[note['UUID']]['rgb'] = mix_colors(
                            noteset[note['UUID']]['rgb'], tag_rgb)
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
                        notedict[note['UUID']]['rgb'] = {'r': 255, 'g': 255, 'b': 255}

        return notedict

