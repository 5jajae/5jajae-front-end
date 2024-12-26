import styled from 'styled-components';
import StoreListSide from './storeList/StoreListSide';
import Header from './header/Header';
import StoreDetailSide from './storeDetail/StoreDetailSide';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import StoreMap from './map/StoreMap';

type QueryParamsType = {
  storeId?: string;
  itemTagIds?: string;
};
const MainScreen = () => {
  const router = useRouter();
  const { storeId, itemTagIds } = router.query as QueryParamsType;

  return (
    <Wrapper>
      <Header />
      <ContentWrapper>
        <AnimatePresence>
          {storeId && (
            <StoreDetailSlideContainer
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              transition={{
                duration: 0.5,
                ease: 'easeInOut',
                type: 'spring',
                bounce: 0,
                bounceDamping: 0,
                bounceStiffness: 100,
              }}
              exit={{ x: '-100%' }}
            >
              <StoreDetailSide />
            </StoreDetailSlideContainer>
          )}
        </AnimatePresence>
        <StoreListSlideContainer>
          <StoreListSide />
        </StoreListSlideContainer>

        <StoreMap itemTagIds={itemTagIds} />
      </ContentWrapper>
    </Wrapper>
  );
};

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

const MapWrapper = styled.div`
  flex: 1;
  position: relative;
`;

const StoreDetailSlideContainer = styled(motion.div)`
  width: 426px;
  height: 100%;
  position: absolute;
  left: 426px;
  top: 0;
  z-index: 2;
`;
const StoreListSlideContainer = styled.div`
  width: 426px;
  height: 100%;

  overflow-y: scroll;
  z-index: 2;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

export default MainScreen;
