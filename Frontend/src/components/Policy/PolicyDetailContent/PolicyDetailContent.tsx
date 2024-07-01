import { Fragment } from 'react';

import styled from '@emotion/styled';

import { Chip } from '@/components/@common';
import { Description, OtherInfo, Qualification } from '@/pages/PolicyDetailPage/PolicyDetail.type';
import theme from '@/styles/theme';

interface PolicyDetailContentProps {
  titles: string[];
  contents: (Description | Qualification | OtherInfo)[];
}

function PolicyDetailContent({ titles, contents }: PolicyDetailContentProps) {
  return (
    <>
      {Object.values(contents[0]).map((value, idx) => (
        <Fragment key={`content-${idx}`}>
          <Chip
            variant='rounded'
            size='sm'
            backgroundColor={theme.colors.gray6}
            color={theme.colors.primary}
          >
            {titles[idx]}
          </Chip>
          <div style={{ height: '10px' }} />
          <PreformattedText>{value}</PreformattedText>
          <div style={{ height: '40px' }} />
        </Fragment>
      ))}
    </>
  );
}

export default PolicyDetailContent;

const PreformattedText = styled.pre`
  white-space: pre-wrap;
`;
