export enum AccountStatusEnum {
  WAITING_FOR_APPROVAL,
  APPROVED,
  REPROVED,
  BLOCKED
}

export interface Address {
  street: string // confidential data
  suite: string // confidential data
  city: string // confidential data
  zipCode: string // confidential data
}

export interface Account {
  name: string // confidential data
  username: string // confidential data
  email: string // confidential data
  phone: string // confidential data
  address?: Address // confidential data,
  createdAt: Date
  active: boolean // only approved status
  status: AccountStatusEnum
}
