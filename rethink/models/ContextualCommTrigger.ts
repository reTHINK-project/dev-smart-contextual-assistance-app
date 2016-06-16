import { Communication} from './Communication';
import { ActivityContext, TimeActivity } from './ActivityContext';

export type HypertyResource = 'chat' | 'video' | 'audio';

export interface ContextualCommTrigger {
  contextName?: string
  contextScheme?: string
  contextResource?: HypertyResource[]
  values?: ContextValues[]
  triggers: ContextualComm[]
}

export interface ContextualComm {

  communications: Communication[]
  activities: ActivityContext[]

}

export interface ContextValues {
  [index: string]: string | number
  name: string
  unit: string
  value: number
  sum: number
}
