import { accessSync, constants, createReadStream } from 'node:fs'
import path from 'node:path'
import readline from 'node:readline/promises'

async function main() {
	const inputFilePath = path.join(
		process.cwd(),
		'src',
		'2024',
		'day-2',
		'input.txt',
	)

	accessSync(inputFilePath, constants.R_OK)

	const safeReportsAmount = await getSafeReportsAmount(inputFilePath, {
		dampening: false,
	})

	const safeReportsAmountWithDampening = await getSafeReportsAmount(
		inputFilePath,
		{ dampening: true },
	)

	return { safeReportsAmount, safeReportsAmountWithDampening }
}

main().then(console.log)

type Level = number
type Report = Level[]

async function getSafeReportsAmount(
	filepath: string,
	{ dampening }: { dampening: boolean },
) {
	const rl = readline.createInterface({
		input: createReadStream(filepath, { encoding: 'utf-8' }),
		crlfDelay: Infinity,
	})

	let safeReportsAmount = 0

	for await (const line of rl) {
		if (!line.trim()) continue

		const report: Report = parseReportFromInputLine(line)
		const isReportSafe = checkReportSafety(report, { dampening })

		if (isReportSafe) {
			safeReportsAmount++
		}
	}

	return safeReportsAmount
}

function parseReportFromInputLine(line: string) {
	return line.split(' ').map(Number)
}

function checkReportSafety(
	report: Report,
	{ dampening }: { dampening: boolean },
) {
	if (isReportSafeWithoutDampening(report)) {
		return true
	}

	if (dampening) {
		for (let i = 0; i < report.length; i++) {
			const modifiedReport = report.filter((_, index) => index !== i)

			if (isReportSafeWithoutDampening(modifiedReport)) {
				return true
			}
		}
	}

	return false
}

function isReportSafeWithoutDampening(report: Report): boolean {
	const COMPARABLE_REPORT_LENGTH = 2

	if (report.length < COMPARABLE_REPORT_LENGTH) return true

	const MAX_LEVEL_DIFF = 3
	const MIN_LEVEL_DIFF = 1

	const firstDiff = report[1] - report[0]

	if (firstDiff < MIN_LEVEL_DIFF) return false

	const isIncreasing = firstDiff > MIN_LEVEL_DIFF - 1

	for (let i = 1; i < report.length; i++) {
		const levelDiff = report[i] - report[i - 1]
		const absLevelDiff = Math.abs(levelDiff)

		if (absLevelDiff < MIN_LEVEL_DIFF || absLevelDiff > MAX_LEVEL_DIFF) {
			return false
		}

		const currentIsIncreasing = levelDiff > MIN_LEVEL_DIFF - 1

		if (currentIsIncreasing !== isIncreasing) {
			return false
		}
	}

	return true
}
