function Note(value) {
  this.editing = false;
  this.value = value;
  this.editValue = value;
  this.getValue = function() {
    if (this.editing) {
      return this.editValue;
    } else {
      return this.value;
    }
  };
}

function applyEdits() {
  this.editing = true;
}

function resetEdits() {
  this.editing = false;
}

export default Note;
