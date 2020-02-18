import {Entity, model, property} from '@loopback/repository';

@model()
export class Topping extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  price?: string;

  constructor(data?: Partial<Topping>) {
    super(data);
  }
}
