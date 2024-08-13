import { indieroClient } from '../../src/apis/ClientApi';
import { API_PATH } from '../../src/constants/path';
import {
  GetPoliciesRequest,
  GetPoliciesResponse,
  getPolicies,
} from './../../src/components/Policy/PolicyList/PolicyList.api';
import { ERROR_MESSAGE } from './../../src/constants/error';

jest.mock('@/apis/ClientApi');

describe('getPolicies', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return policies when API call is successful', async () => {
    const mockResponse: GetPoliciesResponse = {
      hasNext: false,
      totalCount: 1843,
      policies: [
        {
          id: 1552,
          title: '창원시 2024년 상반기 청년 면접수당 지원사업',
          period: '2024-02-07 ~ 2024-06-30',
          tags: [
            { id: 1, type: '분야', name: '일자리' },
            { id: 2, type: '지역', name: '경남' },
            { id: 3, type: '모집현황', name: '모집중' },
            { id: 4, type: '디데이', name: 'D-1' },
          ],
        },
        {
          id: 903,
          title: '학생(인턴) 일자리 사업',
          period: '2024-05-01 ~ 2024-06-30',
          tags: [
            { id: 1, type: '분야', name: '일자리' },
            { id: 2, type: '지역', name: '충남' },
            { id: 3, type: '모집현황', name: '모집중' },
            { id: 4, type: '디데이', name: 'D-1' },
          ],
        },
        {
          id: 260,
          title: '(부평구) 청년 자격증 응시료 지원',
          period: '2024-02-01 ~ 2024-11-30',
          tags: [
            { id: 1, type: '분야', name: '일자리' },
            { id: 2, type: '지역', name: '인천' },
            { id: 3, type: '모집현황', name: '모집중' },
            { id: 4, type: '디데이', name: 'D-154' },
          ],
        },
      ],
    };

    (indieroClient.get as jest.Mock).mockResolvedValue(mockResponse);

    const request: GetPoliciesRequest = { categoryId: '1', size: '10' };
    const result = await getPolicies(request);

    expect(result).toEqual(mockResponse);
    expect(indieroClient.get).toHaveBeenCalledWith(API_PATH.POLICY_LIST, {
      params: request,
    });
  });

  it('should throw an error when API call fails', async () => {
    (indieroClient.get as jest.Mock).mockRejectedValue(new Error('API Error'));

    const request: GetPoliciesRequest = { categoryId: '1', size: '10' };

    await expect(getPolicies(request)).rejects.toThrow('API Error');
  });

  it('should throw an error when no data is returned', async () => {
    (indieroClient.get as jest.Mock).mockResolvedValue(null);

    const request: GetPoliciesRequest = { categoryId: '1', size: '10' };

    await expect(getPolicies(request)).rejects.toThrow('정책목록을 불러오는 데 실패했습니다.');
  });
});
