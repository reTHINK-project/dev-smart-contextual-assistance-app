export function strMapToObj(strMap:Map<string, any>) {
    let obj = Object.create(null);
    strMap.forEach((v:any, k:string) => {
        obj[k] = v;
    })
    return obj;
}

export function objToStrMap(obj:any) {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
        strMap.set(k, obj[k]);
    }

    return strMap;
}

export function getUserMedia(constraints:any) {

  return new Promise((resolve, reject) => {

    navigator.mediaDevices.getUserMedia(constraints)
      .then((mediaStream:MediaStream) => {
        resolve(mediaStream);
      })/*.catch((reason:any) => {
        reject(reason);
      });*/
  });
}

export function normalizeName(name: string): any {

  let prefix = 'sca';
  let normalized = {};
  let splited = [];

  if (name.indexOf('-') !== -1) {
    splited = name.split('-');
  } else if (name.indexOf('/') !== -1) {
    splited = name.split('/');
    splited[0] = prefix;
  } else {
    splited.push(prefix);
    splited.push(name);
  }

  console.log('Splited: ', name, splited);

  let context = splited[0] + '-' + splited[1];
  let task = splited[2] ? splited[2] : null;
  let user = splited[3] && splited[4] ?  splited[3] + '-' + splited[4] : null;

  if (context) {
    normalized['id'] = context;
    normalized['name'] = splited[1];
    normalized['parent'] = null;
  }

  if (task) {
    normalized['id'] = context + '-' + task;
    normalized['name'] = task;
    normalized['parent'] = context;
  }

  if (user) {
    normalized['id'] = context + '-' + task + '-' + user;
    normalized['name'] = user;
    normalized['parent'] = context + '-' + task;
  }

  return normalized;
}