import { describe, expect, it } from 'bun:test';
import { parse, partOne, partTwo } from '@/09/09';
import example from '@/09/example.txt';

describe('Day 9', () => {
  describe('Part One', () => {
    it('should solve the example', () => {
      expect(partOne(parse(example))).toBe(114);
    });
  });

  describe('Part Two', () => {
    it('should solve the example', () => {
      expect(partTwo(parse(example))).toBe(2);
    });
  });
});
