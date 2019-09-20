import ServicePoint from '@/models/ServicePoint';
import ServiceItem from '@/models/ServiceItem';

export async function loadServicePoints(servingMasterId) {
  await ServiceItem.findAll({
    servingMasterId,
    limit: 100,
  }, { with: ['ServicePoint'] });
  return ServicePoint.getAll();
}

export function servicePointByIds(ids) {
  return ServicePoint.getMany(ids);
}
