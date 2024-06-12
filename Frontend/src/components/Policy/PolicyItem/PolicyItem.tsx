import styled from '@emotion/styled';

import { Tag } from '@/components/@common';
import { TAG_BY_ID } from '@/constants/common';
import theme from '@/styles/theme';
import { Policy } from '@/types/common';

interface PolicyItemProps {
  policyInfo: Policy;
}

function PolicyItem({ policyInfo }: PolicyItemProps) {
  const { title, period, tags } = policyInfo;

  return (
    <Wrapper>
      <TagContainer>
        {tags.map(tag => (
          <Tag
            color={tag.id !== 4 ? 'default' : 'white'}
            backgroundColor={theme.tagColors[TAG_BY_ID[tag.id]]}
          >
            {tag.name}
          </Tag>
        ))}
      </TagContainer>
      <Title>{title}</Title>
      <Period>{period}</Period>
    </Wrapper>
  );
}

export default PolicyItem;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 13rem;

  padding: 1.2rem 2rem;
  border-radius: 20px;
  background-color: ${theme.backgroundColors.normal};

  color: ${theme.textColors.white};
  cursor: pointer;
`;

const TagContainer = styled.ul`
  display: flex;
  gap: 0.4rem;

  width: 100%;
  margin-bottom: 0.8rem;
`;

const Title = styled.p`
  display: -webkit-box;

  width: 100%;
  margin-bottom: 0.8rem;

  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;

  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  line-height: 2.4rem;
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeights.semiBold};
`;

const Period = styled.p`
  width: 100%;

  text-align: right;
  line-height: 1.8rem;
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeights.medium};
`;
