import { IHypertyResource } from './IHypertyResource';
import { IContextualCommUser } from './IContextualCommUser';

export type ICommunictionStatus = 'open' | 'pending' | 'closed' | 'paused' | 'failed';

export interface ICommunication {
  scheme:string
  startingTime: Date
  lastModified: Date
  status: ICommunictionStatus
  resources: IHypertyResource[],
  children: string

  id?: string
  name?: string
  duration?: Date
  participants?: IContextualCommUser
  owner?: string
}

export interface IChatMessage {
  message: string
}
