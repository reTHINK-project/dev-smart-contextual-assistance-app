import { IContextualComm } from './IContextualComm';
import { IContextualCommUser } from './IContextualCommUser';
import { IHypertyResource } from './IHypertyResource';

export interface IContextualCommTrigger {
  contextName?: string
  contextScheme?: string
  contextResource?: IHypertyResource[]
  values?: IContextValues[]
  trigger: IContextualComm[]
}

export interface IContextValues {
  [index: string]: string | number
  name: string
  unit: string
  value: number
  sum: number
}
