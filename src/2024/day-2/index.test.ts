import { describe, expect, test } from 'vitest'

import { checkReportSafety, parseReportsFromInputLines } from '.'

describe('--- Day 2: Red-Nosed Reports ---', () => {
	const rawInput = [
		'7 6 4 2 1',
		'1 2 7 8 9',
		'9 7 6 2 1',
		'1 3 2 4 5',
		'8 6 4 4 1',
		'1 3 6 7 9',
	]

	const formattedInput = [
		[7, 6, 4, 2, 1],
		[1, 2, 7, 8, 9],
		[9, 7, 6, 2, 1],
		[1, 3, 2, 4, 5],
		[8, 6, 4, 4, 1],
		[1, 3, 6, 7, 9],
	]

	test('format raw input', () => {
		expect(parseReportsFromInputLines(rawInput)).toEqual(formattedInput)
	})

	describe('Part 1:', () => {
		test.each([
			{ input: formattedInput[0], expected: true },
			{ input: formattedInput[1], expected: false },
			{ input: formattedInput[2], expected: false },
			{ input: formattedInput[3], expected: false },
			{ input: formattedInput[4], expected: false },
			{ input: formattedInput[5], expected: true },
		])(
			'report $input must be $expected without dampening',
			({ input, expected }) => {
				expect(checkReportSafety(input, { dampening: false })).toBe(expected)
			},
		)
	})

	describe('Part 2:', () => {
		test.each([
			{ input: formattedInput[0], expected: true },
			{ input: formattedInput[1], expected: false },
			{ input: formattedInput[2], expected: false },
			{ input: formattedInput[3], expected: true },
			{ input: formattedInput[4], expected: true },
			{ input: formattedInput[5], expected: true },
		])(
			'report $input must be $expected with dampening',
			({ input, expected }) => {
				expect(checkReportSafety(input, { dampening: true })).toBe(expected)
			},
		)
	})
})
