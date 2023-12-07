import { existsSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import chalk from 'chalk';
import dedent from 'dedent';

import { fetchInput } from './api.ts';

export async function scaffold(day: number, year: number) {
  const name = `${day}`.padStart(2, '0');

  const directory = new URL(`../src/${name}/`, import.meta.url);

  if (existsSync(directory)) return;

  console.log(`📂 Setting up day ${day} of ${year}`);

  await mkdir(directory);

  const test = dedent`
  import { describe, expect, it } from 'bun:test';
  import { parse, partOne, partTwo } from '@/${name}/${name}';
  import example from '@/${name}/example.txt';

  describe('Day ${day}', () => {
    describe('Part One', () => {
      it('should solve the example', () => {
        expect(partOne(parse(example))).toBe(undefined);
      });
    });

    describe('Part Two', () => {
      it('should solve the example', () => {
        expect(partTwo(parse(example))).toBe(undefined);
      });
    });
  });
  `;

  const solution = dedent`
  export function parse(input: string) {
    return input
  }

  export function partOne(input: ReturnType<typeof parse>) {}

  export function partTwo(input: ReturnType<typeof parse>) {}
  `;

  console.log('📂 Fetching your input');

  const input = await fetchInput({ day, year }).catch(() => {
    console.log(
      chalk.red.bold(
        '📂 Fetching your input have failed, empty file will be created.',
      ),
    );
  });

  await Bun.write(new URL(`${name}.test.ts`, directory.href), test);
  await Bun.write(new URL(`${name}.ts`, directory.href), solution);
  await Bun.write(new URL('input.txt', directory.href), input ?? '');
  await Bun.write(new URL('example.txt', directory.href), '');

  console.log('📂 You all set up, have fun!');
}
