export const OFFICE_LAT = parseFloat(process.env.NEXT_PUBLIC_OFFICE_LAT!);
export const OFFICE_LNG = parseFloat(process.env.NEXT_PUBLIC_OFFICE_LNG!);

export function getDistanceInMeters(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const toRad = (val: number) => (val * Math.PI) / 180;
  const R = 6371000;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function getUserDistanceFromStore(lat: number, lng: number): number {
  return getDistanceInMeters(lat, lng, OFFICE_LAT, OFFICE_LNG);
}
