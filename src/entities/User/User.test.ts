import { Id } from './User.Id';
import { Name } from './User.Name';
import { Email } from './User.Email';
import { Password } from './User.Password';
import { User } from './User.Entity';

describe('User Entity', () => {
  it('should create a valid user', () => {
    const id = Id.create('aad2c8e3-b3db-4c22-beaa-ce69b22a6603');
    const name = Name.create('John Doe');
    const email = Email.create('john.doe@example.com');
    const password = Password.create('Password123!');
    const user = User.create({ id, name, email, password });

    expect(user.id.getValue()).toBe('aad2c8e3-b3db-4c22-beaa-ce69b22a6603');
    expect(user.name.getValue()).toBe('John Doe');
    expect(user.email.getValue()).toBe('john.doe@example.com');
    expect(user.password.getValue()).toBe('Password123!');
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);
  });

  it('should throw an error if user id is invalid', () => {
    expect(() => Id.create('invalid-uuid')).toThrow('User id must be a valid UUID');
  });

  it('should throw an error if user name is empty', () => {
    expect(() => Name.create('')).toThrow('User name is required');
  });

  it('should throw an error if user email is empty', () => {
    expect(() => Email.create('')).toThrow('User email is required');
  });

  it('should throw an error if user password is invalid', () => {
    expect(() => Password.create('short')).toThrow('Password must be at least 8 characters');
    expect(() => Password.create('nouppercase1!')).toThrow('Password must contain uppercase letter');
    expect(() => Password.create('NOLOWERCASE1!')).toThrow('Password must contain lowercase letter');
    expect(() => Password.create('NoNumber!')).toThrow('Password must contain number');
    expect(() => Password.create('NoSpecialChar1')).toThrow('Password must contain special character');
  });
});
