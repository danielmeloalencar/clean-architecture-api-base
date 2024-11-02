import * as crypto from 'crypto';

export class Id {
  private constructor(private idValue: string) {}

  static create(id?: string): Id {
    if (!id) {
      return new Id(Id.generateUUID());
    }

    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(id)) {
      throw new Error('User id must be a valid UUID');
    }

    return new Id(id);
  }

  static generateUUID(): string {
    return crypto.randomUUID().toString();
  }

  getValue(): string {
    return this.idValue;
  }
}
