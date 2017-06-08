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

function replaceToUrl(str: string): string {
  return str.replace(' ', '-');
}

export function normalizeName(name: string, parent?: string): any {

  let prefix = config.appPrefix;
  let splitChar = config.splitChar;

  let normalized = {};
  let splited = [];

  if (name.indexOf(splitChar) !== -1) {
    splited = name.split(splitChar);
  } else if (name.indexOf('/') !== -1) {
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

  console.log('Splited: ', name, splited);

  let contextId = splited[0] + splitChar + splited[1];
  let contextName = splited[1];
  let task = splited[2] ? splited[2] : null;
  let user = splited[3] && splited[4] ?  splited[3] + splitChar + splited[4] : null;

  if (contextId) {
    normalized['id'] = contextId;
    normalized['name'] = splited[1];
    normalized['parent'] = null;
    normalized['url'] = replaceToUrl(contextName);
  }

  if (task) {
    normalized['id'] = contextId + splitChar + task;
    normalized['name'] = task;
    normalized['parent'] = contextId;
    normalized['url'] = replaceToUrl(task);
  }

  if (user) {
    normalized['id'] = contextId + splitChar + task + splitChar + user;
    normalized['name'] = user;
    normalized['parent'] = contextId + splitChar + task;
    normalized['url'] = user;
  }

  return normalized;
}

export function splitConvetionName(name: string): any {

  let splitChar = config.splitChar;
  let splited = name.split(splitChar);
  let result = {};

  if (splited[1]) {
    result['context'] = splited[1];
    result['active'] = splited[1];
  }

  if (splited[2]) {
    result['task'] = splited[2];
    result['active'] = splited[2];
  }

  if (splited[3] && splited[4]) {
    result['user'] = splited[3] + splitChar + splited[4];
    result['active'] = splited[3];
  }

  return result;
}

export function normalizeFromURL(path: string, username: string): string {

  let splitChar = config.splitChar;

  // Clear path from attributes
  if (path.indexOf('?') !== -1) {
    path = path.substring(0, path.lastIndexOf('?'));
  }

  let pathSplited = path.split('/');
  pathSplited[0] = config.appPrefix;

  if (path.includes('@') && username) {
    pathSplited.push(username);
  }

  let joined = pathSplited.join(splitChar);

  console.log('AQUI:', path, username, pathSplited, joined);
  return joined;
}


export function filterContextsByName(name: string, context: ContextualComm): boolean {

  let splitChat = config.splitChar;

  if (name.indexOf(splitChat) !== -1 && name.includes('@')) {
    let users = name.split(splitChat);
    let user1 = users[0];
    let user2 = users[1];

    let variation1 = user1 + splitChat + user2;
    let variation2 = user2 + splitChat + user1;

    if (context.name === variation1) {
      name = variation1;
    } else if (context.name === variation2) {
      name = variation2;
    }
  }

  console.log('[ContextualCommData Service] - getting Context By Name: ', context.name, name, context.name === name);
  return context.name === name;
}
