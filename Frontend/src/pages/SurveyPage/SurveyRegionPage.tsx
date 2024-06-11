import styled from '@emotion/styled';

import { ChipInput, ProgressBar } from '@/components/@common';
import theme from '@/styles/theme';

import { useSurveyRegionMetaQuery } from './Survey.query';

const itemsPerRow = 3;
const gap = 0.8;
const width = `calc((100% - ${gap * (itemsPerRow - 1)}rem) / ${itemsPerRow})`;

function SurveyRegionPage() {
  const { regionMeta } = useSurveyRegionMetaQuery();

  return (
    <div>
      <div style={{ height: '20px' }} />
      <ProgressBar step={2} />
      <div style={{ height: '20px' }} />
      <Title>
        어떤 지역의 정책/지원사업
        <br />
        정보가 필요하신가요?
      </Title>
      <div style={{ height: '14px' }} />
      <p>주변 지역 정보를 제공해드려요</p>
      <div style={{ height: '24px' }} />
      <ChipInputWrapper>
        <ChipInput width={width} border-radius='8px'>
          전체
        </ChipInput>
        {regionMeta.map(region => (
          <ChipInput key={region.id} width={width} border-radius='8px'>
            {region.name}
          </ChipInput>
        ))}
      </ChipInputWrapper>
    </div>
  );
}

export default SurveyRegionPage;

const Title = styled.h1`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.semiBold};
`;

const ChipInputWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;
