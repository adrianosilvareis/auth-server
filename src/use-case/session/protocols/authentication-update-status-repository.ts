import { Authentication, AuthenticationStatusEnum } from '@/entity/authentication'

export interface AuthenticationUpdateStatusRepository {
  updateStatus(authenticationId: string, status: AuthenticationStatusEnum): Promise<Authentication>
}
