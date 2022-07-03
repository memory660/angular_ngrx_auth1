export class User {
  constructor(
    private email: string,
    private token: string,
    private localId: string,
    private expirationDate: Date
  ) {}

  get expirationTime() {
    return this.expirationDate.getTime();
  }

  get userToken() {
    return this.token;
  }
}
