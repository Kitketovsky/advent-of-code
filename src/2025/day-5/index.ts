import path from 'node:path'

import { createSyncLineListFromInput } from './../../utils/createSyncLineListFromInput'

const rangesInputFilePath = path.resolve('src', '2025', 'day-5', 'ranges.txt')
const allProductsIdsFilePath = path.resolve('src', '2025', 'day-5', 'ids.txt')

const ranges = createSyncLineListFromInput(rangesInputFilePath).map((range) =>
	range.split('-').map(Number),
)

const allProductsIds = createSyncLineListFromInput(allProductsIdsFilePath).map(
	(id) => Number(id),
)

export function calculateFreshProducts(
	ranges: number[][],
	allProductsIds: number[],
) {
	let freshProductsCount = 0

	for (const productId of allProductsIds) {
		for (const [start, end] of ranges) {
			if (productId >= start && productId <= end) {
				freshProductsCount++
				break
			}
		}
	}

	return freshProductsCount
}

export function mergeAllIntersectingRanges(ranges: number[][]) {
	const deepCopy = structuredClone(ranges)

	deepCopy.sort((a, b) => a[0] - b[0])

	for (let i = 0; i < deepCopy.length; i++) {
		for (let j = i + 1; j < deepCopy.length; j++) {
			const [start1, end1] = deepCopy[i]
			const [start2, end2] = deepCopy[j]

			if (end1 >= start2) {
				const newEnd = Math.max(end1, end2)

				deepCopy[i] = [start1, newEnd]
				deepCopy.splice(j, 1)

				j--
			}
		}
	}

	return deepCopy
}

function countAllFreshIngredientsIds(ranges: number[][]) {
	let totalUniqueIds = 0

	for (const [start, end] of ranges) {
		totalUniqueIds += end - start + 1
	}

	return totalUniqueIds
}

export function calculateAmountOfPossibleFreshIngredients(ranges: number[][]) {
	const formattedRanges = mergeAllIntersectingRanges(ranges)
	const freshProductIdsCount = countAllFreshIngredientsIds(formattedRanges)

	return freshProductIdsCount
}

function main() {
	console.log('Part 1:', calculateFreshProducts(ranges, allProductsIds))
	console.log('Part 2:', calculateAmountOfPossibleFreshIngredients(ranges))
}

main()
