import { describe, expect, it } from 'bun:test';
import { parse, partOne, partTwo } from '@/08/08';
import example from '@/08/example.txt';
import example2 from '@/08/example2.txt';
import example3 from '@/08/example3.txt';

describe('Day 8', () => {
  describe('Part One', () => {
    it('should solve the examples', () => {
      expect(partOne(parse(example))).toBe(2);
      expect(partOne(parse(example2))).toBe(6);
    });
  });

  describe('Part Two', () => {
    it('should solve the example', () => {
      expect(partTwo(parse(example3))).toBe(6);
    });
  });
});
