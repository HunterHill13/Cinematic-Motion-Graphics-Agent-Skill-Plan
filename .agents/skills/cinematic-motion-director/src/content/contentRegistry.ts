import { AUTHORIZED_CONTENT, ContentEntry } from './authorizedContent';

/**
 * CONTENT REGISTRY LOOKUP ENGINE (V14)
 * Provides type-safe access to locked content strings and asserts authorization.
 */
class ContentRegistry {
  private map: Map<string, ContentEntry> = new Map();

  constructor() {
    this.indexContent(AUTHORIZED_CONTENT);
  }

  private indexContent(obj: any) {
    for (const key of Object.keys(obj)) {
      const val = obj[key];
      if (val && typeof val === 'object') {
        if ('id' in val && 'text' in val) {
          this.map.set(val.id, val as ContentEntry);
        } else {
          this.indexContent(val);
        }
      }
    }
  }

  /**
   * Retrieves an authorized text string by its unique Content ID.
   * Throws an error in development if an unregistered ID is requested.
   */
  public getText(id: string): string {
    const entry = this.map.get(id);
    if (!entry) {
      throw new Error(`[ContentAuthority] Unauthorized text requested: "${id}" not found in registry.`);
    }
    return entry.text;
  }

  /**
   * Validates whether a given text string exists anywhere in the authorized registry.
   */
  public isAuthorized(text: string): boolean {
    const trimmed = text.trim();
    for (const entry of this.map.values()) {
      if (entry.text.trim() === trimmed) {
        return true;
      }
    }
    return false;
  }

  public getAllEntries(): ContentEntry[] {
    return Array.from(this.map.values());
  }
}

export const contentRegistry = new ContentRegistry();
