export class Email {
  private constructor(private emailValue: string) {}

  static create(email: string): Email {
    if (!email) {
      throw new Error('User email is required');
    }
    return new Email(email);
  }

  getValue(): string {
    return this.emailValue;
  }
}
