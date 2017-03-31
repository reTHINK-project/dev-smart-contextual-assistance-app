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