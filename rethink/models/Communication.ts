import { HypertyResource } from './HypertyResource';
import { ContextualCommUser } from './ContextualCommUser';

export type CommunictionStatus = 'open' | 'pending' | 'closed' | 'paused' | 'failed';

export interface Communication {
  [index: string]: string | number | Date | ContextualCommUser
  scheme:string
  startingTime: Date
  lastModified: Date
  status: CommunictionStatus
  resources: HypertyResource,
  children: string

  id?: string
  name?: string
  duration?: Date
  participants?: ContextualCommUser
  owner?: string
}


export interface ChatMessage {
  message: string
}
