export type DataCustodyKind = "logs" | "records" | "state";

export declare const DATA_CUSTODY_KINDS: readonly ["logs", "records", "state"];

export declare function dataCustodyDirectory(
  root: string,
  kind: DataCustodyKind,
  ...segments: string[]
): string;

export declare function dataCustodyDirectories(root: string): Readonly<{
  root: string;
  logs: string;
  records: string;
  state: string;
}>;
