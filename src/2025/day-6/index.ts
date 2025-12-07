import path from 'node:path'

import { createSyncLineListFromInput } from '../../utils/createSyncLineListFromInput'

const inputFilePath = path.resolve('src', '2025', 'day-6', 'input.txt')

const input = createSyncLineListFromInput(inputFilePath)

function main() {
	console.log('Part 1:', calculateTopToBottomGrandTotal(input))
	console.log('Part 2:', calculateRightToLeftGrandTotal(input))
}

main()

const OPERATORS = {
	MUL: '*',
	ADD: '+',
} as const

type Operator = (typeof OPERATORS)[keyof typeof OPERATORS]

function calculateColumnTotal(column: number[], operator: Operator) {
	const INITIAL_VALUE = operator === '*' ? 1 : 0

	const total = column.reduce((acc, curr) => {
		switch (operator) {
			case '+':
				return acc + curr
			case '*':
				return acc * curr
			default:
				throw new Error(`Unknown operator: ${operator}`)
		}
	}, INITIAL_VALUE)

	return total
}

export function calculateTopToBottomGrandTotal(lines: string[]) {
	const trimmedLines = lines.map((line) => {
		const match = line.match(/\d+|[*+]/g)

		if (!match) throw new Error('Input line does not match regular expression')

		return match
	})

	const rowLength = trimmedLines.length
	const colLength = trimmedLines[0].length

	let grandTotal = 0

	for (let col = 0; col < colLength; col++) {
		let operator: Operator | null = null
		const operands: number[] = []

		for (let row = 0; row < rowLength; row++) {
			const curr = trimmedLines[row][col]

			if (curr === OPERATORS.MUL || curr === OPERATORS.ADD) {
				operator = curr
			} else {
				operands.push(Number(curr))
			}
		}

		if (operator) {
			grandTotal += calculateColumnTotal(operands, operator)
		}
	}

	return grandTotal
}

export function calculateRightToLeftGrandTotal(lines: string[]) {
	const rowLength = lines.length
	const colLength = lines[0].length

	let operator: Operator | null = null
	let grandTotal = 0

	let columnNumbers: number[] = []

	for (let col = 0; col < colLength; col++) {
		let numStringBuilder = ''

		for (let row = 0; row < rowLength; row++) {
			const char = lines[row][col]

			if (!char) continue

			const isMathOperator = char === OPERATORS.MUL || char === OPERATORS.ADD

			if (isMathOperator) {
				operator = char
				continue
			}

			numStringBuilder += char
		}

		const isColumnEmpty = numStringBuilder.trim() === ''

		if (isColumnEmpty && operator) {
			grandTotal += calculateColumnTotal(columnNumbers, operator)

			columnNumbers = []
			operator = null
		} else {
			columnNumbers.push(Number(numStringBuilder))
		}
	}

	if (columnNumbers.length && operator) {
		grandTotal += calculateColumnTotal(columnNumbers, operator)
	}

	return grandTotal
}
