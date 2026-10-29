import type {
  DataCustodyMigrationRefusal,
  DataCustodyMigrationRow,
} from "../src/migrate-data-custody-directory.mjs";

export type {
  DataCustodyMigrationAppliedRow,
  DataCustodyMigrationApplyMethod,
  DataCustodyMigrationClassification,
  DataCustodyMigrationEntryDescriptor,
  DataCustodyMigrationRefusal,
  DataCustodyMigrationRow,
} from "../src/migrate-data-custody-directory.mjs";

export declare function resolveMigrationDataDir(
  options: Readonly<{ dataDir?: string; packageDir?: string }>,
): string;

export type DataCustodyMigrationResult = Readonly<{
  kind: "data-custody-directory.migration";
  dataDir: string;
  rows: readonly DataCustodyMigrationRow[];
  refusals: readonly DataCustodyMigrationRefusal[];
  applied: readonly unknown[] | null;
  offendersAfter: number | null;
  ok: boolean;
}>;

export declare function migrateDataCustodyDirectory(
  dataDir: string,
  options?: Readonly<{ apply?: boolean }>,
): DataCustodyMigrationResult;
