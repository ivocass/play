Array.prototype.last = function () {
  if (this.length === 0) {
    return -1;
  }

  return this.at(-1);
};

// other solutions -----------------------------------------------------------------------

Array.prototype.last = function () {
  return this[this.length - 1] ?? -1;
};
