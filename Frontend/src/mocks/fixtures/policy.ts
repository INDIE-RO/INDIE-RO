const policyInfo = (id: number) => ({
  id,
  title: '[행정안전부] 청년을 위한 취업 역량 개발지원',
  period: '2024-04-20 ~ 2024-05-20',
  tags: [
    {
      id: 1,
      type: '분야',
      name: '일자리',
    },
    {
      id: 2,
      type: '지역',
      name: '서울',
    },
    {
      id: 3,
      type: '모집현황',
      name: '모집중',
    },
    {
      id: 4,
      type: '디데이',
      name: 'D-23',
    },
  ],
});

const policyInfoByRegion = (id: number) => ({
  id,
  title: '[행정안전부] 청년을 위한 취업 역량 개발지원',
  period: '2024-04-20 ~ 2024-05-20',
  tags: [
    {
      id: 1,
      type: '분야',
      name: '일자리',
    },
    {
      id: 2,
      type: '지역',
      name: '세종',
    },
    {
      id: 3,
      type: '모집현황',
      name: '모집중',
    },
    {
      id: 4,
      type: '디데이',
      name: 'D-23',
    },
  ],
});

const policyInfoByCategory = (id: number) => ({
  id,
  title: '[행정안전부] 청년을 위한 취업 역량 개발지원',
  period: '2024-04-20 ~ 2024-05-20',
  tags: [
    {
      id: 1,
      type: '분야',
      name: '주거',
    },
    {
      id: 2,
      type: '지역',
      name: '서울',
    },
    {
      id: 3,
      type: '모집현황',
      name: '모집중',
    },
    {
      id: 4,
      type: '디데이',
      name: 'D-23',
    },
  ],
});

const getPolicyList = () => ({
  hasNext: false,
  totalCount: 30,
  policies: Array(30)
    .fill('')
    .map((_, i) => policyInfo(i)),
});

// 검색 결과가 없을 때
const getPolicyListEmpty = () => ({
  hasNext: false,
  totalCount: 0,
  policies: [],
});

const getPolicyListByRegion = () => ({
  hasNext: false,
  totalCount: 30,
  policies: Array(30)
    .fill('')
    .map((_, i) => policyInfoByRegion(i)),
});

const getPolicyListByCategory = () => ({
  hasNext: false,
  totalCount: 30,
  policies: Array(30)
    .fill('')
    .map((_, i) => policyInfoByCategory(i)),
});

const policyFixture = {
  getPolicyList,
  getPolicyListByRegion,
  getPolicyListByCategory,
  getPolicyListEmpty,
};
export default policyFixture;
