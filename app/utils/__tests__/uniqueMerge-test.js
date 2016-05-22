jest.unmock('../uniqueMerge');

import uniqueMerge from '../uniqueMerge';

describe('uniqueMerge', () => {
  it('should merge arrays into single array', () => {
    expect(uniqueMerge(
      ['a', 'b', 'c'],
      [1, 2, 3]
    )).toEqual(['a', 'b', 'c', 1, 2, 3]);
  });

  it('should not contain any duplicate values', () => {
    expect(uniqueMerge(
      ['a', 'b', 'c'],
      ['c', 'd', 'e']
    )).toEqual(['a', 'b', 'c', 'd', 'e']);
  });
});
