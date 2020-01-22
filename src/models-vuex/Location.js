import VFSModel from '@/lib/VFSModel';

export default class Location extends VFSModel {
  static entity = 'Location';

  static fields() {
    return {
      altitude: this.attr(null),
      cts: this.attr(null),
      horizontalAccuracy: this.attr(null),
      id: this.attr(null),
      latitude: this.attr(null),
      longitude: this.attr(null),
      ownerXid: this.attr(null),
      source: this.attr(null),
      timestamp: this.attr(null),
      ts: this.attr(null),
      verticalAccuracy: this.attr(null),
      servicePoints: this.hasMany('ServicePoint', 'servicePointId'),
    };
  }
}
