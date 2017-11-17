import { HypertyResourceType } from './HypertyResource';
import { UserIdentity } from './UserIdentity';

export interface Communication {
  scheme: string;
  startingTime: Date;
  lastModified: Date;
  status: CommunictionStatus;
  resources: HypertyResourceType[];
  children: string;

  created?: Date;

  id?: string;
  name?: string;
  duration?: Date;
  participants?: UserIdentity[];
  owner?: string;
}

export enum CommunictionStatus {
  Open = <any>'Open',
  Pending = <any>'Pending',
  Closed = <any>'Closed',
  Paused = <any>'Paused',
  Failed = <any>'Failed'
}
