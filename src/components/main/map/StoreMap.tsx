import { useQuery } from '@tanstack/react-query';
import { storeQueries } from '~/queries/storeQueries';
import { commonActions, useCommonStore } from '~/store/common';
import useNaverMap from '../hooks/useNaverMap';
import styled from 'styled-components';
import ButtonGroup from './ButtonGroup';
import { useEffect } from 'react';
import { makeMarkerClustering } from './marker-cluster';
import { getClusterIcon } from './generateHtml';

interface Props {
  itemTagIds?: string;
}

const StoreMap = ({ itemTagIds }: Props) => {
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
    ...storeQueries.list({ sort, lat: addressInfo.lat, lng: addressInfo.lng, itemTagIds }),
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
    if (map && markers) {
      const htmlMarker1 = {
        content: getClusterIcon('small'),
        size: new naver.maps.Size(48, 48),
        anchor: new naver.maps.Point(24, 24),
      };

      const htmlMarker2 = {
        content: getClusterIcon('large'),
        size: new naver.maps.Size(64, 64),
        anchor: new naver.maps.Point(32, 32),
      };
      const MarkerClustering = makeMarkerClustering(window.naver);

      const markerClustering = new MarkerClustering({
        minClusterSize: 2,
        maxZoom: 20,
        map: map,
        markers: markers.map((marker) => marker.marker),
        disableClickZoom: false,
        gridSize: 100,
        icons: [htmlMarker1, htmlMarker1, htmlMarker2],
        indexGenerator: [10, 100],
        stylingFunction: (clusterMarker: any, count: number) => {
          if (clusterMarker) {
            const firstChild = clusterMarker.getElement().querySelector('div:first-child');
            if (firstChild) {
              firstChild.innerHTML = count;
            }
          }
        },
      });
    }
  }, [map, markers]);

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
