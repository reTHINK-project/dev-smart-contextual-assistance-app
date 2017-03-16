import { HypertyResource, HypertyResourceType } from './HypertyResource';
import { UserIdentity } from './UserIdentity';

export interface Communication {
  scheme:string
  startingTime: Date
  lastModified: Date
  status: CommunictionStatus
  resources: HypertyResourceType[],
  children: string

  id?: string
  name?: string
  duration?: Date
  participants?: UserIdentity[]
  owner?: string
}

export enum CommunictionStatus {
  "Open", 
  "Pending", 
  "Closed", 
  "Paused", 
  "Failed"
}