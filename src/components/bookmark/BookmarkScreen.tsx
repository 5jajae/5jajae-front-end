import styled from 'styled-components';
import Header from '../main/header/Header';

export default function BookmarkScreen() {
  return (
    <Wrapper>
      <Header />
      <ContentWrapper>BookmarkScreen</ContentWrapper>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 144px 1fr;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: calc(100vh - 144px);

  position: relative;
`;
