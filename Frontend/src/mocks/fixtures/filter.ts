import ageMeta from '@/mocks/data/ages.json';
import openingStatusMeta from '@/mocks/data/openingStatus.json';
import regionsMeta from '@/mocks/data/regions.json';

const getFilterMeta = () => ({
  ageMeta: ageMeta.ages,
  regions: regionsMeta.regions,
  openingStatuses: openingStatusMeta.openingStatuses,
});

const filterFixture = { getFilterMeta };
export default filterFixture;
