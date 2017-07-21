import { environment } from '../environments/environment';

export const config = {
  pageTitlePrefix: 'reThink Project - ',
  appPrefix: 'sca',
  splitChar: '/',
  domain: environment.host,
  images: environment.images,
  sounds: environment.sounds
};
