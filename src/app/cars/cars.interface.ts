export interface PartInterface {
  id?: number;
  name?: string;
  price?: number;
}

export interface CarInterface {
  id?: number;
  name?: string;
  parts?: PartInterface[];
  userId?: number;
}
