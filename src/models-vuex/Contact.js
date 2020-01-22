import VFSModel from '@/lib/VFSModel';

export default class Contact extends VFSModel {
  static entity = 'Contact';

  static fields() {
    return {
      address: this.attr(null),
      contactMethodId: this.attr(null),
      cts: this.attr(null),
      id: this.attr(null),
      info: this.attr(null),
      ownerXid: this.attr(null),
      source: this.attr(null),
      ts: this.attr(null),
      contactMethod: this.belongsTo('ContactMethod', 'contactMethodId'),
    };
  }

  href() {

    const { address, contactMethod } = this;

    if (!address) {
      return null;
    }

    const { link } = contactMethod;

    return `${link}${address}`;

  }
}
