var fibGenerator = function* () {
  let output = 0;
  let prevOutput = 1;

  while (true) {
    yield output;
    const temp = output;
    output = prevOutput;
    prevOutput = temp + prevOutput;
  }
};

// other solutions -----------------------------------------------------------------------

var fibGenerator = function* () {
  let a = 0;
  let b = 1;

  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
};

var fibGenerator = function* () {
  var a = 0,
    b = 1;
  yield a;
  yield b;
  while (true) {
    var c = a + b;
    yield c;
    a = b;
    b = c;
  }
};
