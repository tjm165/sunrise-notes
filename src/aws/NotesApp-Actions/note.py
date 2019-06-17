from table import Table
import uuid

class Note():
    table = Table('NotesApp-Notes')
    attributes = {}

    def __init__(self, uuid):
        #if uuid > -1:
        row = self.table.get_item(uuid)
        self.attributes['UUID'] = row['UUID']
        self.attributes['tagUUIDs'] = row['tagUUIDs']
        self.attributes['content'] = row['content']
        self.attributes['title'] = row['title']

    def set_content(self, content):
        self.attributes['content'] = content

    def set_title(self, title):
        self.attributes['title'] = title

    def set_tag_uuids(self, tag_uuids):
        self.attributes['tagUUIDs'] = tag_uuids

    def add_tag(self, tag_uuid):
        self.attributes['tagUUIDs'].append(tag_uuid)

    def remove_tag(self, tag_uuid):
        self.attributes['tagUUIDs'].remove(tag_uuid)

    def has_tag(self, tag_uuid):
        return tag_uuid in self.attributes['tagUUIDs']

    def save(self):
        self.table.put_item(self.attributes)

    def toJSON(self):
        return self.attributes