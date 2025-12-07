import path from 'node:path'

import { createSyncLineListFromInput } from './../../utils/createSyncLineListFromInput'

const ENTITIES = {
	BEAM_START: 'S',
	BEAM: '|',
	SPLITTER: '^',
	EMPTY: '.',
} as const

const inputFilePath = path.resolve('src', '2025', 'day-7', 'input.txt')

const inputLines = createSyncLineListFromInput(inputFilePath)

function main() {
	console.log('Part 1:', getTachyonBeamSplitTimes(inputLines))
}

main()

export function getTachyonBeamSplitTimes(input: string[]) {
	let prevState = input[0].split('')
	let beamTimesSplit = 0

	for (let row = 1; row < input.length; row++) {
		const newState = input[row].split('')

		for (let col = 0; col < input[row].length; col++) {
			const prevChar = prevState[col]
			const currChar = newState[col]

			if (prevChar === ENTITIES.BEAM_START && currChar === ENTITIES.EMPTY) {
				newState[col] = ENTITIES.BEAM
				continue
			}

			if (prevChar === ENTITIES.BEAM && currChar === ENTITIES.EMPTY) {
				newState[col] = ENTITIES.BEAM
				continue
			}

			if (prevChar === ENTITIES.BEAM && currChar === ENTITIES.SPLITTER) {
				const leftFromCurr = newState[col - 1]
				const rightFromCurr = newState[col + 1]

				if (leftFromCurr === ENTITIES.EMPTY) {
					newState[col - 1] = ENTITIES.BEAM
				}

				if (rightFromCurr === ENTITIES.EMPTY) {
					newState[col + 1] = ENTITIES.BEAM
				}

				beamTimesSplit++
			}
		}

		prevState = newState
	}

	return beamTimesSplit
}
