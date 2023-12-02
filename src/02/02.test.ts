import { describe, expect, it } from 'bun:test';
import { parse, partOne, partTwo } from '@/02/02';
import example from '@/02/example.txt';

describe('Day 2', () => {
  describe('Part One', () => {
    it('should solve the example', () => {
      expect(partOne(parse(example))).toBe(8);
    });
  });

  describe('Part Two', () => {
    it('should solve the example', () => {
      expect(partTwo(parse(example))).toBe(2286);
    });
  });
});
