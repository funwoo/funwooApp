import React from 'react';
import CommonHeader from '../../../../../components/layout/CommonHeader';
import {Pressable, ScrollView, View} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import openShare from '../../../../../lib/Share';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {useTailwind} from 'tailwind-rn';
import CacheImage from '../../../../../components/common/CacheImage';
import Text, {
  TextStringSizeEnum,
} from '../../../../../components/common/Text/BaseText';

const Profile: Record<
  string,
  {imageURL: string; position: string; name: string; email: string; bio: string}
> = {
  Nancy: {
    imageURL: 'https://cdn.funwoo.com.tw/assets/founders/nancy_square.jpg',
    position: '執行長 CEO',
    name: '曾意婷 Nancy',
    email: 'nancy@funwoo.com.tw',
    bio: `曾任職於遠傳電信商務，匯豐銀行網路行銷及花旗銀行行銷部經理，Nancy 隨後旅居中國與美國，累積房產顧問專業，多年來思考如何讓房產顧問專業運轉得更有效率。2021 年聯手矽谷頂尖科技人才，創立 FUNWOO，運用行銷管理長才結合智能科技，導入嶄新的交易模式，打造專門為房產交易設計的數位化平台，為台灣房產產業開創不一樣的格局。
\n  • 美國紐約佩斯大學 MBA 學位\n  • 美國華盛頓州不動產經理人執照\n  • 美國華盛頓州前 1% 房產代理商\n  • 台灣房地產營業員資格\n\n24 歲取得美國紐約佩斯大學 MBA 學位後，Nancy 回台灣擔任外商公司行銷經理。30 歲時，毅然放下當時人人稱羨的工作，勇闖北京，因著對房地產市場的強烈興趣及高敏感度，親身走訪北京各大新建樓盤，甚至直接住進自己看好的 10 個小區，以獨到眼光和精準分析，讓資產快速成長，化身專業房產投資人。\n
移居美國之後，為了更精進專業，Nancy 報考取得美國西雅圖的房產顧問執照，從未主動拜訪客戶，僅使用網路平台及工具，憑藉著專業的分析能力及創新行銷模式，第 1 年就成為美國華盛頓州卓越的房產顧問，獲得 Washington State Top 1% Agent 殊榮。
        \n當年勇闖北京的 Nancy 才 30 歲，因為勇敢追夢，打造黃金人脈，拿出百分之百的執行力，為人生寫出了成功方程式。
        \n現在，她帶著這份執行力與衝勁回到成長的故鄉 - 台灣，迎上世界 AI 科技浪潮，聯手矽谷頂尖科技人才，創立了 FUNWOO。以創新的思維、最新的智能科技、獨到的精準眼光和經驗，提供在地不一樣的科技房產交易模式，塑造一個專為房產顧問設計的平台，為台灣房產市場開創全新的格局，期待帶動產業成功轉型。
        \nFUNWOO 透過專業顧問與智能平台的協助，致力讓房產交易成為愉快、高效的過程，利用完全線上行銷的方式，為賣家規劃最有利的房產策略，也為買家具體呈現物件潛力。 Nancy 跟房產顧問採獨立企業夥伴的模式合作，提供強大平台及後援，並為客戶、為公司、為自己，共同創造下一個階段的成功。`,
  },
  Oliver: {
    imageURL:
      'https://cdn.funwoo.com.tw/assets/founders/Founder%20Headshot-Oliver-square.png',
    name: '蘇奧然 Oliver',
    position: '產品長 CPO',
    email: 'oliver@funwoo.com.tw',
    bio: `成功寫下國際新創故事，Oliver 想要將矽谷新創的成功模式帶回台灣，再次展現那股車庫創業，未改變某個產業的雄心壯志，以更成熟的心態及運用雲端大數據與人工智慧，簡化跟 e 化台灣房產交易過程，協助 FUNWOO 提升客戶及產品體驗。
        \n    •  美國西北大學資訊科學博士 (PhD in Computer Science)，論文與專利已被國際學者引用超過 500 次。\n    •  深耕美國矽谷，領導開發許多大型軟體專案如雲端架構管理系統、自動駕駛數據雲平台、企業級網路異常偵測大數據平台。\n    •  曾於人工智慧推薦引擎公司（Zofari）擔任 CTO，開發 Pandora for Places 人工智慧推薦引擎，此公司於 2014 年被雅虎收購。
        \n目前專注於結合雲端大數據與機器學習的研發與系統整合，雲端大數據與人工智慧專家 Oliver，2013 年找到兩位志同道合的朋友開發了 Zofari APP，經歷當時新創事業爭相萌芽的美好歲月，2014 年也成功被科技巨頭收購。
        \n看到台灣近來鼓勵新創，提倡與國際接軌，讓 Oliver 反思，是否能為台灣的科技新創環境做些什麼？經歷過台灣跟美國的教育體系，並在矽谷有成功的創業經驗，他認為，也許自己可以帶給台灣想創業的年輕人一些想法。
        \n身為幫忙把矽谷新創文化帶回台灣的科技人，Oliver 邀請到矽谷大神級的好友加盟，就是想把矽谷新創的成功模式帶回台灣，再次展現那種車庫創業，為了改變某個產業的雄心壯志，證明矽谷的新創模式能在台灣生根。
        \n觀察國外房產業跟台灣的差別，他發現台灣房地產交易資訊不夠透明，消費者常因資訊落差處於弱勢，FUNWOO 的大數據平台，將收集到的交易數據公開透明化，應用機器學習模型估算房產現值，以科學數據取代話術，買賣雙方都能基於合理價格快速成交。
        \nFUNWOO 創辦團隊都是各領域的佼佼者，在台灣、美國跟世界各地的歷練，讓這個團隊能更成熟的讓 FUNWOO 走在正確道路上，減少一般新創需要經歷的摸索期。FUNWOO 專注於打造網路品牌，運用最新網路跟 AI 科技提供客戶最好的服務，讓台灣的買賣房屋過程，從傳統的街頭店面型態，往 e 世代大步邁進，打造更友善、快速的流程，實現下一個世代專業的房產顧問公司。
        `,
  },
  ShihChi: {
    imageURL:
      'https://cdn.funwoo.com.tw/assets/founders/Founder%20Headshot-Huge-square.png',
    name: '黃士旗 ShihChi',
    position: '技術長 CTO',
    email: 'shihchi@funwoo.com.tw',
    bio: '工程師，曾任職台灣 Yahoo，2010 年前往美國，先後服務於 Spotify / Facebook / Netflix，有豐富的互聯網產業經驗。',
  },
  Julia: {
    imageURL:
      'https://cdn.funwoo.com.tw/assets/founders/Founder%20Headshot-Julia-square.png',
    name: '鄭明瑜 Julia',
    position: '策略長 CSO',
    email: 'julia@funwoo.com.tw',
    bio: `專長美感提升與藝術設計，擔任 FUNWOO 策略長與藝術總監，Julia 以最擅長的生活美學與藝術鑑賞力，為客戶創造最 WOW 的使用者體驗。\n
• 美國哥倫比亞大學碩士學位
• 美國芝加哥 Rush 醫科大學聽力學博士 (Doctoral of Audiology)
• 紐約藝術設計學院（New York Institute of Art and Design） Home Staging 證書`,
  },
};

