import { describe, expect, test } from 'vitest'

import { calculateTotalInvalidRangeSum, type Range } from '.'

describe('--- Day 2: Gift Shop ---', () => {
	const ranges: Range[] = [
		[11, 22],
		[95, 115],
		[998, 1012],
		[1188511880, 1188511890],
		[222220, 222224],
		[1698522, 1698528],
		[446443, 446449],
		[38593856, 38593862],
		[565653, 565659],
		[824824821, 824824827],
		[2121212118, 2121212124],
	]

	describe('Part 1:', () => {
		test('sum of all invalid IDs where a repeating sequence happens EXACTLY twice', () => {
			expect(calculateTotalInvalidRangeSum(ranges, 2)).toBe(1227775554)
		})
	})

	describe('Part 2:', () => {
		test('sum of all invalid IDs where a repeating sequence happens AT LEAST twice', () => {
			expect(calculateTotalInvalidRangeSum(ranges, Infinity)).toBe(4174379265)
		})
	})
})
