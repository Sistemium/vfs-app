import VFSModel from '@/lib/VFSModel';

export default class Employee extends VFSModel {
  static entity = 'Employee';

  static fields() {
    return {
      cts: this.attr(null),
      id: this.attr(null),
      info: this.attr(null),
      name: this.attr(null),
      personId: this.attr(null),
      siteId: this.attr(null),
      ts: this.attr(null),
    };
  }

}
