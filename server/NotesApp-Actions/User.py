from table import Table
import boto3
from boto3.dynamodb.conditions import Key, Attr
import uuid
from subactions import mix_colors

# All the CRUD that the users can do to a table.
# All public functions are secure


class User():
    user_table = None
    tags_table = None
    notes_table = None

    secure_user = None
    secure_notes = None
    secure_tags = None
    secure_junctions = None

    def __init__(self, user_uuid):
        self.user_table = Table('NotesApp-Users')
        self.tags_table = Table('NotesApp-Tags')
        self.notes_table = Table('NotesApp-Notes')
        self.junction_table = Table('NotesApp-NoteTagJunction')
        self.secure_user = self.user_table.get_item(user_uuid)
        self.secure_tags = self.secure_user['tagUUIDs']
        self.secure_junctions = self.secure_user['junctionUUIDs']
        self.secure_notes = self.secure_user['noteUUIDs']

    def is_tag_secure(self, tag_uuid):
        return tag_uuid in self.secure_tags

    def is_note_secure(self, note_uuid):
        return note_uuid in self.secure_notes

    def get_all_tags(self):
        tags = []
        for uuid in self.secure_tags:
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

    # need to be using junctions
    def get_tagged_note(self, uuid):
        self.is_note_secure(uuid)

    # puts the tag object in the table
    # updates the junctions if necessary
    def put_tag(self, object):
        self.is_tag_secure(object['uuid'])

    # puts the note object in the table
    # updates the junctions if necessary
    # need to be using junctions
    def put_note(self, object):
        self.is_note_secure(object['uuid'])

    # deletes the tag object from the table
    # deletes the junction
    def delete_tag(self, uuid):
        self. is_tag_secure(uuid)

    # deletes the note object from the table
    # deletes the junction
    # need to be using junctions
    def delete_note(self, uuid):
        self.is_note_secure(uuid)

    def get_junctions_where_tag_uuid_is(self, tag_uuid):
        self.is_tag_secure(tag_uuid)
        junctions = []
        for junction in self.secure_junctions:
            if junction['tagUUID'] == tag_uuid:
                junctions.append(junction['UUID'])
        return junctions

    def delete_junctions_where_tag_uuid_is(self, tag_uuid):
        self.is_tag_secure(tag_uuid)

    def get_junctions_where_note_uuid_is(self, note_uuid):
        self.is_note_secure(note_uuid)
        junctions = []
        for junction in self.secure_junctions:
            if junction['noteUUID'] == note_uuid:
                junctions.append(junction['UUID'])
        return junctions

    def delete_junctions_where_note_uuid_is(self, note_uuid):
        self.is_note_secure(note_uuid)

    # returns a set of colored notes
    # IS using junctions
    def get_noteset_by_tag_uuids(self, tag_uuids):
        dict = {}

        for tag_uuid in tag_uuids:
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
