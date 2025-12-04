import { describe, expect, test } from 'vitest'

import {
	calculateAccessableRollsOfPaper,
	calculateRollsOfPaperForRemoval,
	parseLinesIntoGrid,
} from '.'

describe('--- Day 4: Printing Department ---', () => {
	const input = parseLinesIntoGrid([
		'..@@.@@@@.',
		'@@@.@.@.@@',
		'@@@@@.@.@@',
		'@.@@@@..@.',
		'@@.@@@@.@@',
		'.@@@@@@@.@',
		'.@.@.@.@@@',
		'@.@@@.@@@@',
		'.@@@@@@@@.',
		'@.@.@@@.@.',
	])

	describe('Part 1:', () => {
		test('should calculate the number of accessable places', () => {
			expect(calculateAccessableRollsOfPaper(input)).toBe(13)
		})
	})

	describe('Part 2:', () => {
		test('should calculate the number of accessable places with removal', () => {
			expect(calculateRollsOfPaperForRemoval(input).rollsOfPaperRemoved).toBe(
				43,
			)
		})
	})
})
