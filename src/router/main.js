import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Home, Profile } from '../screens/main';
import MainHeader from './components/MainHeader';
import { Material } from '../styles';
import TabBar from './components/TabBar';

const tabBarConfig = {
  tabBarPosition: 'bottom',
  lazy: true,
  swipeEnabled: true,
  tabBarComponent: props => <TabBar {...props}/>,
  initialRouteName: 'CheckIn',
  style: {
  }
};

const Main = createStackNavigator({
  Home: createMaterialTopTabNavigator(
    {
      Track: {
        screen: Home,
      },
      Emergency: {
        screen: Home
      },
      CheckIn: {
        screen: Home,
      },
      Notification: {
        screen: Home,
      },
      Profile: {
        screen: Profile
      }
    },
    tabBarConfig,
  ),
}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    header: (props) => (<MainHeader {...props} />),
    cardStyle: { backgroundColor: Material.containerBgColor }
  }
});

export default createAppContainer(Main);
