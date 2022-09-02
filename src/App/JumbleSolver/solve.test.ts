import { solveJumble, solveWithHash, solveWithHist } from './solve';

it('should solve jumbles', () => {
  const result = solveJumble('bat');
  expect(result).toHaveLength(2);
  expect(result).toContain('at');
  expect(result).toContain('tab');
});

it('should not include the input word in the solution', () => {
  const result = solveJumble('bat');
  expect(result).not.toContain('bat');
});

it('should throw on spaces in the middle of input', () => {
  ['a b', 'aaa bbb', 'aaa\nbbb'].forEach((testcase) => {
    expect(() => solveJumble(testcase)).toThrow();
    expect(() => solveWithHash(testcase)).toThrow();
    expect(() => solveWithHist(testcase)).toThrow();
  });
});

it('should throw on punctuation in input', () => {
  ['-', '_', 'a-a', "a's"].forEach((testcase) => {
    expect(() => solveJumble(testcase)).toThrow();
    expect(() => solveWithHash(testcase)).toThrow();
    expect(() => solveWithHist(testcase)).toThrow();
  });
});

it('should solve spaces at the beginning or end', () => {
  [' bat', 'bat '].forEach((testcase) => {
    expect(solveJumble(testcase)).toHaveLength(2);
    expect(solveWithHash(testcase)).toHaveLength(2);
    expect(solveWithHist(testcase)).toHaveLength(2);
  });
});

it('should solve spiky inputs', () => {
  ['déjàvu'].forEach((testcase) => {
    expect(solveJumble(testcase)).toHaveLength(3);
    expect(solveWithHash(testcase)).toHaveLength(3);
    expect(solveWithHist(testcase)).toHaveLength(3);
  });
});

it('should solve uppercase inputs', () => {
  ['BAT'].forEach((testcase) => {
    expect(solveJumble(testcase)).toHaveLength(2);
    expect(solveWithHash(testcase)).toHaveLength(2);
    expect(solveWithHist(testcase)).toHaveLength(2);
  });
});

it('should solve long inputs', () => {
  [
    'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
  ].forEach((testcase) => {
    expect(solveJumble(testcase).length).toBeGreaterThan(10000);
    expect(solveWithHash(testcase).length).toBeGreaterThan(10000);
    expect(solveWithHist(testcase).length).toBeGreaterThan(10000);
  });
});
