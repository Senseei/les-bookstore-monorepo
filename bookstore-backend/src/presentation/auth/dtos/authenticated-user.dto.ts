export class AuthenticatedUserDTO {
  constructor(
    public id: string,
    public name: string,
    public email: string,
  ) {}
}
