import { UrlSerializer, UrlTree, DefaultUrlSerializer } from '@angular/router';

export class CustomUrlSerializer implements UrlSerializer {

  parse(url: any): UrlTree {
    let dus = new DefaultUrlSerializer();
    return dus.parse(url);
  }

  serialize(tree: UrlTree): any {
    let dus = new DefaultUrlSerializer(),
        path = dus.serialize(tree);

    let at = new RegExp(/%40/g);

   // use your regex to replace as per your requirement.
    return path.replace(at, '@');
  }

}
