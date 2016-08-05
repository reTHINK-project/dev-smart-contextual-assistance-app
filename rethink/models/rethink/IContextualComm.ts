import { ICommunication, IChatMessage } from './ICommunication';
import { IContext, ITimeActivity } from './IContext';
import { IContextualCommUser } from './IContextualCommUser';
import { IHypertyResource } from './IHypertyResource';

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