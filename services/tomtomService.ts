interface Coordinate {
  latitude: number;
  longitude: number;
}

interface RouteInfo {
  coordinates: Coordinate[];
  distance: number;
  duration: number;
}

export const getRoute = async (start: Coordinate, end: Coordinate): Promise<RouteInfo> => {
  return {
    coordinates: [
      { latitude: start.latitude, longitude: start.longitude },
      { latitude: end.latitude, longitude: end.longitude },
    ],
    distance: 10,
    duration: 15,
  };
};