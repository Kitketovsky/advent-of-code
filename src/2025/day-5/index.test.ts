import { describe, expect, test } from 'vitest'

import {
	calculateAmountOfPossibleFreshIngredients,
	calculateFreshProducts,
	mergeAllIntersectingRanges,
} from '.'

describe('--- Day 5: Cafeteria ---', () => {
	describe('Part 1:', () => {
		test('count fresh products', () => {
			const ranges = [
				[3, 5],
				[10, 14],
				[16, 20],
				[12, 18],
			]

			const allProductsIds = [1, 5, 8, 11, 17, 32]

			expect(calculateFreshProducts(ranges, allProductsIds)).toBe(3)
		})
	})

	describe('Part 2:', () => {
		test.each([
			{
				input: [
					[1, 2],
					[2, 3],
					[3, 4],
				],
				expected: [[1, 4]],
			},
			{
				input: [
					[0, 100],
					[10, 90],
					[20, 80],
					[30, 70],
					[40, 60],
					[45, 55],
				],
				expected: [[0, 100]],
			},
			{
				input: [
					[1, 2],
					[3, 4],
					[5, 6],
				],
				expected: [
					[1, 2],
					[3, 4],
					[5, 6],
				],
			},
			{
				input: [
					[1, 2],
					[10, 20],
					[11, 12],
					[13, 14],
					[11, 13],
					[15, 16],
					[13, 19],
				],
				expected: [
					[1, 2],
					[10, 20],
				],
			},
			{
				input: [
					[1, 2],
					[10, 20],
				],
				expected: [
					[1, 2],
					[10, 20],
				],
			},
			{
				input: [
					[1, 2],
					[2, 3],
					[3, 4],
				],
				expected: [[1, 4]],
			},
			{
				input: [
					[0, 100],
					[10, 90],
					[20, 80],
					[30, 70],
					[40, 60],
					[45, 55],
				],
				expected: [[0, 100]],
			},
		])(
			'input $input expected to be $expected after merging',
			({ input, expected }) => {
				expect(mergeAllIntersectingRanges(input)).toEqual(expected)
			},
		)

		test.each([
			{
				input: [
					[3, 5],
					[10, 14],
					[16, 20],
					[12, 18],
				],
				expected: 14,
			},
			{
				input: [[1, 10]],
				expected: 10,
			},
			{
				input: [
					[1, 10],
					[1, 2],
					[2, 3],
					[3, 4],
					[4, 5],
				],
				expected: 10,
			},
			{
				input: [
					[1, 10],
					[10, 19],
					[20, 29],
					[30, 39],
				],
				expected: 39,
			},
		])('input $input matches $expected', ({ input, expected }) => {
			expect(calculateAmountOfPossibleFreshIngredients(input)).toBe(expected)
		})
	})
})
