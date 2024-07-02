import ReactGA from 'react-ga4';

import styled from '@emotion/styled';

import Banner1 from '@/assets/banner-1.png';
import Banner2 from '@/assets/banner-2.png';
import { Carousel } from '@/components/@common';
import { PATH } from '@/constants/path';
import { useEasyNavigate } from '@/hooks/@common';
import theme from '@/styles/theme';
import { calculateLeftPosition } from '@/utils/style';

import { useRecommendedPolicyQuery } from './RecommendedPolicy.query';

function RecommendedPolicy() {
  const { recommendedPolicy } = useRecommendedPolicyQuery();
  const { navigate } = useEasyNavigate();

  const banners = [
    { src: Banner1, textLocation: '6rem', textColor: theme.colors.gray7 },
    { src: Banner2, textLocation: '12rem', textColor: theme.colors.white },
  ];

  const goRecommendedPolicy = (policyId: number) => {
    ReactGA.event({
      category: '버튼',
      action: '추천 정책 배너 클릭',
      label: 'recommended-policy-banner',
    });

    navigate(`${PATH.POLICY_LIST}/${policyId}`);
  };

  return (
    <div>
      <Carousel
        duration={5000}
        carouselList={recommendedPolicy.map((policy, index) => (
          <BannerContainer key={policy.id} onClick={() => goRecommendedPolicy(policy.id)}>
            <img src={banners[index % banners.length].src} alt='정책 배너' />
            <TitleWrapper
              textLocation={banners[index % banners.length].textLocation}
              textColor={banners[index % banners.length].textColor}
            >
              <SubTitle>이 정책은 어때요?</SubTitle>
              <Title>{policy.title}</Title>
            </TitleWrapper>
          </BannerContainer>
        ))}
      />
    </div>
  );
}

export default RecommendedPolicy;

const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  img {
    width: 100%;
    height: auto;
  }
`;

const TitleWrapper = styled.div<{ textLocation: string; textColor: string }>`
  position: absolute;
  left: ${({ textLocation }) => textLocation};
  color: ${({ textColor }) => textColor};

  @media (min-width: 431px) and (max-width: 767px) {
    left: ${({ textLocation }) => calculateLeftPosition(textLocation, '6')};
  }
`;

const SubTitle = styled.h3`
  font-size: ${theme.fontSizes.xxs};

  @media (min-width: 431px) and (max-width: 767px) {
    font-size: ${theme.fontSizes.md};
  }
`;

const Title = styled.h2`
  max-width: 26rem;
  font-size: ${theme.fontSizes.md};

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (min-width: 431px) and (max-width: 767px) {
    font-size: ${theme.fontSizes.xl};
    max-width: 50rem;
  }
`;
