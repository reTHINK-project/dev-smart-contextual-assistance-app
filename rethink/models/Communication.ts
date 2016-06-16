import { HypertyResource } from './HypertyResource';
import { UserProfile } from './UserProfile';

export type CommunictionStatus = 'open' | 'pending' | 'closed' | 'paused' | 'failed';

export interface Communication {
  scheme:string
  startingTime: Date
  lastModified: Date
  status: CommunictionStatus
  resources: HypertyResource,
  children: string

  id?: string
  name?: string
  duration?: Date
  participants?: UserProfile
}
