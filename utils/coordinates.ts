export const parseCoordinate = (coord: string): { latitude: number; longitude: number } => {
  const [latitude, longitude] = coord.split(',').map(Number);

  if (isNaN(latitude) || isNaN(longitude)) {
    throw new Error('Invalid coordinate format');
  }

  return { latitude, longitude };
};

export const validateCoordinate = (coord: string): boolean => {
  const regex = /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/;
  return regex.test(coord);
};
