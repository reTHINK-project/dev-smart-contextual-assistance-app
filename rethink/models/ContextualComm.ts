import { ContextualComm } from './ContextualCommTrigger';
import { ContextualCommUser } from './ContextualCommUser';
import { HypertyResource } from './HypertyResource';

export interface ContextualComm extends ContextualComm {

  name?: string
  description?: string

  parent?: string
  contexts: string[]
  users?: ContextualCommUser[]
}

export interface ContextualCommTaskUser extends ContextualComm {
  parent: ContextualComm
  users: ContextualCommUser[]
}
