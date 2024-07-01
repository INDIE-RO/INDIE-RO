import { Fragment } from 'react';

import styled from '@emotion/styled';

import { Tag } from '@/components/@common';
import { TAG_BY_ID } from '@/constants/common';
import theme from '@/styles/theme';
import { Policy } from '@/types/common';

interface PolicyDetailOverviewProps {
  policyInfo: Policy;
}

function PolicyDetailOverview({ policyInfo }: PolicyDetailOverviewProps) {
  const { title, period, tags } = policyInfo;

  return (
    <div>
      <TagContainer>
        {tags.map(tag =>
          tag.type === '디데이' && Number(tag.name.slice(2)) < 0 ? (
            <Fragment key={tag.id} />
          ) : (
            <Tag
              key={tag.id}
              size='sm'
              color={tag.id !== 4 ? 'default' : 'white'}
              backgroundColor={theme.tagColors[TAG_BY_ID[tag.id]]}
            >
              {tag.name}
            </Tag>
          ),
        )}
      </TagContainer>
      <div style={{ height: '10px' }} />
      <Title>{title}</Title>
      <div style={{ height: '20px' }} />
      <Period>{period}</Period>
    </div>
  );
}

export default PolicyDetailOverview;

const TagContainer = styled.ul`
  display: flex;
  gap: 0.4rem;

  width: 100%;
  margin-bottom: 0.8rem;
`;

const Title = styled.h1`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.semiBold};
`;

const Period = styled.p`
  width: 100%;

  text-align: right;
  line-height: 1.8rem;
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeights.medium};
`;
