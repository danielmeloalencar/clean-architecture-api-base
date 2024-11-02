import { Email } from './User.Email';
import { Id } from './User.Id';
import { Name } from './User.Name';
import { Password } from './User.Password';

export type userProps = {
  id: Id;
  name: Name;
  email: Email;
  password: Password;
  createdAt: Date;
  updatedAt: Date;
};

export type userInputProps = {
  id: Id;
  name: Name;
  email: Email;
  password: Password;
};

export class User {
  constructor(readonly props: userProps) {}

  public static create(userInputProps: userInputProps): User {
    return new User({
      id: userInputProps.id,
      name: userInputProps.name,
      email: userInputProps.email,
      password: userInputProps.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public static toJSON(id: string, name: string, email: string, password: string, createdAt: Date, updatedAt: Date): User {
    return new User({
      id: Id.create(id),
      name: Name.create(name),
      email: Email.create(email),
      password: Password.createHashed(password),
      createdAt: createdAt,
      updatedAt: updatedAt,
    });
  }

  public get name() {
    return this.props.name;
  }

  public get email() {
    return this.props.email;
  }

  public get password() {
    return this.props.password;
  }

  public get id() {
    return this.props.id;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }
}
