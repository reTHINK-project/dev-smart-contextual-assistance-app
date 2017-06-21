import { config } from '../config';

// Models
import { ContextualComm } from '../models/models';

export function strMapToObj(strMap: Map<string, any>) {
    let obj = Object.create(null);
    strMap.forEach((v: any, k: string) => {
        obj[k] = v;
    });
    return obj;
}

export function objToStrMap(obj: any) {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
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

  let result = users.map((user) => {
    let pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    console.log('isAnUser:', pattern.test(user));
    return pattern.test(user);
  });

  console.log(result);
  return result[0] && result[1];
}

export function normalizeName(name: string, parent?: string): any {

  let prefix = config.appPrefix;
  let splitChar = config.splitChar;

  let at = new RegExp(/%40/g);

  // Clear path from attributes
  if (name.indexOf('?') !== -1) {
    name = name.substring(0, name.lastIndexOf('?'));
  }

  name = name.toLowerCase();
  name = name.replace(at, '@');

  let normalized = {};
  let splited = [];

  if (name.indexOf('/') !== -1) {
    splited = name.split('/');
    splited[0] = prefix;
  } else {
    if (!parent) { splited.push(prefix); }
    splited.push(name);
  }

  if (parent) {
    let tmp1: string[] = parent.split(splitChar);
    tmp1.reduceRight((prev: string[], curr: string) => {
      prev.unshift(curr);
      return prev;
    }, splited);

  }

  console.log('Splited: ', name, parent, splited);

  let userName = splited[3] === 'user' ? splited[4] : splited[3];
  let isTask = splited[2] === 'user' && isAnUser(splited[3]) ? false : true;

  if (!isTask) { userName = splited[3]; }

  let contextId = splited[0] + splitChar + splited[1];
  let task = isTask ? splited[2] : null;
  let user = userName ? userName : null;

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

  let splitChar = config.splitChar;
  let splited = name.split(splitChar);
  let result = {};

  let context = splited[1];
  let task = splited[2];
  let user = splited[3];

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
      let users = user.split('-');

      if (currentUser) {
        users.splice(users.indexOf(currentUser), 1);
      }

      result['user'] = users[0];
    }

  }

  return result;
}

export function normalizeFromURL(path: string, username: string): string {

  let splitChar = config.splitChar;

  let at = new RegExp(/%40/g);
  path = path.replace(at, '@');

  // Clear path from attributes
  if (path.indexOf('?') !== -1) {
    path = path.substring(0, path.lastIndexOf('?'));
  }

  let pathSplited = path.split('/');
  pathSplited[0] = config.appPrefix;

  if (path.includes('@') && username) {
    let lastIndex = pathSplited.length - 1;
    let last = pathSplited[lastIndex];
    let updated = last + '-' + username;
    pathSplited[lastIndex] = updated;
  }

  let joined = pathSplited.join(splitChar);

  console.log('AQUI:', path, username, pathSplited, joined);
  return joined;
}


export function filterContextsByName(name: string, context: ContextualComm): boolean {

  if (name.includes('@')) {

    let users = name.split('-');
    let user1 = users[0];
    let user2 = users[1];

    let variation1 = user1 + '-' + user2;
    let variation2 = user2 + '-' + user1;

    if (context.name === variation1) {
      name = variation1;
    } else if (context.name === variation2) {
      name = variation2;
    }
  }

  console.log('[ContextualCommData Service] - getting Context By Name: ', context.name, name, context.name === name);
  return context.name === name;
}
