import { ContextualCommResolve } from './contextualComm.resolve';
import { UserResolve } from './user.resolve';

export * from './contextualComm.resolve';
export * from './user.resolve';

export var resolvesInjectables: Array<any> = [
  ContextualCommResolve,
  UserResolve
]