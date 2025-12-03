import { describe, expect, test } from 'vitest'

import { calculatePassword, type Rotations } from '.'

describe('--- Day 1: Secret Entrance ---', () => {
	const rotations: Rotations = [
		{ direction: 'L', ticks: 68 },
		{ direction: 'L', ticks: 30 },
		{ direction: 'R', ticks: 48 },
		{ direction: 'L', ticks: 5 },
		{ direction: 'R', ticks: 60 },
		{ direction: 'L', ticks: 55 },
		{ direction: 'L', ticks: 1 },
		{ direction: 'L', ticks: 99 },
		{ direction: 'R', ticks: 14 },
		{ direction: 'L', ticks: 82 },
	]

	describe('Part 1:', () => {
		test('calculate times dial at zero position', () => {
			expect(calculatePassword(rotations).zeroPositionCount).toBe(3)
		})
	})

	describe('Part 2:', () => {
		test('calculate times dial pass through zero', () => {
			expect(calculatePassword(rotations).zeroPassThroughCount).toBe(6)
		})
	})
})
