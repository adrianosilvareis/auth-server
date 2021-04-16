import { Account, AccountStatusEnum } from '@/entity/account'
import faker from 'faker'

export function mockAccount (): Account {
  return {
    name: faker.name.firstName(),
    active: true,
    createdAt: faker.date.past(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    username: faker.internet.userName(),
    status: AccountStatusEnum.APPROVED,
    address: null
  }
}
