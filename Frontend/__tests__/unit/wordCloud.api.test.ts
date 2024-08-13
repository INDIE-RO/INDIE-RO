import { indieroClient } from '../../src/apis/ClientApi';
import { getWordCloud } from '../../src/components/@common/WordCloud/WordCloud.api';

jest.mock('@/apis/ClientApi');

describe('getWordCloud', () => {
  it('should return words when API call is successful', async () => {
    const mockWords = [
      { id: 1, text: 'hello' },
      { id: 2, text: 'world' },
    ];
    (indieroClient.get as jest.Mock).mockResolvedValue({ words: mockWords });

    const result = await getWordCloud();
    expect(result).toEqual(mockWords);
  });

  it('should throw an error when API call fails', async () => {
    (indieroClient.get as jest.Mock).mockRejectedValue(new Error('API Error'));

    await expect(getWordCloud()).rejects.toThrow('API Error');
  });

  it('should throw an error when no words are returned', async () => {
    (indieroClient.get as jest.Mock).mockResolvedValue({ words: null });

    await expect(getWordCloud()).rejects.toThrow('워드 클라우드를 불러오는 데 실패했습니다.');
  });
});
