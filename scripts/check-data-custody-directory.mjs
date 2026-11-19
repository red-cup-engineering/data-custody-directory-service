#!/usr/bin/env node
import { readdirSync, realpathSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { DATA_STORAGE_KINDS, dataStorageDirectory } from "../src/data-custody-directory.mjs";

const DATA_STORAGE_KIND_SET = new Set(DATA_STORAGE_KINDS);

/**
 * @param {string} metaUrl
 * @returns {boolean} whether this module was invoked directly (a bin symlink resolves through realpath)
 */
function isEntrypoint(metaUrl) {
  if (!process.argv[1]) return false;
  try {
    return realpathSync(process.argv[1]) === realpathSync(fileURLToPath(metaUrl));
  } catch {
    return false;
  }
}

/**
 * Derive whether a section root's `data/` directory conforms to the
 * `logs`/`records`/`state` trio — the deriving tool a verifier runs
 * instead of hand-surveying the directory.
 *
 * @param {string} root - the section's absolute root directory
 * @returns {Readonly<{root: string, dataDirectory: string, conformant: boolean, offenders: readonly string[]}>}
 * @throws {TypeError} when root is invalid
 */
export function checkDataStorageDirectory(root) {
  const dataDirectory = dirname(dataStorageDirectory(root, "logs"));
  let entries;
  try {
    entries = readdirSync(dataDirectory);
  } catch (error) {
    if (error.code === "ENOENT") {
      return Object.freeze({ root, dataDirectory, conformant: true, offenders: Object.freeze([]) });
    }
    throw error;
  }
  const offenders = Object.freeze(entries.filter((name) => !DATA_STORAGE_KIND_SET.has(name)));
  return Object.freeze({ root, dataDirectory, conformant: offenders.length === 0, offenders });
}

function main(argv) {
  const { values } = parseArgs({
    args: argv,
    options: { root: { type: "string" } },
    allowPositionals: false,
  });
  if (!values.root) {
    console.error("usage: check-data-custody-directory.mjs --root <dir>");
    process.exit(1);
  }
  const result = checkDataStorageDirectory(values.root);
  console.log(JSON.stringify(result, null, 2));
  if (!result.conformant) {
    process.exit(1);
  }
}

if (isEntrypoint(import.meta.url)) {
  main(process.argv.slice(2));
}
