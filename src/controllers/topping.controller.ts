import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Topping} from '../models';
import {ToppingRepository} from '../repositories';

export class ToppingController {
  constructor(
    @repository(ToppingRepository)
    public ToppingRepository: ToppingRepository,
  ) {}

  @post('/toppings', {
    responses: {
      '200': {
        description: 'Topping model instance',
        content: {'application/json': {schema: {'x-ts-type': Topping}}},
      },
    },
  })
  async create(@requestBody() Topping: Topping): Promise<Topping> {
    return await this.ToppingRepository.create(Topping);
  }

  @get('/toppings/count', {
    responses: {
      '200': {
        description: 'Topping model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Topping)) where?: Where,
  ): Promise<Count> {
    return await this.ToppingRepository.count(where);
  }

  @get('/toppings', {
    responses: {
      '200': {
        description: 'Array of Topping model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Topping}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Topping)) filter?: Filter,
  ): Promise<Topping[]> {
    return await this.ToppingRepository.find(filter);
  }

  @get('/toppings/{id}', {
    responses: {
      '200': {
        description: 'Order model instance',
        content: {'application/json': {schema: {'x-ts-type': Topping}}},
      },
    },
  })
  async findById(
    @param({name: 'id', in: 'path'}) id: string,
  ): Promise<Topping> {
    return await this.ToppingRepository.findById(id);
  }

  @patch('/toppings/{id}', {
    responses: {
      '204': {
        description: 'Order PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: string,
    @requestBody() order: Topping,
  ): Promise<void> {
    await this.ToppingRepository.updateById(id, order);
  }

  @del('/toppings/{id}', {
    responses: {
      '204': {
        description: 'Order DELETE success',
      },
    },
  })
  async deleteById(@param({name: 'id', in: 'path'}) id: string): Promise<void> {
    await this.ToppingRepository.deleteById(id);
  }
}
