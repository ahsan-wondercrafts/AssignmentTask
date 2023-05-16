import React from 'react';
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Animated, View, TouchableOpacity, Text } from 'react-native';
import Check_Ins from '../../Screens/Check_Ins';
import Submit from '../../Screens/Submit';
import { ApolloProvider } from '@apollo/client';
import client from '../../API/GraphQL';

const Tab = createMaterialTopTabNavigator();

interface MyTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
  position: Animated.AnimatedInterpolation<number>;
}

const MyTabBar: React.FC<MyTabBarProps> = ({ state, descriptors, navigation, position }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_item: any, i: number) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i: number) => (i === index ? 1 : 0)),
        });

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              backgroundColor: isFocused ? 'white' : 'white',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '3%',
              borderBottomWidth: isFocused? 1: 0,
              borderBottomColor: isFocused? 'black': '#fff',
            }}
          >
            <Animated.Text style={{ fontSize: 16, color: isFocused ? '#000' : '#A7A7A7' }}>
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const TopTabs: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer theme={DefaultTheme}>
        <Tab.Navigator
          tabBar={(props: any) => <MyTabBar {...props} />}
        >
          <Tab.Screen name="Submit" component={Submit} />
          <Tab.Screen name="Check-ins" component={Check_Ins} />
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default TopTabs;
