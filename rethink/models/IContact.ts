import { IContextualCommUser } from './rethink/IContextualCommUser';

export interface IContact extends IContextualCommUser {
  // optional
  status?: string
  unread?: number
}
