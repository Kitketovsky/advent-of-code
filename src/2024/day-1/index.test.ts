import { describe, expect, test } from 'vitest'

import {
	calculateSimilarityScore,
	calculateTotalListsDistance,
	getListsRawLocationInput,
} from '.'

describe('--- Day 1: Historian Hysteria ---', () => {
	const input = ['3   4', '4   3', '2   5', '1   3', '3   9', '3   3']
	const lists = {
		leftList: [3, 4, 2, 1, 3, 3],
		rightList: [4, 3, 5, 3, 9, 3],
	}

	test('format raw input into left and right lists', () => {
		expect(getListsRawLocationInput(input)).toEqual(lists)
	})

	describe('Part 1:', () => {
		test('add up the distances between all of the pairs you found', () => {
			expect(calculateTotalListsDistance(lists.leftList, lists.rightList)).toBe(
				11,
			)
		})
	})

	describe('Part 2:', () => {
		test('calculate similarity score', () => {
			expect(calculateSimilarityScore(lists.leftList, lists.rightList)).toBe(31)
		})
	})
})
