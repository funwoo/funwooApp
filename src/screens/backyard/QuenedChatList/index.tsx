import {FlatList, Pressable, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import apis from '../../../network/apis';
import {
  InquiriesQueuedListProps,
  Inquiry,
} from '../../../network/entities/Inquiries-queued-list-enity';
import FastImage from 'react-native-fast-image';
const QuenedChatList = () => {
  const [quenedList, setQueneList] = useState<Inquiry[]>([]);
  const total = useRef(0);
  useEffect(() => {
    (async () => {
      try {
        const {data} = await apis.getInquiriesQueuedList();
        total.current = data.total;
        setQueneList(data?.inquiries);
      } catch (error) {}
    })();
  }, []);
  const onLoadMore = async () => {
    try {
      if (quenedList.length >= total.current) return;
      const {data} = await apis.getInquiriesQueuedList(quenedList.length);
      setQueneList(list => {
        let temp = list;
        return temp.concat(data?.inquiries);
      });
    } catch (error) {
      console.log(error);
      debugger;
    }
  };
  const takeChat = async (id: string) => {
    try {
      const {data} = await apis.takeChat(id);
      const filteredData = quenedList.filter(item => item._id !== id);
      setQueneList(filteredData);
    } catch (error) {}
  };
  return (
    <FlatList
      keyExtractor={item => item._id}
      onEndReached={onLoadMore}
      style={{backgroundColor: 'white'}}
      data={quenedList}
      renderItem={({item}) => {
        return (
          <View
            style={{
              width: '100%',
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderBottomColor: '#f8f8f8',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <FastImage
                style={{width: 30, height: 30, marginRight: 10}}
                source={{
                  uri:
                    item.source.alias === 'Facebook Messenger'
                      ? 'https://cdn.funwoo.com.tw/inventory/funwoo_assets/7a8333a5cf7d80deba12fc8e47b8656906d0f3d8.jpeg'
                      : 'https://cdn.funwoo.com.tw/inventory/funwoo_assets/2845b9ae3e30d84325734772837238b23738782b.jpeg',
                }}
              />
              <View>
                <Text style={{marginBottom: 10}}>{item.name}</Text>
                <Text numberOfLines={1}>{item?.lastMessage?.msg}</Text>
              </View>
            </View>
            <Pressable
              onPress={() => {
                takeChat(item._id);
              }}
              style={{
                backgroundColor: 'black',
                width: 60,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 4,
              }}>
              <Text style={{color: 'white'}}>接待</Text>
            </Pressable>
          </View>
        );
      }}
    />
  );
};
export default QuenedChatList;
