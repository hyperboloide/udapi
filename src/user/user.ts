import { Serializable } from '../interfaces/serializable';

export class User implements Serializable {
  id: number;
  name: string;
  picture: string;

  equal(u: User): boolean {
    return u.id == this.id;
  }

  serialize(): any {
    return {
      id: this.id,
      name: this.name,
      picture: this.picture,
    }
  }

  deserialize(obj: any): User {
    this.id = obj.id;
    this.name = obj.name;
    this.picture = obj.picture;

    return this;
  }
}
