export interface UserModel {
  id: number,
  firstName: string,
  lastName: string,
  createdDate: number,
  activationCode: string,
  email: string,
  birthday: string,
  photoUri: string,
  gender: string,
  country: string,
  roles: string[]
}
