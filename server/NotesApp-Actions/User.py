from table import Table
import boto3
from boto3.dynamodb.conditions import Key, Attr
from uuid import uuid4
from subactions import mix_colors

# All the CRUD that the users can do to a table.
# All public functions are secure


class User():
    user_table = None
    tags_table = None
    notes_table = None

    secure_user_object = None

    def __init__(self, user_uuid):
        self.user_table = Table('NotesApp-Users')
        self.tags_table = Table('NotesApp-Tags')
        self.notes_table = Table('NotesApp-Notes')
        self.junction_table = Table('NotesApp-NoteTagJunction')
        self.secure_user_object = self.user_table.get_item(user_uuid)

    def get_secure_notes(self):
        return self.secure_user_object['noteUUIDs']

    def get_secure_tags(self):
        return self.secure_user_object['tagUUIDs']

    def get_secure_junctions(self):
        return self.secure_user_object['junctionUUIDs']

    def save_user(self):
        return self.user_table.put_item(self.secure_user_object)

    def is_tag_secure(self, uuid):
        return uuid in self.get_secure_tags()

    def is_note_secure(self, uuid):
        return uuid in self.get_secure_notes()

    def is_junction_secure(self, uuid):
        return uuid in self.get_secure_junctions()

    def get_all_notes(self):
        notes = []
        for uuid in self.get_secure_notes():
            notes.append(self.get_note(uuid))

    def get_all_tags(self):
        tags = []
        for uuid in self.get_secure_tags():
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

    # IS using junctions
    def get_tagged_note(self, uuid):
        self.is_note_secure(uuid)
        note = self.get_note(uuid)
        junctions = self.get_junctions_where_note_uuid_is(uuid)
        for junction in junctions:
            note['tagUUIDs'].append(junction['tagUUID'])
        return note

    # puts the tag object in the table
    def put_tag(self, tag_object):
        self.is_tag_secure(tag_object['UUID'])
        if ('UUID' not in tag_object) or tag_object['UUID'] is -1:
            tag_object['UUID'] = uuid4().hex
        if tag_object['UUID'] not in self.secure_user_object['tagUUIDs']:
            self.get_secure_tags().add(tag_object['UUID'])

        self.tags_table.put_item(tag_object)
        self.user_table.put_item(self.secure_user_object)

    # puts the note object in the table
    # updates the junctions if necessary
    # IS using junctions
    def put_note(self, new_note_object, new_tag_uuids):
        original_note_object = None

        if ('UUID' not in new_note_object) or new_note_object['UUID'] is -1:
            new_note_object['UUID'] = uuid4().hex
        else:
            self.is_note_secure(new_note_object['UUID'])
            original_note_object = self.get_note(new_note_object['UUID'])

        # in old not in new
        for junction in self.get_junctions_where_note_uuid_is(new_note_object['UUID']):
            if junction['tagUUID'] not in new_tag_uuids:
                self.delete_junction(junction['UUID'])

        # in new not in old
        for tag_uuid in new_tag_uuids:
            if tag_uuid not in original_note_object:
                self.create_note_tag_junction(
                    new_note_object['UUID'], tag_uuid)

        return new_note_object['UUID']

####################
    # deletes the tag object from the table
    # deletes the junction
    def delete_tag(self, uuid):
        self.is_tag_secure(uuid)

    # deletes the note object from the table
    # deletes the junction
    # need to be using junctions

    def delete_note(self, uuid):
        self.is_note_secure(uuid)

    def create_note_tag_junction(self, note_uuid, tag_uuid):
        self.is_note_secure(note_uuid)
        self.is_tag_secure(tag_uuid)

    def get_junctions_where_tag_uuid_is(self, tag_uuid):
        self.is_tag_secure(tag_uuid)
        junctions = []
        for junction in self.get_secure_junctions():
            if junction['tagUUID'] == tag_uuid:
                junctions.append(junction['UUID'])
        return junctions

    def delete_junction(self, uuid):
        self.is_junction_secure(uuid)

    def delete_junctions_where_tag_uuid_is(self, tag_uuid):
        self.is_tag_secure(tag_uuid)

    def get_junctions_where_note_uuid_is(self, note_uuid):
        self.is_note_secure(note_uuid)
        junctions = []
        for junction in self.get_secure_junctions():
            if junction['noteUUID'] == note_uuid:
                junctions.append(junction['UUID'])
        return junctions

    def delete_junctions_where_note_uuid_is(self, note_uuid):
        self.is_note_secure(note_uuid)

    # returns a set of colored notes
    # IS using junctions
    def get_noteset_by_tag_uuids(self, base_noteset, must_tag_uuids, can_tag_uuids):
        dict = base_noteset

        for tag_uuid in must_tag_uuids:
            # checks if tag_uuid is secure
            for junction in self.get_junctions_where_tag_uuid_is(tag_uuid):
                note_uuid = junction['noteUUID']
                tag_rgb = self.get_tag(tag_uuid)['rgb']
                if note_uuid in dict:
                    dict[note_uuid]['rgb'] = mix_colors(
                        dict[note_uuid]['rgb'], tag_rgb)
                else:
                    dict[note_uuid] = self.get_note(note_uuid)
                    dict[note_uuid]['rgb'] = tag_rgb
        return dict
