import { describe, expect, test } from 'vitest'

import { analyzeGrid, parseLinesIntoGrid } from '.'

describe('--- Day 4: Printing Department ---', () => {
	const grid = parseLinesIntoGrid([
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
			const { itemsAccessed } = analyzeGrid(grid, { recursive: false })
			expect(itemsAccessed).toBe(13)
		})
	})

	describe('Part 2:', () => {
		test('should calculate the number of accessable places with removal', () => {
			const { itemsAccessed } = analyzeGrid(grid, { recursive: true })
			expect(itemsAccessed).toBe(43)
		})
	})
})
