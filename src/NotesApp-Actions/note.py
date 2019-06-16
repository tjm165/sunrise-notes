from table import Table

class Note():
    table = Table('NotesApp-Notes')
    attributes = {}

    def __init__(self, uuid):
        row = self.table.get_item(uuid)
        self.attributes['UUID'] = row['UUID']
        self.attributes['tagUUIDs'] = row['tagUUIDs']
        self.attributes['content'] = row['content']
        self.attributes['title'] = row['title']

    def toJSON(self):
        return self.attributes