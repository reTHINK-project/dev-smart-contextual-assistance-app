import { UrlSerializer, UrlTree, DefaultUrlSerializer } from '@angular/router';

export class CustomUrlSerializer implements UrlSerializer {

  parse(url: any): UrlTree {
    let dus = new DefaultUrlSerializer();
    return dus.parse(url);
  }

  serialize(tree: UrlTree): any {
    let dus = new DefaultUrlSerializer(),
        path = dus.serialize(tree);

    const at = new RegExp(/%40/g);
    const space = new RegExp(/%20/g);

    path = path.replace(at, '@');
    path = path.replace(space, ' ');

   // use your regex to replace as per your requirement.
    return path;
  }

}
