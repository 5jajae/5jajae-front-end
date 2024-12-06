import styled from 'styled-components';
import SearchSection from '../search/SearchSection';
import StoreListSection from './StoreListSection';
import { Suspense } from 'react';

const StoreListSide = () => {
  return (
    <Wrapper>
      <SearchSection />
      <Suspense fallback={<></>}>
        <StoreListSection />
      </Suspense>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  box-sizing: border-box;
  border-right: solid 1px ${({ theme }) => theme.colors.cool_gray_200};
  background-color: ${({ theme }) => theme.colors.white};

  display: flex;
  flex-direction: column;

  height: 100%;
`;

export default StoreListSide;
