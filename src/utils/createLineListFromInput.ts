import { accessSync, constants, createReadStream } from 'node:fs'
import { createInterface } from 'node:readline/promises'

export async function createLineListFromInput(path: string) {
	accessSync(path, constants.R_OK)

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
