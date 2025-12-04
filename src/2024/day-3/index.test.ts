import { describe, expect, test } from 'vitest'

import { parseCorruptedLine, parseCorruptedLineWithEnabling } from '.'

describe('--- Day 3: Mull It Over ---', () => {
	describe('Part 1:', () => {
		test('multiply all found correct mul instructions', () => {
			const input =
				'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))'

			expect(parseCorruptedLine(input)).toBe(161)
		})
	})
	describe('Part 2:', () => {
		test('multiply all found correct AND enabled mul instructions', () => {
			const input =
				"xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"

			expect(parseCorruptedLineWithEnabling(input)).toBe(48)
		})
	})
})
