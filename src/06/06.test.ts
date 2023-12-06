import { describe, expect, it } from 'bun:test';
import { parse, partOne, partTwo } from '@/06/06';
import example from '@/06/example.txt';

describe('Day 6', () => {
  describe('Part One', () => {
    it('should solve the example', () => {
      expect(partOne(parse(example))).toBe(288);
    });
  });

  describe('Part Two', () => {
    it('should solve the example', () => {
      expect(partTwo(parse(example))).toBe(71503);
    });
  });
});
