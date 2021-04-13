import { Session } from '@/entity/session'
import faker from 'faker'

export function mockReturnSession (): Session {
  return {
    id: faker.datatype.uuid(),
    ip: faker.internet.ip(),
    authenticationId: faker.datatype.uuid(),
    createdAt: faker.date.recent(),
    active: true,
    userAgent: faker.internet.userAgent(),
    dueDate: faker.date.future()
  }
}

export function mockReturnGetSessionListRepository (): Session[] {
  const sessions: Session[] = []
  for (let row = 12; row >= 0; row--) {
    sessions.push(mockReturnSession())
  }
  return sessions
}
