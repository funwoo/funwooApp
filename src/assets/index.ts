import {
  lottieProvider,
  sharedFontProvider,
  sharedImgProvider,
} from './sharedProvider';

const ImageProvider = {
  ...sharedImgProvider,
};
const FontProvider = {
  ...sharedFontProvider,
};
export {ImageProvider, FontProvider, lottieProvider};
