import { describe, expect, it } from 'bun:test';
import { parse, partOne, partTwo } from '@/05/05';
import example from '@/05/example.txt';

describe('Day 5', () => {
  describe('Part One', () => {
    it('should solve the example', () => {
      expect(partOne(parse(example))).toBe(35);
    });
  });

  describe('Part Two', () => {
    it('should solve the example', () => {
      expect(partTwo(parse(example))).toBe(46);
    });
  });
});
