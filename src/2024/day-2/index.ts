import path from 'node:path'

import { createLineListFromInput } from './../../utils/createLineListFromInput'

const inputFilePath = path.join(
	process.cwd(),
	'src',
	'2024',
	'day-2',
	'input.txt',
)

createLineListFromInput(inputFilePath)
	.then(parseReportsFromInputLines)
	.then((reports) => {
		console.log(getSafeReportsAmount(reports, { dampening: false }))
		console.log(getSafeReportsAmount(reports, { dampening: true }))
	})

type Level = number
type Report = Level[]

export function parseReportsFromInputLines(lines: string[]): Report[] {
	return lines.map((line) => line.trim().split(' ').map(Number))
}

function getSafeReportsAmount(
	reports: Report[],
	{ dampening }: { dampening: boolean },
) {
	let safeReportsAmount = 0

	for (const report of reports) {
		const isReportSafe = checkReportSafety(report, { dampening })

		if (isReportSafe) {
			safeReportsAmount++
		}
	}

	return safeReportsAmount
}

export function checkReportSafety(
	report: Report,
	{ dampening }: { dampening: boolean },
) {
	if (dampening) {
		for (let i = 0; i < report.length; i++) {
			const modifiedReport = report.filter((_, index) => index !== i)

			if (isReportSafeWithoutDampening(modifiedReport)) {
				return true
			}
		}
	}

	return isReportSafeWithoutDampening(report)
}

export function isReportSafeWithoutDampening(report: Report): boolean {
	const COMPARABLE_REPORT_LENGTH = 2

	if (report.length < COMPARABLE_REPORT_LENGTH) return true

	const MAX_LEVEL_DIFF = 3
	const MIN_LEVEL_DIFF = 1

	const firstDiff = report[1] - report[0]
	const absFirstDiff = Math.abs(firstDiff)

	if (absFirstDiff < MIN_LEVEL_DIFF || absFirstDiff > MAX_LEVEL_DIFF) {
		return false
	}

	const isIncreasing = firstDiff > 0

	for (let i = 1; i < report.length; i++) {
		const levelDiff = report[i] - report[i - 1]
		const absLevelDiff = Math.abs(levelDiff)

		if (absLevelDiff < MIN_LEVEL_DIFF || absLevelDiff > MAX_LEVEL_DIFF) {
			return false
		}

		const currentIsIncreasing = levelDiff > 0

		if (currentIsIncreasing !== isIncreasing) {
			return false
		}
	}

	return true
}
