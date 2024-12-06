import { useQuery } from '@tanstack/react-query';
import { storeQueries } from '~/queries/storeQueries';
import { commonActions, useCommonStore } from '~/store/common';
import useNaverMap from '../hooks/useNaverMap';
import styled from 'styled-components';
import ButtonGroup from './ButtonGroup';
import { useEffect } from 'react';

interface Props {
  itemTagId?: string;
}
const StoreMap = ({ itemTagId }: Props) => {
  const {
    map,
    markers,
    activeMarker,
    mapInitialize,
    renderMarkers,
    renderGuide,
    handleZoomIn,
    handleZoomOut,
    handleCenterMove,
    handleCenterChange,
    destroyMapInstance,
    handleActiveMarkerByStoreId,
  } = useNaverMap({
    mapElementId: 'map',
  });

  const addressInfo = useCommonStore((state) => state.addressInfo);
  const sort = useCommonStore((state) => state.sort);
  const guideIsShow = useCommonStore((state) => state.showGuide.circle);

  const { data: storeListData } = useQuery({
    ...storeQueries.list({ sort, lat: addressInfo.lat, lng: addressInfo.lng, itemTagId }),
  });

  const handleLocation = () => {
    const handleLocationSuccess = (position: GeolocationPosition) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      const centerLocation = new naver.maps.LatLng(lat, lng);
      naver.maps.Service.reverseGeocode(
        {
          coords: centerLocation,
        },
        function (status, response) {
          if (status !== naver.maps.Service.Status.OK) {
            return alert('주소를 변환하는데 실패하였습니다.');
          }

          const result = response.v2;
          const address = result.address.jibunAddress;

          commonActions.setAddress(address);
        },
      );
    };

    const handleLocationError = (error: GeolocationPositionError) => {
      commonActions.resetAddress();
      handleCenterMove();
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleLocationSuccess, handleLocationError);
    }
  };

  useEffect(() => {
    if (addressInfo) {
      mapInitialize({ center: { lng: addressInfo.lng, lat: addressInfo.lat } });
      handleLocation();
    }

    return () => {
      destroyMapInstance();
    };
  }, []);

  useEffect(() => {
    if (guideIsShow) {
      renderGuide();
    }
  }, [map, guideIsShow]);


  useEffect(() => {
    if (map && storeListData) {
      renderMarkers(storeListData.stores);
    }
  }, [storeListData]);

  useEffect(() => {
    if (addressInfo) {
      handleCenterChange({ lat: addressInfo.lat, lng: addressInfo.lng });
    }
  }, [addressInfo]);

  return (
    <MapWrapper>
      <div id="map" style={{ width: '100%', height: '100%' }}></div>
      <ButtonGroup onCurrentLocationSet={handleLocation} onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
    </MapWrapper>
  );
};

const MapWrapper = styled.div`
  flex: 1;
  position: relative;
`;

export default StoreMap;
