export class AuthenticatedUserDTO {
  constructor(
    public id: number,
    public name: string,
    public email: string,
  ) {}
}
