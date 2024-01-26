import { GoogleMap, LoadScript, Marker, InfoWindow ,useJsApiLoader } from '@react-google-maps/api';

export default function M_ChildMap({
    mapCenter,
    zoomLevel,
    handleLoad,
    handleZoomChanged,
  }){
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDxK-BSMfOM2fRtkTUMpRn5arTyUTR03r0",
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }



  return (
          <>
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '625px'  }}
                center={mapCenter}
                zoom={zoomLevel}
                // onLoad={handleLoad}
                onZoomChanged={handleZoomChanged}
                options={{
                  gestureHandling: "greedy",
                }}
                >
              </GoogleMap>

            
          </>
  )
}





















