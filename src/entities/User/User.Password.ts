export class Password {
  private constructor(private passwordValue: string) {}

  static create(password: string): Password {
    if (!password || password.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }
    if (!/[A-Z]/.test(password)) {
      throw new Error('Password must contain uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      throw new Error('Password must contain lowercase letter');
    }
    if (!/[0-9]/.test(password)) {
      throw new Error('Password must contain number');
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      throw new Error('Password must contain special character');
    }

    return new Password(password);
  }

  static createHashed(hashedPassword: string): Password {
    return new Password(hashedPassword);
  }

  getValue(): string {
    return this.passwordValue;
  }
}
