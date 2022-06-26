import React, { ReactNode } from 'react'
import { Platform, Pressable, Text, useWindowDimensions } from 'react-native';
const ListItem = ({ onPress, title, headerRight }: { onPress: () => void; title: string; headerRight?: ReactNode }) => {
    const { width } = useWindowDimensions();
    return (
        <Pressable
            onPress={onPress}
            style={{
                height: 48,
                width: width,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white',
                borderBottomWidth: Platform.OS === 'android' ? 0 : 0.4,
                borderBottomColor: '#e0e0e0',
                paddingLeft: 12,
                justifyContent: 'space-between',
                paddingRight: 24,
            }}
        >
            <Text
                style={{
                    fontFamily: 'NotoSansTC-Regular',
                    fontSize: 16,
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    lineHeight: 24,
                    letterSpacing: 0.5,
                    textAlign: 'left',
                    color: '#1c1e21',
                }}
            >
                {title}
            </Text>
            {headerRight}
        </Pressable>
    );
};
export { ListItem }