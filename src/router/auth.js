import React from 'react';
// import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Intro, SignIn, SignUp, Welcome } from '../screens/auth';
import AuthHeader from './components/AuthHeader';
import { Material } from '../styles';


const Auth = createStackNavigator({
  Welcome: {
    screen: Welcome
  },
  Intro: {
    screen: Intro
  },
  SignUp: {
    screen: SignUp
  },
  SignIn: {
    screen: SignIn
  }
}, {
  initialRouteName: 'SignIn',
  defaultNavigationOptions: {
    header: (props) => (<AuthHeader {...props} />),
    cardStyle: { backgroundColor: Material.containerBgColor }
  }
});

export default createAppContainer(Auth);