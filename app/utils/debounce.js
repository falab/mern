/**
 * wraps a function call with a limiter that prevents the functions from being
 * called too frequently. Sets a timeout to call the function after a given
 * amount of time, if the function gets called again before then the previous
 * call is canceled and the timeout is restarted.
 * @param  {function} func - the function to wrap
 * @param  {number} [wait=500] - how frequently the function can be called
 * @return {function} the original function with the wrapper applied
 */
const debounce = (func, wait = 200) => {
  let pending;

  return (...args) => {
    const later = () => {
      pending = undefined;
      func.apply(this, args);
    };

    if (pending) clearTimeout(pending);
    pending = setTimeout(later, wait);
  };
};

export default debounce;
