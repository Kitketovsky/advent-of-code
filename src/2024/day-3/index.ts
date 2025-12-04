import path from 'node:path'

import { createLineListFromInput } from './../../utils/createLineListFromInput'

const inputFilePath = path.resolve('src', '2024', 'day-3', 'input.txt')

createLineListFromInput(inputFilePath).then((lines) => {
	const joinedLines = lines.join('')
	console.log('Part 1:', parseCorruptedLine(joinedLines))
	console.log('Part 2:', parseCorruptedLineWithEnabling(joinedLines))
})

export function parseCorruptedLine(line: string) {
	const regexp = /mul\((\d+),(\d+)\)/gm
	const matches = line.matchAll(regexp)

	let mulSum = 0

	for (const [, a, b] of matches) {
		mulSum += parseInt(a) * parseInt(b)
	}

	return mulSum
}

export function parseCorruptedLineWithEnabling(line: string) {
	const regexp = /do\(\)|don't\(\)|mul\((\d+),(\d+)\)/gm
	const matches = line.matchAll(regexp)

	let enabled = true
	let mulSum = 0

	for (const [match, a, b] of matches) {
		if (match === 'do()') {
			enabled = true
		} else if (match === "don't()") {
			enabled = false
		} else if (enabled && a && b) {
			mulSum += parseInt(a) * parseInt(b)
		}
	}

	return mulSum
}
