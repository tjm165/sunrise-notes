from table import Table
from note import Note
from tag import Tag
from user import User
import uuid
from boto3.dynamodb.conditions import Key, Attr

class Actions():
    def get_tags_by_userUUID(userUUID):
        user = User(userUUID)
        tag_uuids = user.get_tag_uuids()
        tags = []

        for uuid in tag_uuids:
            tags.append(Tag(uuid).toJSON().copy())
        return tags

    def get_noteset_by_tagUUIDs(tagUUIDs):
        note_uuid_set = set()
        for tagUUID in tagUUIDs:
            note_uuids = Tag(tagUUID).get_note_uuids()
            note_uuid_set.update(note_uuids)

        notes = []
        for uuid in note_uuid_set:
            notes.append(Note(uuid).toJSON().copy())

        return notes

    def put_note(data):
        note = Note(data['UUID'])
        note.set_title(data['title'])
        note.set_content(data['content'])
        note.set_tag_uuids(data['tagUUIDs'])
        note.save()