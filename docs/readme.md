
Smart Contextual Assistance Application
-------------------------------------

### Description

The Smart Contextual Assistance applications provides Contextual Communications and Connected Devices control. The user experience is automatically adapted according to user context in order to improve user focus and effectiveness.

The initial version is focused on Co-worker Business Conversation context and Personal Wellbeing context, using data collected from a connected Bracelet. The following Hyperties are used:

-	MyBracelet Hyperty to collect and publish data from a connected bracelet
-	User Status Hyperty to manage User availability context (presence status)
-	GroupChat Hyperty to support chat communication with group of users
-	Connector Hyperty to support Audio and Video communication with users

The picture below depicts the Contextual Communication model used.
Each Contextual Communication session is characterised by a [Context data object]() and a [Communication Data Object]() that Hyperties used to manage context and communication in a integrated way. On the other side Contextual Communications are composite objects - CompositeContextualComm - organised in a tree structure, where the leaves are atomic objects - AtomicContextualComm. Contextual Communications can be triggered by different Context values - ContextualCommTrigger - for example for certain location values.

The Application uses ContextName, ContextScheme and ContextResource defined by ContextualCommTrigger,  to discover and subscribe to Context Data Objects which will provide the data required to trigger the execution of each Contextual Communication session.

![Context Communication model](contextual-communication-design.png)


### User Journey

The user can explicitly select a certain context by clicking on top left side of the header and browse through the context tree.

![Context Management](ContextManagementGUI.png.png)

By default, when the Work context is selected or automatically triggered, the home screen is the Work Timeline is displayed, which contains:

-	A summary of shared work files.
-	the list of co-workers including its availability status
- last messages exchanged among co-workers.

![Work Context Home](WorkHomeGUI.png)

When a specific Contextual Work Communication starts (eg when the user selects from the Context browser or a Work Activity Context is inferred by the App), the Team Work Context UI is activated, which contains:

-	Messages exchanged in the Team Work context.
-	an input form to write and send chat messages to Fitness Buddies
-	at the top the conversation subject and topic as well as commands to start audio or video communication.
-	files shared in the team
- button to share files

![Peer Work Context](UserWorkContextGUI.png)

When a audio communication is started in a Work Peer context, the following actions and data is displayed:

-	Notification of new messages of other active Buddies
-	Icon to signal an on going audio conversation which can also be used to add video or close the conversation
-	at the bottom still an input form to write and send chat messages to Work Peer, as well as share files

![Audio Communication in Peer Work Context](AudioConversationGui.png)

Video Communication is also supported in a Work Peer Context:

![Video Communication in Peer Work Context](AVConversationGui.png)
