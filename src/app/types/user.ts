export class User {
  username: string | null;
  email: string;
  password: string;

  constructor(username: string | null, email: string, password: string) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}