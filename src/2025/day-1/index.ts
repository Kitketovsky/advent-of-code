import path from 'node:path'

import { createLineListFromInput } from 'utils/createLineListFromInput'

const inputFilePath = path.resolve('src', '2025', 'day-1', 'input.txt')

createLineListFromInput(inputFilePath).then((lines) => {
	const rotations = lines.map(parseInputLine)
	const password = calculatePassword(rotations)
	console.log(password)
})

type Direction = 'L' | 'R'
type Ticks = number

type Rotation = { direction: Direction; ticks: Ticks }
type Rotations = Rotation[]

function parseInputLine(line: string): { direction: Direction; ticks: Ticks } {
	const regexp = /([LR])(\d+)/

	const match = line.match(regexp)

	if (!match) {
		throw new Error(`Invalid instruction: ${line}`)
	}

	const direction = match[1] as Direction
	const ticks = parseInt(match[2])

	return { direction, ticks }
}

function calculatePassword(rotations: Rotations) {
	const MAX_TICKS = 100
	const INITIAL_DIAL_POSITION = 50

	const INITIAL_VALUES = {
		zeroPositionCount: 0,
		zeroPassThroughCount: 0,
		currentDialPosition: INITIAL_DIAL_POSITION,
	}

	const result = rotations.reduce(
		(
			{ zeroPositionCount, zeroPassThroughCount, currentDialPosition },
			{ direction, ticks },
		) => {
			const DIRECTION_VECTOR = direction === 'L' ? -1 : 1

			zeroPassThroughCount +=
				Math.floor(
					(currentDialPosition + ticks * DIRECTION_VECTOR) / MAX_TICKS,
				) * DIRECTION_VECTOR

			if (direction === 'L') {
				const relativePosition = (currentDialPosition - ticks) % MAX_TICKS
				const absolutePosition = (relativePosition + MAX_TICKS) % MAX_TICKS

				currentDialPosition = absolutePosition
			}

			if (direction === 'R') {
				currentDialPosition = (currentDialPosition + ticks) % MAX_TICKS
			}

			if (currentDialPosition === 0) {
				zeroPositionCount++
			}

			return {
				zeroPositionCount,
				zeroPassThroughCount,
				currentDialPosition,
			}
		},
		INITIAL_VALUES,
	)

	return result
}
