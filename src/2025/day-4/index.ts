import path from 'node:path'

import { createLineListFromInput } from './../../utils/createLineListFromInput'

const inputFilePath = path.resolve('src', '2025', 'day-4', 'input.txt')

createLineListFromInput(inputFilePath)
	.then(parseLinesIntoGrid)
	.then((grid) => {
		console.log(
			'Part 1:',
			analyzeGrid(grid, { recursive: false }).itemsAccessed,
		)
		console.log('Part 2:', analyzeGrid(grid, { recursive: true }).itemsAccessed)
	})

const CELL_ITEMS = {
	EMPTY_PLACE: '.',
	ROLL_OF_PAPER: '@',
} as const

type GridCellItem = (typeof CELL_ITEMS)[keyof typeof CELL_ITEMS]

type Grid = GridCellItem[][]

export function parseLinesIntoGrid(lines: string[]): Grid {
	return lines.map((line) =>
		line.split('').map((char) => {
			if (
				char !== CELL_ITEMS.EMPTY_PLACE &&
				char !== CELL_ITEMS.ROLL_OF_PAPER
			) {
				throw new Error('Invalid grid character')
			}

			return char
		}),
	)
}

export function analyzeGrid(grid: Grid, options: { recursive: boolean }) {
	const deepCopyGrid = structuredClone(grid)

	let itemsAccessed = 0

	for (let row = 0; row < deepCopyGrid.length; row++) {
		for (let col = 0; col < deepCopyGrid[row].length; col++) {
			const { isAccessible } = getGridCellInfo(deepCopyGrid, row, col)

			if (isAccessible) {
				itemsAccessed++

				if (options.recursive) {
					deepCopyGrid[row][col] = CELL_ITEMS.EMPTY_PLACE
				}
			}
		}
	}

	if (options.recursive && itemsAccessed > 0) {
		itemsAccessed += analyzeGrid(deepCopyGrid, {
			recursive: options.recursive,
		}).itemsAccessed
	}

	return { grid: deepCopyGrid, itemsAccessed }
}

function getGridCellInfo(
	grid: Grid,
	currRowIndex: number,
	currColIndex: number,
) {
	const ROLLS_AROUND_LIMIT = 4

	const deltaPoints = [-1, 0, 1]

	let rollsOfPaperAround = 0

	for (const rowDiff of deltaPoints) {
		for (const colDiff of deltaPoints) {
			const rowIndex = currRowIndex + rowDiff
			const colIndex = currColIndex + colDiff

			const isOutOfBounds =
				rowIndex < 0 ||
				rowIndex >= grid.length ||
				colIndex < 0 ||
				colIndex >= grid[rowIndex].length

			const isSamePoint = rowDiff === 0 && colDiff === 0

			if (isOutOfBounds || isSamePoint) continue

			if (grid[rowIndex][colIndex] === CELL_ITEMS.ROLL_OF_PAPER) {
				rollsOfPaperAround++
			}
		}
	}

	const currGridItem = grid[currRowIndex][currColIndex]

	const isAccessible =
		rollsOfPaperAround < ROLLS_AROUND_LIMIT &&
		currGridItem === CELL_ITEMS.ROLL_OF_PAPER

	return {
		item: currGridItem,
		isAccessible,
		rollsOfPaperAround,
	}
}
