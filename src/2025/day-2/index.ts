import path from 'node:path'

import { createLineListFromInput } from 'utils/createLineListFromInput'

const inputFilePath = path.resolve('src', '2025', 'day-2', 'input.txt')

createLineListFromInput(inputFilePath)
	.then(([rawRanges]) => parseRawRangesString(rawRanges))
	.then(calculateTotalInvalidRangeSum)
	.then(console.log)

type Range = [number, number]

function parseRawRangesString(rawRanges: string) {
	return rawRanges.split(',').map((range) => {
		const [start, end] = range.split('-').map(Number)
		return [start, end] as Range
	})
}

function getInvalidRangeSum(range: Range, numOfPatterns: number = Infinity) {
	let invalidRangeSum = 0

	const [start, end] = range

	const matchingPatternsRegexp = /^(\d+)(\1)+$/

	for (let i = start; i <= end; i++) {
		const id = i.toString()

		const match = id.match(matchingPatternsRegexp)

		if (!match) continue

		const pattern = match[1]

		if (
			numOfPatterns === Infinity ||
			numOfPatterns === id.length / pattern.length
		) {
			invalidRangeSum += i
		}
	}

	return invalidRangeSum
}

function calculateTotalInvalidRangeSum(ranges: Range[]) {
	return ranges.reduce((acc, range) => acc + getInvalidRangeSum(range), 0)
}
