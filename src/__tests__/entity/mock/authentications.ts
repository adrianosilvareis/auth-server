import { Authentication, StatusType } from '@/entity/authentication'
import faker from 'faker'

export function mockAuthentication (): Authentication {
  const authGroup = []
  for (let index = 0; index < 3; index++) {
    authGroup.push(faker.datatype.uuid())
  }
  return {
    id: faker.datatype.uuid(),
    accountId: faker.datatype.uuid(),
    password: faker.internet.password(8),
    attempts: faker.datatype.number(2),
    sessionLimit: faker.datatype.number(3),
    status: StatusType.Offline,
    active: true,
    authGroup,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  }
}
