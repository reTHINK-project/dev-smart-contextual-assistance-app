## Contextual Communication Data Model

The picture below depicts the Contextual Communication model used.
Each Contextual Communication session is characterised by a [Context data object]() and a [Communication Data Object]() that Hyperties use to manage context and communication in a integrated way.

![Contextual Communication model](contextual-communication-design.png)

Contextual Communications can be triggered by different Context values - ContextualCommTrigger - for example for certain location values. On the other side Contextual Communications are composite objects - CompositeContextualComm - organised in a tree structure, where the leaves are atomic objects - AtomicContextualComm.

The Application uses ContextName, ContextScheme and ContextResource defined by ContextualCommTrigger,  to discover and subscribe to Context Data Objects which will provide the data required to trigger the execution of each Contextual Communication session.

This model can be extended for specific Contexts like the Work Context as depicted below, where a tree of three layers is designed. Namely, the ContextualCommWork is the top root composite ContextualCommunication object comprised by ContextualCommWorkTask composite objects - i.e. represents work tasks - which have a set of ContextualCommWorkTaskUser atomic objects - i.e. represents users working in the task it belongs to.

![Contextual Work Communication model](contextual-work-comm.png)

As shown in the picture below, the ContextualCommWork class uses Context objects of type "Activity" that have different types of ContextValues including Location, Availability, UserCommunication and UserActivity.


![Work Context model](work-context.png)
