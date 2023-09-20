import {Image} from 'react-native';

export function getImageUrlWithFallback(
  originalUrl: string,
  fallbackUrl: string,
): Promise<string> {
  return new Promise(resolve => {
    Image.prefetch(originalUrl)
      .then(() => resolve(originalUrl))
      .catch(() => resolve(fallbackUrl));
  });
}
