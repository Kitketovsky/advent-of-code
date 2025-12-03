import { accessSync, constants, createReadStream } from 'node:fs'
import { createInterface } from 'node:readline/promises'

export async function createLineListFromInput(path: string) {
	try {
		accessSync(path, constants.R_OK)
	} catch {
		throw new Error(`File '${path}' is not readable`)
	}

	const result: string[] = []

	const rl = createInterface({
		input: createReadStream(path, {
			encoding: 'utf8',
		}),
		crlfDelay: Infinity,
	})

	for await (const line of rl) {
		result.push(line)
	}

	return result
}
