import { Activity } from '../activity/activity';
import { Contact } from '../contact/contact';

export interface Context {
  name: string
  icon: string
  communication : string
  contacts: Contact[]
  activities: Activity[]
}
