import { describe, expect, it } from 'bun:test';
import { parse, partOne, partTwo } from '@/03/03';
import example from '@/03/example.txt';

describe('Day 3', () => {
  describe('Part One', () => {
    it('should solve the example', () => {
      expect(partOne(parse(example))).toBe(4361);
    });
  });

  describe('Part Two', () => {
    it('should solve the example', () => {
      expect(partTwo(parse(example))).toBe(467835);
    });
  });
});