const AboutFunderScreen = () => {
  const router = useRoute<RouteProp<MoreScreenParamsList, 'aboutFounder'>>();
  const key = router.params.key;
  const profile = Profile[key];

  const tailwind = useTailwind();

  if (!profile) {
    return null;
  }

  return (
    <CommonHeader
      title={profile.name}
      headerRight={
        <Pressable
          onPress={() =>
            openShare(`https://funwoo.com.tw/about/${key}`, '', key)
          }
          style={tailwind('items-center justify-center w-12 h-12')}>
          <EntypoIcon size={20} name={'share'} />
        </Pressable>
      }>
      <ScrollView style={tailwind('flex-1')}>
        <View style={tailwind('px-4 mb-4')}>
          <CacheImage
            source={{uri: profile.imageURL}}
            style={[tailwind('mb-4 w-full'), {aspectRatio: 1}]}
          />
          <Text
            fontSize={TextStringSizeEnum['4xl']}
            fontFamily={'NotoSansTC-Medium'}
            style={tailwind('mb-1.5')}>
            {profile.name}
          </Text>
          <Text fontSize={TextStringSizeEnum.base} style={tailwind('mb-1.5')}>
            {profile.position}
          </Text>
          <Text fontSize={TextStringSizeEnum.base} style={tailwind('py-1')}>
            {profile.email}
          </Text>
        </View>
        <Text
          fontSize={TextStringSizeEnum.base}
          style={tailwind('p-4 pb-8 text-gray700')}>
          {profile.bio}
        </Text>
      </ScrollView>
    </CommonHeader>
  );
};

export default AboutFunderScreen;
