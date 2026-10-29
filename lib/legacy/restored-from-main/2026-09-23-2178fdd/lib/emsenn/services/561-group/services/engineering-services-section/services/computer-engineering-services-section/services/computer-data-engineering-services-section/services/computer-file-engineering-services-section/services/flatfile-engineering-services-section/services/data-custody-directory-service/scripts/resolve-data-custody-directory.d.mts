import type { DataCustodyKind } from "../src/data-custody-directory.mjs";

export type { DataCustodyKind };

export declare function resolveDataCustodyDirectory(
  root: string,
  kind: DataCustodyKind,
  segments?: readonly string[],
  options?: Readonly<{ create?: boolean }>,
): string;
