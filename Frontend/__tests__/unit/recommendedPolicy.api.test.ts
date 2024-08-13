import { indieroClient } from '../../src/apis/ClientApi';
import {
  GetRecommendedPolicyResponse,
  getRecommendedPolicy,
} from './../../src/components/Policy/RecommendedPolicy/RecommendedPolicy.api';
import { API_PATH } from './../../src/constants/path';

jest.mock('@/apis/ClientApi');

describe('getRecommendedPolicy', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return recommended policies when API call is successful', async () => {
    const mockResponse: GetRecommendedPolicyResponse = {
      recommendedPolicies: [
        { id: 1, title: '2024년 자립준비청년(청년 유형) 전세임대' },
        { id: 2, title: '자립준비청년 의료비 지원 사업' },
      ],
    };
    (indieroClient.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getRecommendedPolicy({ id: 123 });

    expect(result).toEqual(mockResponse);

    expect(indieroClient.get).toHaveBeenCalledWith(API_PATH.RECOMMEND_POLICY, {
      params: { id: 123 },
    });
  });

  it('should throw an error when API call fails', async () => {
    (indieroClient.get as jest.Mock).mockRejectedValue(new Error('API Error'));

    await expect(getRecommendedPolicy({ id: 123 })).rejects.toThrow('API Error');
  });

  it('should throw an error when no data is returned', async () => {
    (indieroClient.get as jest.Mock).mockResolvedValue(null);

    await expect(getRecommendedPolicy({ id: 123 })).rejects.toThrow(
      '추천 정책을 불러오는 데 실패했습니다.',
    );
  });
});
