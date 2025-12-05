import { accessSync, constants, readFileSync } from 'node:fs'

export function createSyncLineListFromInput(path: string) {
	try {
		accessSync(path, constants.R_OK)
	} catch {
		throw new Error(`File '${path}' is not readable`)
	}

	const result: string[] = []

	readFileSync(path, 'utf8')
		.split('\n')
		.forEach((line) => {
			if (line) {
				result.push(line)
			}
		})

	return result
}
