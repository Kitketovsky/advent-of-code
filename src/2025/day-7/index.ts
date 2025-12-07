import path from 'node:path'

import { createSyncLineListFromInput } from 'utils/createSyncLineListFromInput'

const ENTITIES = {
	BEAM_START: 'S',
	BEAM: '|',
	SPLITTER: '^',
	EMPTY: '.',
} as const

type Entities = (typeof ENTITIES)[keyof typeof ENTITIES]
type TachyonManifold = Entities[][]

const inputFilePath = path.resolve('src', '2025', 'day-7', 'input.txt')

const inputLines = createSyncLineListFromInput(inputFilePath)
const parsedInput = parseToManifold(inputLines)

function main() {
	console.log(
		'Part 1:',
		getTachyonBeamDispersionManifold(parsedInput).beamTimesSplit,
	)
}

main()

export function parseToManifold(lines: string[]) {
	return lines.map((line) => line.split('')) as TachyonManifold
}

export function getTachyonBeamDispersionManifold(input: TachyonManifold) {
	const initialMap = structuredClone(input)

	let beamTimesSplit = 0

	for (let row = 1; row < initialMap.length; row++) {
		for (let col = 0; col < initialMap[row].length; col++) {
			const prevChar = initialMap[row - 1][col]
			const currChar = initialMap[row][col]

			if (prevChar === ENTITIES.BEAM_START && currChar === ENTITIES.EMPTY) {
				initialMap[row][col] = ENTITIES.BEAM
				continue
			}

			if (prevChar === ENTITIES.BEAM && currChar === ENTITIES.EMPTY) {
				initialMap[row][col] = ENTITIES.BEAM
				continue
			}

			if (prevChar === ENTITIES.BEAM && currChar === ENTITIES.SPLITTER) {
				const leftFromCurr = initialMap[row][col - 1]
				const rightFromCurr = initialMap[row][col + 1]

				if (leftFromCurr === ENTITIES.EMPTY) {
					initialMap[row][col - 1] = ENTITIES.BEAM
				}

				if (rightFromCurr === ENTITIES.EMPTY) {
					initialMap[row][col + 1] = ENTITIES.BEAM
				}

				beamTimesSplit++
			}
		}
	}

	return { manifold: initialMap, beamTimesSplit }
}
