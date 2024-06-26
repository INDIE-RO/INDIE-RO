import styled from '@emotion/styled';

import CloverMagic from '@/assets/cloverMagic.svg?url';
import NoResult from '@/assets/noResult.svg?url';
import { ChipButton, Dropdown } from '@/components/@common';
import { PolicyList } from '@/components/Policy';
import { usePolicySort } from '@/components/Policy/PolicyList/PolicyList.hook';
import { useSortMetaQuery } from '@/components/Policy/PolicyList/PolicyList.query';
import { useValidQueryParams } from '@/hooks/@common';
import theme from '@/styles/theme';

import { CUSTOM_KEYWORD_FOR_ALL, CustomKeywordForAll } from './CustomInfo.api';
import { useCustomInfo } from './CustomInfo.hook';
import { useCustomPoliciesQuery } from './CustomInfo.query';

function CustomInfo() {
  const { surveyResult, goSurveyPage } = useCustomInfo();
  const { sortMeta } = useSortMetaQuery();
  const { changeSortBy } = usePolicySort();

  const queryParams = useValidQueryParams<CustomKeywordForAll>(CUSTOM_KEYWORD_FOR_ALL);
  const { policies = [] } = useCustomPoliciesQuery(queryParams);

  return (
    <>
      {surveyResult ? (
        <>
          <FlexBox>
            <CloverImg src={CloverMagic} alt='' />
            <CustomInfoDisplay>
              {`${surveyResult?.age} •
          ${surveyResult?.category.join(', ')} •
          ${surveyResult?.region.length >= 1 ? '지역전체' : surveyResult?.region}`}
            </CustomInfoDisplay>
            <Dropdown metaData={sortMeta} onClickOption={changeSortBy} />
          </FlexBox>
          <PolicyList policies={policies} />
        </>
      ) : (
        <NoResultContainer>
          <TextLarge>관심 정보를 설정하지 않았어요</TextLarge>
          <TextSmall>설문조사하고 맞춤 정보를 받아보세요!</TextSmall>
          <NoResultImg src={NoResult} width={30} height={30} alt='' />
          <ButtonWrapper>
            <ChipButton width='100%' onClick={goSurveyPage}>
              설문조사 하러가기
            </ChipButton>
          </ButtonWrapper>
        </NoResultContainer>
      )}
    </>
  );
}

export default CustomInfo;

const CustomInfoDisplay = styled.div`
  width: fit-content;
  padding: 0.8rem 1.6rem;

  background-color: ${theme.colors.primary};
  border-radius: 20px;

  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.textColors.default};
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;

  overflow: hidden;
`;

const FlexBox = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 1.2rem;
`;

const CloverImg = styled.img`
  position: absolute;
  top: -4rem;
  right: 0;

  width: 5rem;
  height: 5rem;

  transform: rotate(-15deg) scaleX(-1);
`;

const NoResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: calc(100vh - 25rem);
`;

const TextLarge = styled.h1`
  margin-bottom: 1.2rem;

  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.textColors.white};
  text-align: center;
  white-space: nowrap;
`;

const TextSmall = styled.p`
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.textColors.white};
  text-align: center;
`;

const NoResultImg = styled.img`
  width: 30rem;
  height: 30rem;
`;

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 90px;
  width: 100%;
  padding: 0 20px;

  @media screen and (min-width: 768px) {
    max-width: 430px;
  }
`;
