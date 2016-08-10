import { Communication } from '../rethink/Communication';
import { Context, TimeActivity } from './Context';
import { UserIdentity } from '../rethink/UserIdentity';
import { HypertyResource } from '../rethink/HypertyResource';

export interface ContextualComm {

  url: string // id from context data object reporter url
  communication: Communication
  context?: Context // TODO remove this as optional

  users?: UserIdentity[]
  messages?: ChatMessage[]
  files?: HypertyResource[]
  photos?: HypertyResource[]
  audios?: HypertyResource[]
  videos?: HypertyResource[]

}

interface ChatMessage {

}