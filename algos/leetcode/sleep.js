function resolveAfterNMilliseconds(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}

async function sleep(millis) {
  await resolveAfterNMilliseconds(millis);
  return true;
}

/**
 * let t = Date.now()
 * sleep(100).then(() => console.log(Date.now() - t)) // 100
 */

// other solutions -----------------------------------------------------------------------

async function sleep(millis) {
  await new Promise((resolve) => setTimeout(resolve, millis));
}
