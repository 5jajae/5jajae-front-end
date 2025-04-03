import styled from 'styled-components';

import GNB from '../main/header/GNB';
import Text from '../common/Text';
import TextButton from '../common/buttons/TextButton';
import Filter from '../main/header/Filter';
import BookmarkList from './BookmarkList';

export default function BookmarkScreen() {
  return (
    <Wrapper>
      <GNB />
      <ContentWrapper>
        <TitleWrapper>
          <Title variant="heading_1" weight="bold" color="cool_gray_900">
            즐겨찾기 <strong>112</strong>
          </Title>
          <TextButton>전체 삭제</TextButton>
        </TitleWrapper>

        <Filter />
        <BookmarkList />
      </ContentWrapper>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1060px;
  flex: 1;

  margin-top: 64px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: fit-content;
  width: 100%;
`;

const Title = styled(Text)`
  display: flex;
  gap: 4px;

  margin-bottom: 20px;

  strong {
    color: ${({ theme }) => theme.colors.violet_600};
  }
`;
