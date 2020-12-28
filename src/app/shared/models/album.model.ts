import {UserModel} from './user.model';
import {Artist} from './artist.model';

export class Album {
  id: number;
  name: string;
  description: string;
  photoUri: string;
  releaseDate: number;
  likes: UserModel[];
  type: string;
  artists: Artist[];
  createdBy: string;
  lastModifiedBy: string;
}
