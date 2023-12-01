import { parse, partOne, partTwo } from '@/01/01';
import { describe, expect, it } from 'bun:test';
import example from '@/01/example.txt';
import example2 from '@/01/example2.txt';

describe('Day 1', () => {
  describe('Part One', () => {
    it('should solve the example', () => {
      expect(partOne(parse(example))).toBe(142);
    });
  });

  describe('Part Two', () => {
    it('should solve the example', () => {
      expect(partTwo(parse(example2))).toBe(281);
    });
  });
});
