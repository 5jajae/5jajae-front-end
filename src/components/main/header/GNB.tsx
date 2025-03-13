import styled from 'styled-components';
import Logo from './Logo';
import { flexBetweenCenter } from '~/style/mixins';
import Text from '~/components/common/Text';
import TextButton from '~/components/common/buttons/TextButton';
import { BookmarkOutline } from '~/components/common/icons';
import { useRouter } from 'next/router';

const GNB = () => {
  const router = useRouter();

  const handleMapClick = () => {
    router.push('/');
  };

  const handleBookmarkClick = () => {
    router.push('/bookmark');
  };
  const email = 'ojajaeee@gmail.com';
  return (
    <Wrapper>
      <Logo />

      <ButtonWrapper>
        <TextButton onClick={handleMapClick}>지도</TextButton>
        <DividerBar />
        <TextButton onClick={handleBookmarkClick} icon={<BookmarkOutline size="18px" color="cool_gray_500" />}>
          즐겨찾기
        </TextButton>
        <DividerBar />
        <TextButton>
          <InquiryLink target="_blank" href={`mailto:${email}`}>
            <Text variant="label_2" weight="medium" color="cool_gray_500">
              문의하기
            </Text>
          </InquiryLink>
        </TextButton>
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${flexBetweenCenter}
  box-sizing:border-box;
  padding: 0 32px;
  width: 100%;
  height: 72px;

  border-bottom: solid 1px ${({ theme }) => theme.colors.cool_gray_200};
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const InquiryLink = styled.a`
  cursor: pointer;
  border: none;
  background-color: transparent;
  padding: 0;
  text-decoration-line: none;
`;

const DividerBar = styled.div`
  width: 1px;
  height: 12px;
  background-color: ${({ theme }) => theme.colors.cool_gray_200};
  margin: 0 8px;
`;
export default GNB;
