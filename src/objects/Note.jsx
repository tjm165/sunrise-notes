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

  this.applyEdits = function() {
    this.value = this.editValue;
  };

  this.resetEdits = function() {
    this.editValue = this.value;
  };
}

export default Note;
