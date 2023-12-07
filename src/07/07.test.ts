import { describe, expect, it } from 'bun:test';
import { parse, partOne, partTwo } from '@/07/07';
import example from '@/07/example.txt';

describe('Day 7', () => {
  describe('Part One', () => {
    it('should solve the example', () => {
      expect(partOne(parse(example))).toBe(6440);
    });
  });

  describe('Part Two', () => {
    it('should solve the example', () => {
      expect(partTwo(parse(example))).toBe(5905);
    });
  });
});
