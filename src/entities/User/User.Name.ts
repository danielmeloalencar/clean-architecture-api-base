export class Name {
  private constructor(private nameValue: string) {}

  static create(name: string): Name {
    if (!name) {
      throw new Error('User email is required');
    }
    return new Name(name);
  }

  getValue(): string {
    return this.nameValue;
  }
}
