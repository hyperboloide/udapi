
export interface Serializable {
  serialize(): any;
  deserialize(obj: any): Serializable;
}
