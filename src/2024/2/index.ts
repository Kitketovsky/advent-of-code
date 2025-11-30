import { accessSync, constants, createReadStream } from 'node:fs'
import path from 'node:path'
import readline from 'node:readline/promises'

async function main() {
	const inputFilePath = path.join(
		process.cwd(),
		'src',
		'2024',
		'2',
		'input.txt',
	)

	accessSync(inputFilePath, constants.R_OK)

	const safeReportsAmount = await getSafeReportsAmount(inputFilePath)

	return { safeReportsAmount }
}

main().then(console.log)

type Level = number
type Report = Level[]

async function getSafeReportsAmount(filepath: string) {
	const rl = readline.createInterface({
		input: createReadStream(filepath, { encoding: 'utf-8' }),
		crlfDelay: Infinity,
	})

	let safeReportsAmount = 0

	for await (const line of rl) {
		const report: Report = parseReportFromInputLine(line)
		const isReportSafe = checkReportSafety(report)

		if (isReportSafe) {
			safeReportsAmount++
		}
	}

	return safeReportsAmount
}

function parseReportFromInputLine(line: string) {
	return line.split(' ').map(Number)
}

function checkReportSafety(report: Report) {
	let hasIncreased = false
	let hasDecreased = false

	const MAX_LEVEL_DIFF = 3
	const MIN_LEVEL_DIFF = 1

	for (let i = 1; i < report.length; i++) {
		const levelDiff = report[i] - report[i - 1]
		const absLevelDiff = Math.abs(levelDiff)

		if (absLevelDiff < MIN_LEVEL_DIFF || absLevelDiff > MAX_LEVEL_DIFF) {
			return false
		}

		if (!hasIncreased && levelDiff > 0) {
			hasIncreased = true
		}

		if (!hasDecreased && levelDiff < 0) {
			hasDecreased = true
		}

		const isReportInconsistent = hasIncreased && hasDecreased

		if (isReportInconsistent) {
			return false
		}
	}

	return true
}
