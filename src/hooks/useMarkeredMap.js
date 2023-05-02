import React from 'react';

const { kakao } = window;

const useMarkeredMap = () => {
  const mapRef = React.useRef(null);
  const mapContainerRef = React.useRef(null);
  const markersRef = React.useRef([]);

  React.useEffect(() => {
    mapRef.current = new kakao.maps.Map(mapContainerRef.current, {
      center: new kakao.maps.LatLng(37.497934, 127.027616), // 설정한 위도와 경도를 지도의 중심으로 설정
      level: 3, // 지도의 확대 레벨
    });
  }, []);

  const drawMarkers = (markerInfos = []) => {
    markersRef.current.forEach(({ marker, infowindow }) => {
      marker.setMap(null);
      infowindow.close();
    });

    // TODO: 검색 결과 없는 경우 처리
    if (markerInfos.length === 0) return;

    const bounds = new kakao.maps.LatLngBounds();

    markersRef.current = [];

    markerInfos.forEach(({ store, isRegistered }, idx) => {
      const infowindow = new kakao.maps.InfoWindow();
      const marker = new kakao.maps.Marker({
        map: mapRef.current,
        position: new kakao.maps.LatLng(store.y, store.x),
        image: new kakao.maps.MarkerImage(
          `/images/marker${isRegistered ? '' : '_nocolor'}.png`,
          new kakao.maps.Size(45, 45)
        ),
      });

      infowindow.setContent(
        `<div style="
          padding: 5px;
          font-size: 15px;
          color: #353535;"><span style="color: var(--primary-color);">${String.fromCharCode(idx + 65)}. </span>${
          store.place_name
        }</div>`
      );

      infowindow.open(mapRef.current, marker);

      markersRef.current = [...markersRef.current, { marker, infowindow }];

      bounds.extend(new kakao.maps.LatLng(store.y, store.x));
    });

    mapRef.current.setBounds(bounds, 32, 225, 32, 32);
  };

  return { mapContainerRef, drawMarkers };
};

export default useMarkeredMap;