import React from 'react';
import CommonHeader from '../../../../../components/layout/CommonHeader';
import {useTailwind} from 'tailwind-rn';
import Markdown from 'react-native-markdown-display';
import {View} from 'react-native';
import {markdownStyles} from '../../../../../constants';

// language=md
const doc = `歡迎您來到FUNWOO的公司官網，並使用我們官網所提供的各項資訊及服務。如果您繼續造訪和使用本官網及本公司的各項服務，表示您已閱讀並同意我們的隱私權政策。
透過以下的說明，我們希望讓您了解：我們是如何收集和使用您的個人資訊。
所謂的「個人資訊」，是指以任何形式所記錄、並且可得以直接或間接方式識別您個人身份的資訊，例如：您的姓名、出生年月日、國民身分證統一編號、護照號碼、家庭、教育、聯絡方式、財務情況等。
而根據法律的規定，我們在蒐集、處理或利用個人資料時，會尊重您的權益，並依誠實及信用的方法為之。另外，我們在處理跟利用您的個人資料時，也不會逾越特定目的之必要範圍。

**不過，在若干情況下，我們會向第三方披露您的個人資訊，例如：**

+ **根據法律的規定**
+ **為了遵從法院或主管機關的命令**
+ **得到您的授權**

**舉例來說，除了在官網上所收集的個人資訊外，我們還會透過在社群媒體上刊登講座訊息或房屋廣告，來收集個人資訊。對於您所提供的聯繫資料、如您授權我們分享，我們才會安排房產顧問、會計師或律師等專業單位與您聯絡。**

我們尊重您的隱私，並會依照台灣的[個人資料保護法](https://law.moj.gov.tw/LawClass/LawAll.aspx?PCode=I0050021)規定，盡力保護您提供給我們的個人資訊。

## **自動存儲和收集的資訊**

我們的官網會收集您跟其他使用者訪問[https://www.funwoo.com.tw/](https://www.funwoo.com.tw/)
的相關資訊。這些資訊，主要是用於瞭解我們官網的訪客數量，並瞭解官網的性能或是否存有任何操作上的問題。我們所授權的開發公司或工程師，也會使用這些資訊，來開發本官網，分析使用模式，讓我們的官網更為好用。

如果得到您同意，或基於法律的規定，我們才會跟別人共用訪問者數據，或讓他人用於廣告、行銷或作為任何其他商業用途。

當您造訪本官網時，官網會自動收集及儲存的存取資訊，例如：

+ 您是從哪個搜尋引擎或網址、連結到本官網
+ 您造訪的日期和時間
+ 您在本官網上訪問的頁面
+ 您的網際網路協定（IP）位址
+ 您在本官網所提供的搜索工具中，所輸入的關鍵字

## **透過cookie提供服務**

為了提供您更有效率的客製化服務，我們會使用cookie技術，來和您使用的瀏覽器進行溝通。它可能在您的電腦硬碟中隨機儲存字串，用以辨識或區別使用者。假如您選擇停用cookie，將可能會無法使用某些個人化服務。

## **您與我們分享的資訊**

當您聯繫我們時，請勿在電子郵件內容中附上敏感的個人資訊或其他敏感資訊。
如果您向我們發送個人資訊，我們只會使用這些資訊，來回應您所提的問題或需求。不過，如果您所提的問題或需求，是與我們的合作對象有關，那麼，我們會將您所提供的資訊，提供給相關合作對象使用。
另外，在下面的情況，我們會收集跟使用您的個人資訊：

+ 註冊和管理會員資格
+ 當您參加由我們所贊助或共同主辦的會議、研討會或活動時
+ 向會員發送相關的資訊

當然，如果您不希望收到我們發送的電子郵件資訊，您可以隨時取消訂閱；我們一收到您的通知，就會儘速將您從電子郵件地址清單中移除。

## **未成年人的隱私保護**

我們的官網主要是提供房地產買賣的資訊。我們並無意收集兒童或青少年的任何資訊。如果我們在無心的情況下，收集或取得了兒童或青少年的資訊，我們將儘速瞭解並依法移除。

## **本隱私權政策的增刪修改**

隨市場環境及法令之改變，我們可能會隨時修訂本隱私權政策的內容，並將修訂後的版本公布在官網上。修訂後的隱私權政策，在公布後立即生效。如果您在我們公布修訂內容過後，仍繼續使用本官網或本公司的各項服務，就表示您接受修訂後之隱私權政策。如果您不同意我們所公布的隱私權政策修訂內容，請立即停止使用本官網及本公司的相關服務。

## **隱私權政策適用範圍**

如同我們前面所說的，上面所提的隱私權政策，僅適用於我們在此網站上收集處理的資訊，而不適用於您通過我們官網、所連結造訪的其他網站。我們鼓勵您閱讀這些網站的隱私權政策，瞭解它們如何收集和使用有關您的資訊。
如何聯繫我們
如果您對我們的隱私政策有任何疑問或疑慮，歡迎致電FUNWOO公司（電話號碼為：(02)7751-7270）或以電子郵件聯繫我們ig@funwoo.com.tw。
`;

const PrivatePolicyScreen = () => {
  const tailwind = useTailwind();

  return (
    <CommonHeader
      contentInsetAdjustmentBehavior={'automatic'}
      title={'隱私權政策'}>
      <View style={tailwind('px-4 pt-4 pb-8')}>
        <Markdown style={markdownStyles}>{doc}</Markdown>
      </View>
    </CommonHeader>
  );
};

export default PrivatePolicyScreen;
