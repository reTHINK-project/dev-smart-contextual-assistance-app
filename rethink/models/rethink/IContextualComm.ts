import { IContextualComm } from './IContextualCommTrigger';
import { IContextualCommUser } from './IContextualCommUser';
import { IHypertyResource } from './IHypertyResource';

export interface IContextualComm extends IContextualComm {

  name?: string
  description?: string

  parent?: string
  contexts: string[]
  users?: IContextualCommUser[]
}

export interface IContextualCommTaskUser extends IContextualComm {
  parent: IContextualComm
  users: IContextualCommUser[]
}
