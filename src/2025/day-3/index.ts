import path from 'node:path'

import { createLineListFromInput } from './../../utils/createLineListFromInput'

const inputFilePath = path.resolve('src', '2025', 'day-3', 'input.txt')

createLineListFromInput(inputFilePath).then((banks) => {
	console.log('Part 1:', calculateMaxJoltageSum(banks, 2))
	console.log('Part 2:', calculateMaxJoltageSum(banks, 12))
})

export function calculateMaxinumJoltage(bank: string, batteriesToUse: number) {
	const stack: number[] = []
	for (let i = 0; i < bank.length; i++) {
		const currJoltage = Number(bank[i])

		while (
			stack.length &&
			currJoltage > stack[stack.length - 1] &&
			bank.length - i > batteriesToUse - stack.length
		) {
			stack.pop()
		}

		if (stack.length < batteriesToUse) {
			stack.push(currJoltage)
		}
	}

	return parseInt(stack.join(''))
}

export function calculateMaxJoltageSum(
	banks: string[],
	batteriesToUse: number,
) {
	return banks.reduce(
		(acc, bank) => acc + calculateMaxinumJoltage(bank, batteriesToUse),
		0,
	)
}
