import React from 'react';
import CommonHeader from '../../../../../components/layout/CommonHeader';
import {useTailwind} from 'tailwind-rn';
import Markdown from 'react-native-markdown-display';
import {View} from 'react-native';
import {markdownStyles} from '../../../../../constants';

// language=md
const doc = `+ ### *Cookie 是什麼？*

當您瀏覽或使用FUNWOO 網站(以下稱「本官網」)時，我們會在您的裝置中(電腦、手機、平板電腦或任何其他行動裝置)儲存少量資料，一般稱之為Cookie，目的是協助我們辨識出相同的使用者。**這些Cookie，
在您下次造訪我們官網之前，仍會保留在您的裝置上，直到它們過期或被刪除為止。**

我們使用各種 Cookie ，以維持我們官網的基本運作、評估和分析網站流量，並維持網站的穩定。有些 Cookie會收集您的選擇和偏好，以及您使用網站及服務內容的相關資訊；這些資訊，有助於我們改善網站的功能。舉例來說，透過
Cookie的設置，我們能得知官網最常被瀏覽的頁面、記錄您瀏覽網站時遇到的任何問題。

此外，我們也可能會使用Cookie，在第三方網站上向您行銷 FUNWOO 服務，或評估和追蹤我們行銷活動的成效，以便更有效地設計並投放廣告。

一般來說，透過Cookie 提供給第三方網站的資訊，並不會包含您的個人資訊，而且Cookie數據通常是加密的。

+ ### *如何管理 Cookie？*

您可以參閱各瀏覽器的說明文件，透過瀏覽器的設定，來管理、停用或移除Cookie。不過，這麼做以後，您可能會無法有效且順暢地使用我們的服務。
`;

const UserCookieTermsScreen = () => {
  const tailwind = useTailwind();

  return (
    <CommonHeader
      contentInsetAdjustmentBehavior={'automatic'}
      title={'Cookies使用者條款'}>
      <View style={tailwind('px-4 pt-4 pb-8')}>
        <Markdown style={markdownStyles}>{doc}</Markdown>
      </View>
    </CommonHeader>
  );
};

export default UserCookieTermsScreen;
