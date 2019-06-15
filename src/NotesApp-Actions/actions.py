from uuid import UUID
from table import Table
import uuid
from boto3.dynamodb.conditions import Key, Attr

class Actions():
    def get_tags_by_userUUID(userUUID):
        table = Table('NotesApp-Users')
        tagUUIDs = table.get_item(userUUID)['tagUUIDs']
        table = Table('NotesApp-Tags')
        tags = []

        for UUID in tagUUIDs:
            tags.append(table.get_item(UUID))
        return tags

    def get_notes_by_UUIDs(noteUUIDs):
        table = Table('NotesApp-Notes')
        notes = []

        for UUID in noteUUIDs:
            notes.append(table.get_item(UUID))
        return notes

    def get_noteset_by_tagUUIDs(tagUUIDs):
        table = Table('NotesApp-Tags')
        noteUUIDset = set()

        for tagUUID in tagUUIDs:
            noteUUIDs = table.get_item(tagUUID)['noteUUIDs']
            noteUUIDset.update(noteUUIDs)
        return Actions.get_notes_by_UUIDs(noteUUIDset)

    def put_note(data):
        UUID = data['UUID'] if 'UUID' in data else Helper.newUUID()
        content = data['content']
        tagUUIDs = data['tagUUIDs']
        title = data['title']

        table = Table('NotesApp-Notes')
        table.put_item({
            'UUID' : UUID,
            'content': content,
            'tagUUIDs' :tagUUIDs,
            'title' : title
            }
        )
        return UUID

class Helper():
    def newUUID():
        return uuid.uuid4().hex