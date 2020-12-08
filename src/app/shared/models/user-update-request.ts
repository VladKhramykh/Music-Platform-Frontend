export interface UserUpdateRequest {
  id: number,
  lastName: string,
  firstName: string,
  birthday: string,
  email: string,
  gender: string,
  photoFile: File,
  country: string,
  password: string
}
