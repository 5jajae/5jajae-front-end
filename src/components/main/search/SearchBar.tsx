import { ChangeEventHandler, KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import IconButton from '~/components/common/buttons/IconButton';
import SolidButton from '~/components/common/buttons/SolidButton';
import { CircleClose, Search } from '~/components/common/icons';
import RecentSearchKeyword from './RecentSearchKeyword';
import { commonActions } from '~/store/common';
import GuideBubble from './GuideBubble';

const SearchBar = () => {
  const recentRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [keyword, setKeyword] = useState<string>('');
  const [showRecentKeyword, setShowRecentKeyword] = useState<boolean>(false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = () => {
    if (!keyword) {
      alert('검색어를 입력해주세요.');
      return;
    }
    commonActions.addRecentSearchKeyword(keyword);
    commonActions.setAddress(keyword);

    handleClear();
    setShowRecentKeyword(false);
    inputRef.current?.blur();
  };

  const handleRecentSearch = (keyword: string) => {
    commonActions.setAddress(keyword);
    handleClear();
    setShowRecentKeyword(false);
  };

  const handleClear = () => {
    setKeyword('');
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.nativeEvent.isComposing) {
      return;
    }
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        recentRef.current &&
        !recentRef.current.contains(event.target as Node) &&
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setShowRecentKeyword(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Wrapper>
      <CustomInputWrapper ref={searchBarRef}>
        <CustomInput>
          <Search size="20px" color="cool_gray_400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="도로명 또는 지번으로 검색"
            value={keyword}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              setShowRecentKeyword(true);
            }}
          />
          {keyword && <IconButton onClick={handleClear} icon={<CircleClose size="20px" color="cool_gray_400" />} />}
        </CustomInput>
        {showRecentKeyword && <RecentSearchKeyword onSearch={handleRecentSearch} ref={recentRef} />}
        <GuideBubble />
      </CustomInputWrapper>

      <SolidButton size="medium" color="white" backgroundColor="violet_600" onClick={handleSearch} disabled={!keyword}>
        주소 검색
      </SolidButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const CustomInputWrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1;
`;
const CustomInput = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  box-sizing: border-box;
  padding: 0 12px;
  height: 42px;

  border: solid 1px ${({ theme }) => theme.colors.cool_gray_200};
  border-radius: 8px;

  display: flex;
  gap: 4px;

  input[type='text'] {
    flex: 1;

    ${({ theme }) => theme.fontStyle.label_1};
    color: ${({ theme }) => theme.colors.cool_gray_950};
    outline: none;
    border: none;
    &::placeholder {
      color: ${({ theme }) => theme.colors.cool_gray_400};
    }
  }

  &:focus-within {
    border: solid 1px ${({ theme }) => theme.colors.violet_600};
  }
`;

export default SearchBar;
