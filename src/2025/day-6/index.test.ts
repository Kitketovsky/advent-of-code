import { describe, expect, test } from 'vitest'

import {
	calculateRightToLeftGrandTotal,
	calculateTopToBottomGrandTotal,
} from '.'

describe('--- Day 6: Trash Compactor ---', () => {
	describe('Part 1:', () => {
		test('calculate grand total from top to bottom as whole numbers', () => {
			const input = [
				'	123 328  51 64',
				'	45 64  387 23',
				'	6 98  215 314',
				'	*   +   *   +',
			]

			expect(calculateTopToBottomGrandTotal(input)).toBe(4277556)
		})
	})

	describe('Part 2:', () => {
		test('calculate grand total from right to left (Cephalopod math)', () => {
			const input = [
				'123 328  51 64 ',
				' 45 64  387 23 ',
				'  6 98  215 314',
				'*   +   *   +  ',
			]

			expect(calculateRightToLeftGrandTotal(input)).toBe(3263827)
		})
	})
})
