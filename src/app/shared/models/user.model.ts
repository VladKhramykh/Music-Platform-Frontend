import {Gender} from './gender.model';
import {Country} from './country.model';

export interface UserModel {
  id: number,
  username: string,
  lastName: string,
  firstName: string,
  birthday: string,
  email: string,
  gender: Gender,
  photoUri: string,
  country: Country,
  role: string,
  password: string,
  activationCode: string,
}
