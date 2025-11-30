import { accessSync, constants, createReadStream } from 'node:fs'
import path from 'node:path'
import readline from 'node:readline/promises'

type LocationIdList = number[]

async function main() {
	const inputFilePath = path.join(process.cwd(), 'src', '2024', 'input.txt')

	accessSync(inputFilePath, constants.R_OK)

	const { leftLocationList, rightLocationList } =
		await formatRawLocationInput(inputFilePath)

	const totalDistance = calculateTotalListsDistance(
		leftLocationList,
		rightLocationList,
	)

	const totalSimilarityScore = calculateSimilarityScore(
		leftLocationList,
		rightLocationList,
	)

	return { totalDistance, totalSimilarityScore }
}

main()

async function formatRawLocationInput(filepath: string) {
	const listRegExp = /(\d+)\w+(\d+)/g

	const leftLocationList: LocationIdList = []
	const rightLocationList: LocationIdList = []

	const rl = readline.createInterface({
		input: createReadStream(filepath, { encoding: 'utf-8' }),
		crlfDelay: Infinity,
	})

	for await (const line of rl) {
		const match = line.trim().match(listRegExp)

		if (!match) {
			throw new Error('No location pair match has been found')
		}

		const [leftLocation, rightLocation] = match

		if (!leftLocation || !rightLocation) {
			throw new Error('One of the location IDs is missing')
		}

		leftLocationList.push(parseInt(leftLocation))
		rightLocationList.push(parseInt(rightLocation))
	}

	if (leftLocationList.length !== rightLocationList.length) {
		throw new Error('Lists are not of the same length')
	}

	return {
		leftLocationList,
		rightLocationList,
	}
}

function calculateTotalListsDistance(
	leftList: LocationIdList,
	rightList: LocationIdList,
) {
	const sortedLeftList = leftList.toSorted()
	const sortedRightList = rightList.toSorted()

	let totalDistance = 0

	for (let i = 0; i < sortedLeftList.length; i++) {
		const leftId = sortedLeftList[i]
		const rightId = sortedRightList[i]

		if (leftId === undefined || rightId === undefined) {
			throw new Error('One of the location IDs is missing')
		}

		totalDistance += Math.abs(leftId - rightId)
	}

	return totalDistance
}

function calculateSimilarityScore(
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
