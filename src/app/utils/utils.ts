import { config } from '../config';

// Models
import { ContextualComm } from '../models/models';

export function strMapToObj(strMap: Map<string, any>) {
    const obj = Object.create(null);
    strMap.forEach((v: any, k: string) => {
        obj[k] = v;
    });
    return obj;
}

export function objToStrMap(obj: any) {
    const strMap = new Map();
    for (const k of Object.keys(obj)) {
        strMap.set(k, obj[k]);
    }

    return strMap;
}

export function getUserMedia(constraints: any) {

  return new Promise((resolve, reject) => {

    navigator.mediaDevices.getUserMedia(constraints)
      .then((mediaStream: MediaStream) => {
        resolve(mediaStream);
      }).catch((reason: any) => {
        reject(reason);
      });
  });
}

export function isAnUser(name: string): boolean {
  console.log('isAnUser - name:', name);
  let users = [];
  if (name.indexOf('-') !== -1) {
    users = name.split('-');
  } else {
    users.push(name);
  }

  console.log('isAnUser - users:', users);

  const result = users.map((user) => {
    const pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    console.log('isAnUser:', pattern.test(user));
    return pattern.test(user);
  });

  console.log(result);
  return result[0] && result[1];
}

export function normalizeName(name: string, parent?: string): any {

  const prefix = config.appPrefix;
  const splitChar = config.splitChar;

  const at = new RegExp(/%40/g);

  // Clear path from attributes
  if (name.indexOf('?') !== -1) {
    name = name.substring(0, name.lastIndexOf('?'));
  }

  name = name.toLowerCase();
  name = name.replace(at, '@');

  const normalized = {};
  let splited = [];

  if (name.indexOf('/') !== -1) {
    splited = name.split('/');
    splited[0] = prefix;
  } else {
    if (!parent) { splited.push(prefix); }
    splited.push(name);
  }

  if (parent) {
    const tmp1: string[] = parent.split(splitChar);
    tmp1.reduceRight((prev: string[], curr: string) => {
      prev.unshift(curr);
      return prev;
    }, splited);

  }

  console.log('Splited: ', name, parent, splited);

  let userName = splited[3] === 'user' ? splited[4] : splited[3];
  const isTask = splited[2] === 'user' && isAnUser(splited[3]) ? false : true;

  if (!isTask) { userName = splited[3]; }

  const contextId = splited[0] + splitChar + splited[1];
  const task = isTask ? splited[2] : null;
  const user = userName ? userName : null;

  if (contextId) {
    normalized['id'] = contextId;
    normalized['name'] = splited[1];
    normalized['parent'] = null;
  }

  if (task) {
    normalized['id'] = contextId + splitChar + task;
    normalized['name'] = task;
    normalized['parent'] = contextId;
  }

  if (user) {
    normalized['id'] = contextId + splitChar + (task ? task  + splitChar : '') + user;
    normalized['name'] = user;
    normalized['parent'] = contextId + (task ? splitChar + task : '');
  }

  console.log('Normalized Path:', normalized);

  return normalized;
}

export function splitFromURL(name: string, currentUser?: string): any {

  const splitChar = config.splitChar;
  const splited = name.split(splitChar);
  const result = {};

  const context = splited[1];
  const task = splited[2];
  const user = splited[3];

  if (context) {
    result['context'] = context;
  }

  if (task) {
    result['context'] = context;
    result['task'] = task;
  }

  if (user) {
    result['context'] = context;
    result['task'] = task;

    if (user.includes('@') && user.includes('-')) {
      const users = user.split('-');

      if (currentUser) {
        users.splice(users.indexOf(currentUser), 1);
      }

      result['user'] = users[0];
    }

  }

  return result;
}

export function normalizeFromURL(path: string, username: string): string {

  const splitChar = config.splitChar;

  const at = new RegExp(/%40/g);
  path = path.replace(at, '@');

  // Clear path from attributes
  if (path.indexOf('?') !== -1) {
    path = path.substring(0, path.lastIndexOf('?'));
  }

  const pathSplited = path.split('/');
  pathSplited[0] = config.appPrefix;

  if (path.includes('@') && username) {
    const lastIndex = pathSplited.length - 1;
    const last = pathSplited[lastIndex];

    let updated = last;
    if (!last.includes(username)) {
      updated = last + '-' + username;
    }

    pathSplited[lastIndex] = updated;
  }

  const joined = pathSplited.join(splitChar);

  console.log('AQUI:', path, username, pathSplited, joined);
  return joined;
}

export function objectToPath(value: string): string {
  const prefix = config.appPrefix;
  const splitChar = config.splitChar;

  let path = '';

  if (value.includes(prefix)) {
    path = value.replace(prefix + splitChar, '');
  }

  console.log('ObjectToPath: ', value, ' | ', path);

  return path;
}

export function clearMyUsername(name: string, username: string): string {

  if (name.indexOf('-') !== -1 && name.indexOf('@') !== -1 && name.includes(username)) {
    return name.replace(username, '').replace('-', '');
  }

  return name;

}

export function filterContextsByName(name: string, context: ContextualComm): boolean {

  if (name.includes('@')) {

    const users = name.split('-');
    const user1 = users[0];
    const user2 = users[1];

    const variation1 = user1 + '-' + user2;
    const variation2 = user2 + '-' + user1;

    if (context.name === variation1) {
      name = variation1;
    } else if (context.name === variation2) {
      name = variation2;
    }
  }

  console.log('[ContextualCommData Service] - getting Context By Name: ', context.name, name, context.name === name);
  return context.name === name;
}

export function isALegacyUser(user: string): boolean {

  const reg = new RegExp(/([a-zA-Z]+):\/\//, 'i');
  return reg.test(user);

}


export function formatBytes(bytes: number, decimals: number) {

  if (bytes === 0) {
    return '0 Bytes';
  }

  const k = 1024;
  const dm = decimals || 2;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
