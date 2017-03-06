import { casual, loadSeedId, writeSeed, genFixArray } from '../helpers';

export async function generate() {
  const clogIds = loadSeedId('clog');
  const categoryRecommends = ['N', 'M', 'D', 'G'].map(c => ({
    _id: casual.objectId,
    type: `CATEGORY_${c}`,
    clogIds: genFixArray(clogIds, 10),
  }));
  const shelfRecommends = {
    _id: casual.objectId,
    type: 'shelf',
    clogIds: genFixArray(clogIds, 1),
  };
  const heroBanners = {
    _id: casual.objectId,
    type: 'heroBanner',
    clogIds: genFixArray(clogIds, 10),
  };
  const result = [...categoryRecommends, ...shelfRecommends, ...heroBanners];
  writeSeed('recommend', result);
}
