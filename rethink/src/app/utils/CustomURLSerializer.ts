import { UrlSerializer, UrlTree, DefaultUrlSerializer } from '@angular/router';

export class CustomUrlSerializer implements UrlSerializer {

  parse(url: any): UrlTree {
    let dus = new DefaultUrlSerializer();
    return dus.parse(url);
  }

  serialize(tree: UrlTree): any {
    let dus = new DefaultUrlSerializer(),
        path = dus.serialize(tree);
    let serializedPath = path;

    let at = new RegExp(/%40/g);
    let space = new RegExp(/%20/g);

    if (at) {
      serializedPath = path.replace(at, '@');
    }

    if (space) {
      serializedPath = path.replace(space, '-');
    }

    console.log('path:', path, serializedPath);

    // use your regex to replace as per your requirement.
    return serializedPath;
  }

}
