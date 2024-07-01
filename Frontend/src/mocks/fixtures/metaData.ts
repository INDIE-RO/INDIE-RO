import ageMeta from '@/mocks/data/ages.json';
import openingStatusMeta from '@/mocks/data/openingStatus.json';
import regionsMeta from '@/mocks/data/regions.json';

const getFilterMeta = () => ({
  ages: ageMeta.ages,
  regions: regionsMeta.regions,
  openingStatuses: openingStatusMeta.openingStatuses,
});

const getSortMeta = () => ({
  sortFields: [
    {
      id: 1,
      name: '마감순',
    },
    {
      id: 2,
      name: '조회순',
    },
  ],
});

const metaDataFixture = { getFilterMeta, getSortMeta };
export default metaDataFixture;
