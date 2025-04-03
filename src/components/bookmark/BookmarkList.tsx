import styled from 'styled-components';
import BookmarkListItem from './BookmarkListItem';

export default function BookmarkList() {
  return (
    <Wrapper>
      <BookmarkListItem />
      <BookmarkListItem />
      <BookmarkListItem />
      <BookmarkListItem />
      <BookmarkListItem />
      <BookmarkListItem />
      <BookmarkListItem />
      <BookmarkListItem />
      <BookmarkListItem />
      <BookmarkListItem />
      <BookmarkListItem />
      <BookmarkListItem />
      <BookmarkListItem />
      <BookmarkListItem />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  column-gap: 40px;
  row-gap: 20px;
  flex-wrap: wrap;

  margin-top: 32px;
  margin-bottom: 120px;
`;
