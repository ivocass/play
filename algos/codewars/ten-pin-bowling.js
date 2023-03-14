


function bowlingScore(frames) {
  const rolls = frames.replace(/ /g, '').split('');
  const scores = rolls.map((roll, idx) => {
    
    if (roll === 'X') return 10;
    if (roll === '/') return 10 - parseInt(rolls[idx - 1]);
    
    return parseInt(roll)
  });

  const lastFrameIndex = rolls.length - frames.substring(frames.lastIndexOf(' ') + 1).length;

  return rolls.reduce((acc, val, i) => {
    if (i < lastFrameIndex) {
      if (val === 'X') {
        acc += scores[i] + scores[i + 1] + scores[i + 2];
      } else if (val === '/') {
        acc += scores[i] + scores[i + 1];
      } else {
        acc += scores[i];
      }
    } else {
      acc += scores[i];
    }

    return acc;
  }, 0);
}


// ----------------------

function assert(output, expected) {
  console.log('test is', output === expected, output, '/expected:', expected);
}

// assert(bowlingScore('11 11 11 11 11 11 11 11 11 11'), 20);
// woah! Perfect game!
// assert(bowlingScore('X X X X X X X X X XXX'), 300);
// assert(bowlingScore('8/ 7/ 34 X 2/ X X 80 X 8/9'), 170);
// assert(bowlingScore('X X 9/ 80 X X 90 8/ 7/ 44'), -1);
// assert(bowlingScore('25 9/ 18 9/ 71 00 43 53 63 XX1'), 97);
// assert(bowlingScore('X 6/ 44 3/ 9/ 50 26 62 62 1/X'), 125);
// assert(bowlingScore('X 03 X 72 05 90 22 X 2/ XX1'), 123);

// assert(bowlingScore('00 5/ 4/ 53 33 22 4/ 5/ 45 X X X'), -1);
// assert(bowlingScore('5/ 4/ 3/ 2/ 1/ 0/ X 9/ 4/ 8/ /'), 150);
// assert(bowlingScore('61 1/ 53 90 81 81 17 51 09 1/X'), 100);
assert(bowlingScore('X X 0/ X 4/ 81 8/ 60 15 53'), 143);


// -----------------------

// other solutions

// ChatGPT (it fails because it bonuses in the last frame.
// instructions not to do that fail)
function bowlingScore(frames) {
  var framesArr = frames.split(' ');
  var result = 0;
  for (var i = 0; i < framesArr.length; i++) {
    if (framesArr[i] === 'X') {
      result += 10 + getNextElementsScore(framesArr, i, 2);
    } else if (framesArr[i][1] === '/') {
      result += 10 + getNextElementsScore(framesArr, i, 1);
    } else {
      result += parseInt(framesArr[i][0]) + parseInt(framesArr[i][1]);
    }
  }
  return result;
}

function getNextElementsScore(arr, index, num) {
  var sum = 0;
  for (var j = index + 1; j <= index + num; j++) {
    if (arr[j] === 'X') {
      sum += 10;
      num--;
    } else if (arr[j][1] === '/') {
      sum += 10 - parseInt(arr[j][0]);
      break;
    } else {
      sum += parseInt(arr[j]);
      break;
    }
  }
  return sum;
}


const bowlingScore = scores => {
  let frameRolls = [], r = []; // r = rolls
  scores.split(' ').forEach(frame => {
    frameRolls.push(r.length);
    [...frame].forEach((roll,i) => r.push(roll==='X' ? 10 : roll==='/' ? 10-frame[i-1] : +roll));
  });
  return frameRolls.map(i => r[i] + r[i+1] + (r[i]+r[i+1] >= 10 ? r[i+2] : 0)).reduce((a,b) => a+b);
}



function bowlingScore(framesString) {
  const balls = framesString.replace(/ /g, '').split('')
  
  let totalScore = 0
  for (let i = 0, frame = 0; i < balls.length && frame < 10; frame++ ) {    
    totalScore += _frameScore(balls[i], balls[i + 1], balls[i + 2])
    if (balls[i] === 'X') i += 1
    else i += 2
  }
  
  return totalScore
}

function _frameScore(ball1, ball2, ball3) {
  if (ball1 === 'X') return 10 + _twoBallScore(ball2, ball3)
  if (ball2 === '/') return 10 + _nextBallScore(ball3)
  return _twoBallScore(ball1, ball2)
}

function _twoBallScore(ball1, ball2) {
  return ball2 === '/' ? 10 : _nextBallScore(ball1) + _nextBallScore(ball2)
}

function _nextBallScore(ball) {
  return ball === 'X' ? 10 : parseInt(ball)
}