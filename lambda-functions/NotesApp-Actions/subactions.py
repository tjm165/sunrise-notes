import uuid


def intersection(lst1, lst2):
    return list(set(lst1).intersection(set(lst2)))


def mix_colors(rgb1, rgb2):
    rgb = {}
    rgb['r'] = rgb1['r'] - ((rgb1['r'] - rgb2['r']) / 2)
    rgb['g'] = rgb1['g'] - ((rgb1['g'] - rgb2['g']) / 2)
    rgb['b'] = rgb1['b'] - ((rgb1['b'] - rgb2['b']) / 2)

    return rgb


def new_uuid():
    return uuid.uuid4().hex


def serialize_note(note):
    if "tagUUIDs" in note:
        note.pop("tagUUIDs")
    return note
