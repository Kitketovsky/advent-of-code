import path from 'node:path'

import { createLineListFromInput } from './../../utils/createLineListFromInput'

const inputFilePath = path.join(
	process.cwd(),
	'src',
	'2024',
	'day-1',
	'input.txt',
)

createLineListFromInput(inputFilePath)
	.then(getListsRawLocationInput)
	.then(({ leftList, rightList }) => {
		console.log('Part 1:', calculateTotalListsDistance(leftList, rightList))
		console.log('Part 2:', calculateSimilarityScore(leftList, rightList))
	})

type LocationIdList = number[]

export function getListsRawLocationInput(lines: string[]) {
	const listRegExp = /^(\d+)\s+(\d+)$/

	const lists = lines.reduce(
		({ leftList, rightList }, line) => {
			const match = line.trim().match(listRegExp)

			if (!match) {
				throw new Error('No location pair match has been found')
			}

			const leftLocation = match[1]
			const rightLocation = match[2]

			if (!leftLocation || !rightLocation) {
				throw new Error('One of the location IDs is missing')
			}

			leftList.push(parseInt(leftLocation))
			rightList.push(parseInt(rightLocation))

			return { leftList, rightList }
		},
		{
			leftList: [] as LocationIdList,
			rightList: [] as LocationIdList,
		},
	)

	if (lists.leftList.length !== lists.rightList.length) {
		throw new Error('Lists are not of the same length')
	}

	return lists
}

export function calculateTotalListsDistance(
	leftList: LocationIdList,
	rightList: LocationIdList,
) {
	const sortedLeftList = leftList.toSorted()
	const sortedRightList = rightList.toSorted()

	let totalDistance = 0

	for (let i = 0; i < sortedLeftList.length; i++) {
		const leftId = sortedLeftList[i]
		const rightId = sortedRightList[i]

		totalDistance += Math.abs(leftId - rightId)
	}

	return totalDistance
}

export function calculateSimilarityScore(
	leftList: LocationIdList,
	rightList: LocationIdList,
) {
	const locationIdCounterMap = new Map<number, number>()

	for (const locationId of rightList) {
		locationIdCounterMap.set(
			locationId,
			(locationIdCounterMap.get(locationId) || 0) + 1,
		)
	}

	let totalSimilarityScore = 0

	for (const locationId of leftList) {
		if (!locationIdCounterMap.has(locationId)) {
			continue
		}

		totalSimilarityScore +=
			locationId * (locationIdCounterMap.get(locationId) || 0)
	}

	return totalSimilarityScore
}
