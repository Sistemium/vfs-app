import VFSDataModel from '@/lib/VFSDataModel';

export default new VFSDataModel({
  collection: 'Location',
  schema: {
    altitude: Number,
    horizontalAccuracy: Number,
    latitude: Number,
    longitude: Number,
    ownerXid: String,
    source: String,
    timestamp: Date,
    verticalAccuracy: Number,
    // servicePoints: this.hasMany('ServicePoint', 'servicePointId'),
  },
});
