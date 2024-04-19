export const isNil = (foo) => foo == null;
export const isFunction = (foo) => typeof foo === 'function';
export const isNumber = (foo) => typeof foo === 'number';
export const typeOf = (foo) => (foo ? foo.constructor : null);
export const isPlainObject = (foo) => typeOf(foo) === Object;

export const between = (value, min, max) => min < value && value < max;

export const toggle = (array, element) => {
  const index = array.indexOf(element);
  index < 0 ? array.push(element) : array.splice(index, 1);
};

export const clsx = (...classes) => classes.filter(Boolean).join(' ');

export const getCurrentPosition = () =>
  new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      // timeout: 10000,
      // maximumAge: 0,
    })
  );

export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

export const degreesToRadians = (degrees) => (degrees * Math.PI) / 180;

export const distanceInKmBetweenEarthCoordinates = (lat1, lon1, lat2, lon2) => {
  const EARTH_RADIUS_KM = 6371;

  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);

  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_KM * c;
};

export const groupBy = (list, getkey) =>
  list.reduce((prev, curr) => {
    const key = getkey(curr);
    if (!prev[key]) prev[key] = [];
    return { ...prev, [key]: [...prev[key], curr] };
  }, {});

export const hexToRGB = (hex, alhpa = 1) => {
  hex = hex.replace('#', '');

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  const number = Number.parseInt(hex, 16);

  return 'rgb(:red,:green,:blue,:alpha)'
    .replace(':red', number >> 16)
    .replace(':green', (number >> 8) & 255)
    .replace(':blue', number & 255)
    .replace(':alpha', alhpa);
};

export const roundToStep = (value, step) => Math.floor(value / step) * step;
