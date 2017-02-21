import { ContextualComm } from './ContextualComm';
import { UserIdentity } from '../rethink/UserIdentity';
import { HypertyResource } from '../rethink/HypertyResource';

export interface ContextualCommTrigger {
  contextName?: string
  contextScheme?: string
  contextResource?: HypertyResource[]
  values?: ContextValues[]
  trigger: ContextualComm[]
}

export interface ContextValues {
  [index: string]: string | number
  name: string
  unit: string
  value: number
  sum: number
}
