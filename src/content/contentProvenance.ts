/**
 * V15 CONTENT PROVENANCE AUTHORITY
 * 
 * Enforces Hard Invariant:
 * Every text literal rendered in V15 production must have explicit provenance.
 * Permitted Provenance Categories:
 * - NARRATION_EXACT: Exact word sequence spoken in the master voiceover stem.
 * - SOURCE_DOCUMENT_EXACT: Verbatim text from official statutory article (e.g. ministerial regulation).
 * - USER_PROVIDED: Explicit instruction from the human producer.
 * - BRAND_ASSET: Verified institutional crest / seal identity.
 * 
 * If ANY string lacks valid provenance -> BUILD FAIL.
 */

export type TextProvenance =
  | 'NARRATION_EXACT'
  | 'SOURCE_DOCUMENT_EXACT'
  | 'USER_PROVIDED'
  | 'BRAND_ASSET';

export interface ProvenanceRecord {
  id: string;
  text: string;
  provenance: TextProvenance;
  sourceReference: string;
  verified: boolean;
}

export class ProvenanceAuthority {
  private static registeredRecords: Map<string, ProvenanceRecord> = new Map();

  public static register(record: ProvenanceRecord): void {
    const validCategories: TextProvenance[] = [
      'NARRATION_EXACT',
      'SOURCE_DOCUMENT_EXACT',
      'USER_PROVIDED',
      'BRAND_ASSET',
    ];

    if (!validCategories.includes(record.provenance)) {
      throw new Error(
        `[ProvenanceAuthority BUILD FAIL] Invalid provenance '${record.provenance}' for text: "${record.text}". Must be one of: ${validCategories.join(', ')}`
      );
    }

    this.registeredRecords.set(record.id, record);
  }

  public static verifyProvenance(id: string): boolean {
    const rec = this.registeredRecords.get(id);
    return rec ? rec.verified : false;
  }

  public static getAllRecords(): ProvenanceRecord[] {
    return Array.from(this.registeredRecords.values());
  }
}
