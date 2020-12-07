import {UserModel} from './user.model';

export class Album {
  id: number;
  name: string;
  description: string;
  photoUri: string;
  releaseDate: number;
  likes: UserModel[];
  type: string;
}
