import { describe, expect, test } from 'vitest'

import { getTachyonBeamSplitTimes } from '.'

describe('--- Day 7: Laboratories ---', () => {
	describe('Part 1:', () => {
		const input = [
			'.......S.......',
			'...............',
			'.......^.......',
			'...............',
			'......^.^......',
			'...............',
			'.....^.^.^.....',
			'...............',
			'....^.^...^....',
			'...............',
			'...^.^...^.^...',
			'...............',
			'..^...^.....^..',
			'...............',
			'.^.^.^.^.^...^.',
			'...............',
		]

		test('calculate how many times the beam was split', () => {
			expect(getTachyonBeamSplitTimes(input)).toBe(21)
		})
	})
})
