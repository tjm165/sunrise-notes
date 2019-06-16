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
        #this is where I got to do some work
        #I think it should run through all the old tag ids and remove itself
        #and then run through all the new tag ids and add itself
        #and then return a list of all the tags that were touched and save them
        self.attributes['tagUUIDs'] = tag_uuids

    def save(self):
        self.table.put_item(self.attributes)

    def toJSON(self):
        return self.attributes