import assert from "node:assert/strict";
import { join } from "node:path";
import test from "node:test";
import { dataCustodyDirectory, DATA_CUSTODY_KINDS } from "@red-cup-engineering/data-custody-directory-service";

test("DATA-CUSTODY-DIRECTORY-SERVICE-QUICKSTART", () => {
  const root = "/example/root";
  for (const kind of DATA_CUSTODY_KINDS) {
    assert.equal(dataCustodyDirectory(root, kind), join(root, "data", kind));
  }
  assert.equal(dataCustodyDirectory(root, "records", "schema", "thing.json"), join(root, "data", "records", "schema", "thing.json"));
});
