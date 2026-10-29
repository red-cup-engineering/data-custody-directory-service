export type DataCustodyMigrationClassification = "logs" | "records" | "state" | "purge";

export type DataCustodyMigrationEntryDescriptor = Readonly<{
  name: string;
  kind: "file" | "directory";
  isEmpty?: boolean;
  isJsonlLike?: boolean;
  isSchemaLike?: boolean;
  hasDateInName?: boolean;
  hasDatedSubtree?: boolean;
  jsonTopLevelFields?: readonly string[] | null;
}>;

export type DataCustodyMigrationRow = Readonly<{
  entry: string;
  kind: "file" | "directory";
  classification: DataCustodyMigrationClassification;
  reason: string;
  destination: string | null;
}>;

export type DataCustodyMigrationRefusal =
  | Readonly<{
      entry: string;
      reason: "unclassified";
    }>
  | Readonly<{
      entry: string;
      classification: DataCustodyMigrationClassification;
      reason: "referenced-by-writer";
      references: readonly string[];
    }>;

export declare function classifyDataCustodyEntry(
  entry: DataCustodyMigrationEntryDescriptor,
): DataCustodyMigrationRow | DataCustodyMigrationRefusal;

export declare function planDataCustodyMigration(dataDir: string): Readonly<{
  dataDir: string;
  rows: readonly DataCustodyMigrationRow[];
  refusals: readonly DataCustodyMigrationRefusal[];
}>;

export type DataCustodyMigrationApplyMethod = "git-mv" | "fs-rename" | "rmdir";

export type DataCustodyMigrationAppliedRow = Readonly<{
  entry: string;
  classification: DataCustodyMigrationClassification;
  method: DataCustodyMigrationApplyMethod;
  destination: string | null;
}>;

export declare function applyDataCustodyMigrationRow(
  dataDir: string,
  row: DataCustodyMigrationRow,
): DataCustodyMigrationAppliedRow;

export declare function applyDataCustodyMigrationPlan(
  dataDir: string,
  rows: readonly DataCustodyMigrationRow[],
): readonly DataCustodyMigrationAppliedRow[];
