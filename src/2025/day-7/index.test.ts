import { describe, expect, test } from 'vitest'

import { getTachyonBeamDispersionManifold, parseToManifold } from '.'

describe('--- Day 7: Laboratories ---', () => {
	describe('Part 1:', () => {
		const input = parseToManifold([
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
		])

		const expected = parseToManifold([
			'.......S.......',
			'.......|.......',
			'......|^|......',
			'......|.|......',
			'.....|^|^|.....',
			'.....|.|.|.....',
			'....|^|^|^|....',
			'....|.|.|.|....',
			'...|^|^|||^|...',
			'...|.|.|||.|...',
			'..|^|^|||^|^|..',
			'..|.|.|||.|.|..',
			'.|^|||^||.||^|.',
			'.|.|||.||.||.|.',
			'|^|^|^|^|^|||^|',
			'|.|.|.|.|.|||.|',
		])

		test('create manifold after dispersion', () => {
			expect(getTachyonBeamDispersionManifold(input).manifold).toEqual(expected)
		})

		test('calculate how many times the beam was split', () => {
			expect(getTachyonBeamDispersionManifold(input).beamTimesSplit).toBe(21)
		})
	})
})
