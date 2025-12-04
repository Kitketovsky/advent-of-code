import path from 'node:path'

import { createLineListFromInput } from './../../utils/createLineListFromInput'

const CELL_ITEMS = {
	EMPTY_PLACE: '.',
	ROLL_OF_PAPER: '@',
} as const

type GridCellItem = (typeof CELL_ITEMS)[keyof typeof CELL_ITEMS]

type Grid = GridCellItem[][]

const inputFilePath = path.resolve('src', '2025', 'day-4', 'input.txt')

createLineListFromInput(inputFilePath)
	.then(parseLinesIntoGrid)
	.then((grid) => {
		console.log('Part 1:', calculateAccessableRollsOfPaper(grid))
		console.log(
			'Part 2:',
			calculateRollsOfPaperForRemoval(grid).rollsOfPaperRemoved,
		)
	})

export function parseLinesIntoGrid(lines: string[]): Grid {
	return lines.map((line) =>
		line.split('').map((char) => {
			if (char !== '.' && char !== '@') {
				throw new Error('Invalid grid character')
			}

			return char
		}),
	)
}

export function calculateAccessableRollsOfPaper(grid: Grid): number {
	let canBeAccessed = 0

	for (let row = 0; row < grid.length; row++) {
		for (let col = 0; col < grid[row].length; col++) {
			const { isAccessible } = getGridCellInfo(grid, row, col)

			if (isAccessible) {
				canBeAccessed++
			}
		}
	}

	return canBeAccessed
}

export function calculateRollsOfPaperForRemoval(grid: Grid) {
	const deepCopyGrid = JSON.parse(JSON.stringify(grid))

	let rollsOfPaperRemoved = 0

	for (let row = 0; row < deepCopyGrid.length; row++) {
		for (let col = 0; col < deepCopyGrid[row].length; col++) {
			const { isAccessible } = getGridCellInfo(deepCopyGrid, row, col)

			if (isAccessible) {
				deepCopyGrid[row][col] = CELL_ITEMS.EMPTY_PLACE
				rollsOfPaperRemoved++
			}
		}
	}

	if (rollsOfPaperRemoved > 0) {
		const { rollsOfPaperRemoved: removedAmount } =
			calculateRollsOfPaperForRemoval(deepCopyGrid)

		rollsOfPaperRemoved += removedAmount
	}

	return { grid: deepCopyGrid, rollsOfPaperRemoved }
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
