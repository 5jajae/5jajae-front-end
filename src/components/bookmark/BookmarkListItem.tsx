import styled from 'styled-components';
import Badge from '../common/Badge';
import Text from '../common/Text';
import { Pin } from '../common/icons';
import { meterToKilometer } from '~/lib';
import SolidButton from '../common/buttons/SolidButton';
import CustomImage from '../common/CustomImage';

export default function BookmarkListItem() {
  return (
    <Wrapper>
      <CustomImage src="https://placehold.co/180x180" width="180px" height="180px" style={{ borderRadius: '8px' }} />
      <ContentWrapper>
        <Badge>각재</Badge>
        <Text variant="body_1" weight="bold" color="cool_gray_900">
          우리우드
        </Text>

        <Address>
          <Pin color="cool_gray_300" />
          <Text variant="caption_2" weight="medium" color="cool_gray_500">
            서울특별시 관악구 법원단지길 48
          </Text>
        </Address>
      </ContentWrapper>
      <MemoContainer>
        <Text variant="label_2" weight="regular" color="cool_gray_500">
          여기는 메모에요~
        </Text>
      </MemoContainer>
      <EditButton>메모 편집</EditButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 180px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  margin-top: 16px;
`;

const Address = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const MemoContainer = styled.div`
  margin-top: 8px;

  padding: 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.cool_gray_100};
`;

const EditButton = styled.button`
  margin-top: 16px;

  border: solid 1px ${({ theme }) => theme.colors.cool_gray_200};
  border-radius: 8px;
  width: 100%;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fontStyle.label_2};
  ${({ theme }) => theme.fontWeight.medium};

  &:hover {
    cursor: pointer;
  }
  &:active {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
