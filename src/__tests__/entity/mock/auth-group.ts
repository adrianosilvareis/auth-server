import { AuthGroup, AuthGroupProperties } from '@/entity/auth-group'
import { uuid } from '@/entity/utils'
import faker from 'faker'

export function mockAuthGroup (): AuthGroup {
  const activity = {
    name: faker.name.title(),
    permissions: [
      faker.lorem.word(5),
      faker.lorem.word(5),
      faker.lorem.word(5)
    ]
  }
  return {
    id: <uuid>faker.datatype.uuid(),
    title: faker.name.title(),
    activities: [activity]
  }
}

export function mockAuthGroupProperties (): AuthGroupProperties {
  const data = Object.assign({}, mockAuthGroup())
  Reflect.deleteProperty(data, 'id')
  return data
}
