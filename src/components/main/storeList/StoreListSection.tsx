import styled from 'styled-components';
import StoreListItem from './StoreListItem';
import { useIsScrolled } from '~/hooks/useIsScrolled';
import { useRef } from 'react';
import StoreListHeader from './StoreListHeader';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useCommonStore } from '~/store/common';
import { storeQueries } from '~/queries/storeQueries';
import { useRouter } from 'next/router';

interface Props {
  onStoreMarkerActive?: (storeId: number) => void;
  activeStoreId?: number;
}
const StoreListSection = ({ activeStoreId, onStoreMarkerActive }: Props) => {
  const router = useRouter();
  const { itemTagIds } = router.query as { itemTagIds: string };

  const ref = useRef<HTMLDivElement>(null);
  const isScrolled = useIsScrolled(ref);

  const { lat, lng } = useCommonStore((state) => state.addressInfo);
  const sort = useCommonStore((state) => state.sort);

  const { data: storeListData } = useSuspenseQuery({
    ...storeQueries.list({ sort, lat, lng, itemTagIds }),
    select: (data) => data.stores,
  });

  return (
    <Wrapper>
      <StoreListHeader storesCount={storeListData.length} isScrolled={isScrolled} />
      <StoreListWrapper ref={ref}>
        {storeListData.map((store) => {
          const uniqueKey = `store-list-item-${store.id}`;
          return (
            <StoreListItem
              key={uniqueKey}
              store={store}
              onStoreMarkerActive={onStoreMarkerActive}
              activeStoreId={activeStoreId}
            />
          );
        })}
      </StoreListWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const StoreListWrapper = styled.div`
  padding-bottom: 120px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

export default StoreListSection;
