import styled from 'styled-components';
import GNB from './GNB';
import Filter from './Filter';

const Header = () => {
  return (
    <Wrapper>
      <GNB />
      <FilterWrapper>
        <Filter />
      </FilterWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const FilterWrapper = styled.div`
  padding: 0 32px;
  border-bottom: solid 1px ${({ theme }) => theme.colors.cool_gray_200};
`;

export default Header;
