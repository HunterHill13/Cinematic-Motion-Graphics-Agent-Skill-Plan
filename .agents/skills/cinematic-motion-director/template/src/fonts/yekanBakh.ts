import { loadFont } from '@remotion/fonts';
import { staticFile } from 'remotion';

export const YEKAN_BAKH_FONT = "'YekanBakh', 'Yekan Bakh', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

const FONT_WEIGHTS: Array<{ weight: '100' | '300' | '400' | '600' | '700' | '800' | '900' | '950'; file: string }> = [
  { weight: '100', file: 'YekanBakh-Thin.woff2' },
  { weight: '300', file: 'YekanBakh-Light.woff2' },
  { weight: '400', file: 'YekanBakh-Regular.woff2' },
  { weight: '600', file: 'YekanBakh-SemiBold.woff2' },
  { weight: '700', file: 'YekanBakh-Bold.woff2' },
  { weight: '800', file: 'YekanBakh-ExtraBold.woff2' },
  { weight: '900', file: 'YekanBakh-Black.woff2' },
  { weight: '950', file: 'YekanBakh-ExtraBlack.woff2' },
];

export const loadYekanBakhFonts = () => {
  const promises: Promise<unknown>[] = [];

  for (const item of FONT_WEIGHTS) {
    const url = staticFile(`fonts/YekanBakh/${item.file}`);
    // Register under 'YekanBakh' (no space)
    promises.push(
      loadFont({
        family: 'YekanBakh',
        url,
        weight: item.weight,
        display: 'swap',
      })
    );
    // Register under 'Yekan Bakh' (with space) to guarantee 100% CSS matching
    promises.push(
      loadFont({
        family: 'Yekan Bakh',
        url,
        weight: item.weight,
        display: 'swap',
      })
    );
  }

  return Promise.all(promises);
};

