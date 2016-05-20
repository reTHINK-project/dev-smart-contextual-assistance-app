import { Activity } from '../activity/activity';
import { Contact } from '../contact/contact';

export type ContextType = 'private' | 'public'

export interface Context {
  name: string
  icon?: string
  resource: string
  type: ContextType
  contacts: Contact[]
  activities: Activity[]
}
