const debounce = (func, wait = 500) => {
  let pending = null;

  return (...args) => {
    const later = () => {
      pending = null;
      func.apply(this, args);
    };

    if (pending) clearTimeout(pending);
    pending = setTimeout(later, wait);
  };
};

export default debounce;
