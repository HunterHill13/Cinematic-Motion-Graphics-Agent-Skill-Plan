import { loadFont } from '@remotion/fonts';
import { staticFile } from 'remotion';

export const loadYekanBakhFonts = () => {
  return Promise.all([
    loadFont({
      family: 'YekanBakh',
      url: staticFile('fonts/YekanBakh/YekanBakh-Thin.woff2'),
      weight: '100',
      display: 'swap',
    }),
    loadFont({
      family: 'YekanBakh',
      url: staticFile('fonts/YekanBakh/YekanBakh-Light.woff2'),
      weight: '300',
      display: 'swap',
    }),
    loadFont({
      family: 'YekanBakh',
      url: staticFile('fonts/YekanBakh/YekanBakh-Regular.woff2'),
      weight: '400',
      display: 'swap',
    }),
    loadFont({
      family: 'YekanBakh',
      url: staticFile('fonts/YekanBakh/YekanBakh-SemiBold.woff2'),
      weight: '600',
      display: 'swap',
    }),
    loadFont({
      family: 'YekanBakh',
      url: staticFile('fonts/YekanBakh/YekanBakh-Bold.woff2'),
      weight: '700',
      display: 'swap',
    }),
    loadFont({
      family: 'YekanBakh',
      url: staticFile('fonts/YekanBakh/YekanBakh-ExtraBold.woff2'),
      weight: '800',
      display: 'swap',
    }),
    loadFont({
      family: 'YekanBakh',
      url: staticFile('fonts/YekanBakh/YekanBakh-Black.woff2'),
      weight: '900',
      display: 'swap',
    }),
    loadFont({
      family: 'YekanBakh',
      url: staticFile('fonts/YekanBakh/YekanBakh-ExtraBlack.woff2'),
      weight: '950',
      display: 'swap',
    }),
  ]);
};
