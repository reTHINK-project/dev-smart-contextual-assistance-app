
// TODO: should be used like a user with avatar, name, etc;
// At this moment, we are using the UserIdentity
import { User } from '../../../models/models';


export interface MediaModalType {
  title: string;
  description?: string;
  mediaContentURL: any;
  size: string;
  mimetype: string;
  type: string;
  user?: User;
}
