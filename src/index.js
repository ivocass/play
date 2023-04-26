// --------------------------
function assert(output, expected) {
  if (Array.isArray(output) && Array.isArray(expected)) {
    const isEqualSize = output.length === expected.length;
    const areValuesEqual = output.every((a, i) => a === expected[i]);
    console.log(
      'test is',
      isEqualSize && areValuesEqual,
      output,
      '/expected:',
      expected
    );
  } else {
    console.log('test is', output === expected, output, '/expected:', expected);
  }
}

// assert((), );

// other solutions -----------------------------------------------------------------------
