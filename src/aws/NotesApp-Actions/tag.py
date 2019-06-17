from table import Table
import json

class Tag():
    table = Table('NotesApp-Tags')
    attributes = {}

    def __init__(self, uuid):
        row = self.table.get_item(uuid)
        self.attributes['UUID'] = row['UUID']
        self.attributes['noteUUIDs'] = row['noteUUIDs']
        self.attributes['rgb'] = row['rgb']
        self.attributes['title'] = row['title']

    def get_note_uuids(self):
        return self.attributes['noteUUIDs']

    def toJSON(self):
        return self.attributes