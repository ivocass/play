var timeLimit = function (fn, t) {
  return async function (...args) {
    const originalFnPromise = fn(...args);

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject('Time Limit Exceeded');
      }, t);
    });

    return Promise.race([originalFnPromise, timeoutPromise]);
  };
};

var timeLimit = function (fn, t) {
  return async function (...args) {
    return new Promise((resolve, reject) => {
      setTimeout(() => reject('Time Limit Exceeded'), t);
      fn(...args).then(resolve, reject);
    });
  };
};

var timeLimit = function (fn, t) {
  return async function (...args) {
    return new Promise((delayresolve, reject) => {
      const timeoutId = setTimeout(() => {
        clearTimeout(timeoutId);
        reject('Time Limit Exceeded');
      }, t);

      fn(...args)
        .then((result) => {
          clearTimeout(timeoutId);
          delayresolve(result);
        })
        .catch((error) => {
          clearTimeout(timeoutId);
          reject(error);
        });
    });
  };
};
