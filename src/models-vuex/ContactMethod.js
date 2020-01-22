import VFSModel from '@/lib/VFSModel';

export default class ContactMethod extends VFSModel {
  static entity = 'ContactMethod';

  static fields() {
    return {
      code: this.attr(null),
      cts: this.attr(null),
      id: this.attr(null),
      link: this.attr(null),
      mask: this.attr(null),
      name: this.attr(null),
      ts: this.attr(null),
      validationPattern: this.attr(null),
    };
  }
}
