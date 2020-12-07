import {UserModel} from './user.model';

export class Category {
  id: number;
  name: string;
  description: string;
  likes: UserModel[]
}
