import { Activity } from '../activity/activity';
import { Contact } from '../contact/contact';

export type ContextType = 'private' | 'public'

export interface Context {

  parent: string

  // Direct Data Object Mapping
  id: string
  name: string
  schema: string
  reporter: string
  participants: any
  duration: string
  owner: string
  status: string
  startingTime: string
  lastModified: string

  qos?: string

  // Specificic data Object Mapping
  resource: string // url
  icon?: string
  type: ContextType
  contacts: Contact[] // participants or subscriptions
  childs: Context[]
  activities: Activity[] // childrens
}
