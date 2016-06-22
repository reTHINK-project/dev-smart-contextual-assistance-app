import { Communication, ChatMessage } from './Communication';
import { ContextualCommUser } from './ContextualCommUser';
import { Context, TimeActivity } from './Context';

export type HypertyResource = 'chat' | 'video' | 'audio';

export interface ContextualCommTrigger {
  contextName?: string
  contextScheme?: string
  contextResource?: HypertyResource[]
  values?: ContextValues[]
  trigger: ContextualComm
}

export interface ContextualComm {

  url: string // id from context data object reporter url
  communication: Communication
  context?: Context // TODO remove this as optional

  users?: ContextualCommUser[]
  messages?: ChatMessage[]
  files?: HypertyResource[]
  photos?: HypertyResource[]
  audios?: HypertyResource[]
  videos?: HypertyResource[]

}

export interface ContextValues {
  [index: string]: string | number
  name: string
  unit: string
  value: number
  sum: number
}
