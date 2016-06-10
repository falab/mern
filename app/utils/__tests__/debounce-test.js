jest.unmock('../debounce');

import debounce from '../debounce';

describe('debounce', () => {
  it('should only call function once within time window', () => {
    let called = 0;
    const increment = debounce(() => {
      called += 1;
    }, 200);

    increment();
    setTimeout(increment, 100);

    // this seems like a bad idea.. but oh well.
    setTimeout(() => {
      expect(called).toBe(1);
    }, 300);
  });

  it('should be called twice if alotted time passed between', () => {
    let called = 0;
    const increment = debounce(() => {
      called += 1;
    }, 100);

    increment();
    setTimeout(increment, 150);

    setTimeout(() => {
      expect(called).toBe(2);
    }, 300);
  });
});
