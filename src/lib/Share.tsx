import {Platform} from 'react-native';
import Share, {ShareOptions} from 'react-native-share';

const openShare = (url: string, title: string, message: string) => {
  const options = Platform.select<ShareOptions>({
    ios: {
      activityItemSources: [
        {
          placeholderItem: {type: 'url', content: url},
          item: {
            default: {type: 'url', content: url},
            copyToPasteBoard: {type: 'url', content: url},
            postToFacebook: {type: 'text', content: `${message} ${url}`},
            mail: {type: 'text', content: `${message} ${url}`},
            assignToContact: {type: 'text', content: `${message} ${url}`},
            airDrop: {type: 'text', content: `${message} ${url}`},
            message: {type: 'text', content: `${message} ${url}`},
          },
          linkMetadata: {originalUrl: url, url, title},
        },
      ],
    },
    default: {
      title,
      subject: title,
      message: `${message} ${url}`,
    },
  });
  return Share.open(options);
};
export default openShare;
