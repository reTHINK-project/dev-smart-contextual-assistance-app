import { ICommunication, IChatMessage } from './ICommunication';
import { IContextualCommUser } from './IContextualCommUser';
import { IContext, ITimeActivity } from './IContext';
import { IHypertyResource } from './IHypertyResource';

export interface IContextualCommTrigger {
  contextName?: string
  contextScheme?: string
  contextResource?: IHypertyResource[]
  values?: IContextValues[]
  trigger: IContextualComm
}

export interface IContextualComm {

  url: string // id from context data object reporter url
  communication: ICommunication
  context?: IContext // TODO remove this as optional

  users?: IContextualCommUser[]
  messages?: IChatMessage[]
  files?: IHypertyResource[]
  photos?: IHypertyResource[]
  audios?: IHypertyResource[]
  videos?: IHypertyResource[]

}

export interface IContextValues {
  [index: string]: string | number
  name: string
  unit: string
  value: number
  sum: number
}
