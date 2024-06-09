import { PropsWithChildren } from 'react';

import styled from '@emotion/styled';

import { ChipButton, Dialog } from '@/components/@common';
import { useConfirm } from '@/hooks/@common';
import theme from '@/styles/theme';

interface DialogConfirmProps {
  onClick?: VoidFunction;
}

function DialogConfirm(dialogConfirmProps: PropsWithChildren<DialogConfirmProps>) {
  const { children, onClick } = dialogConfirmProps;
  const { confirmItem } = useConfirm();

  return (
    <Dialog location={'center'}>
      <Dialog.Trigger asChild onClick={onClick}>
        {children}
      </Dialog.Trigger>
      <Dialog.Content>
        <ContentContainer>
          <ContentWrapper>{confirmItem.message}</ContentWrapper>
          <ButtonContainer>
            <Dialog.Close aria-label='취소' asChild onClick={confirmItem.buttons.cancel.click}>
              <ChipButton type='button' variant='outline' size='lg' width='100%'>
                {confirmItem.buttons.cancel.text}
              </ChipButton>
            </Dialog.Close>
            <Dialog.Close aria-label='확인' asChild onClick={confirmItem.buttons.ok.click}>
              <ChipButton type='button' size='lg' width='100%'>
                {confirmItem.buttons.ok.text}
              </ChipButton>
            </Dialog.Close>
          </ButtonContainer>
        </ContentContainer>
      </Dialog.Content>
    </Dialog>
  );
}

export default DialogConfirm;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 90vw;
  padding: 2.4rem;

  background-color: ${theme.backgroundColors.normal};
  border-radius: 20px;

  @media screen and (min-width: 768px) {
    width: calc(430px * 0.9);
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  height: 100%;
  padding: 4.6rem 0;

  text-align: center;
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeights.semiBold};
  color: ${theme.textColors.white};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.8rem;

  width: 100%;
`;
