jest.unmock('../splitStr');

import splitStr from '../splitStr';

describe('splitStr', () => {
  it('splits a string at the delimiter', () => {
    expect(splitStr('This is a test')).toEqual(['This', 'is', 'a', 'test']);
  });

  it('removes falsy values', () => {
    expect(splitStr('This  is    a test')).toEqual(['This', 'is', 'a', 'test']);
  });
});
