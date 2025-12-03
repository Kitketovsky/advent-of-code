import { describe, expect,test } from 'vitest'

import { calculateMaxinumJoltage } from '.'

describe('--- Day 3: Lobby ---', () => {
	describe('Part 1:', () => {
		test.each([
			{ input: '987654321111111', expected: 98 },
			{ input: '811111111111119', expected: 89 },
			{ input: '234234234234278', expected: 78 },
			{ input: '818181911112111', expected: 92 },
		])('expected $expected with input $input', ({ input, expected }) => {
			expect(calculateMaxinumJoltage(input, 2)).toBe(expected)
		})
	})

	describe('Part 2:', () => {
		test.each([
			{ input: '987654321111111', expected: 987654321111 },
			{ input: '811111111111119', expected: 811111111119 },
			{ input: '234234234234278', expected: 434234234278 },
			{ input: '818181911112111', expected: 888911112111 },
		])('expected $expected with input $input', ({ input, expected }) => {
			expect(calculateMaxinumJoltage(input, 12)).toBe(expected)
		})
	})
})
