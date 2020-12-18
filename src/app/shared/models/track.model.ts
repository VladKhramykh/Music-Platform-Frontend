import {Category} from './category.model';
import {Album} from './album.model';
import {Artist} from './artist.model';
import {UserModel} from './user.model';

export class Track {
  id: number;
  name: string;
  type: string;
  description: string;
  photoUri: string;
  trackUri: string;
  releaseDate: number;
  album: Album;
  trackText: string;
  artists: Artist[];
  likes: UserModel[];
  categories: Category[];
}
