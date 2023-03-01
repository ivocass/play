function formatDuration(seconds) {
  if (seconds === 0) return 'now';

  const timeUnits = [
    ['year', 31536000],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
    ['second', 1],
  ];
  const items = [];

  for (let i = 0; i < timeUnits.length; i++) {
    const [unitName, unitSeconds] = timeUnits[i];

    const result = seconds / unitSeconds;

    if (result < 1) continue;

    const intResult = parseInt(result);

    let item = String(intResult) + ' ' + unitName;

    if (intResult > 1) item += 's';

    items.push(item);

    seconds -= unitSeconds * intResult;

    if (seconds > 0) items.push(', ');
  }

  if (items.length > 1) items[items.length - 2] = ' and ';

  return items.join('');
}

// ----------------

function assertDeepEquals(output, expected) {
  console.log(
    'test is',
    output.every((val, i) => val === expected[i]),
    output,
    expected
  );
}

function assert(output, expected) {
  console.log('test is', output === expected, output, '/expected:', expected);
}

assert(formatDuration(1), '1 second');
assert(formatDuration(62), '1 minute and 2 seconds');
assert(formatDuration(120), '2 minutes');
assert(formatDuration(3600), '1 hour');
assert(formatDuration(3601), '1 hour and 1 second');
assert(formatDuration(3662), '1 hour, 1 minute and 2 seconds');
assert(formatDuration(132030240), '4 years, 68 days, 3 hours and 4 minutes');
assert(formatDuration(5983440), '69 days, 6 hours and 4 minutes');


// other solutions
// https://www.codewars.com/kata/52742f58faf5485cae000b9a/solutions/javascript

const delegates = [
  { s: 'year', v: 60 * 60 * 24 * 365 },
  { s: 'day', v: 60 * 60 * 24 },
  { s: 'hour', v: 60 * 60 },
  { s: 'minute', v: 60 },
  { s: 'second', v: 1 }
];

function formatDuration (seconds) {
  if (!seconds) return 'now';
  
  return delegates.reduce((ret, dg, idx) => {
    const val = Math.floor(seconds / dg.v);
    if (!val) return ret;
    seconds -= dg.v * val;
    const str = val > 1 ? dg.s + 's' : dg.s;
    const add = !ret ? '' : (seconds > 0 ? ', ' : ' and ');
    return ret + add + `${val} ${str}`;
  }, '');
}


const formatDuration = s => s == 0 ? 'now' :
     [Math.floor(s/60/60/24/365),
      Math.floor(s/60/60/24)%365,
      Math.floor(s/60/60)%24,  
      Math.floor(s/60)%60 ,
      s%60]
     .map((e,i)=> e + ' ' + ['year', 'day', 'hour', 'minute', 'second'][i] + (+e>1?'s': ''))
     .filter(e=> !/^0/.test(e))
     .join(', ')
     .replace(/,\s(?=[\d\s\w]*$)/, ' and ');