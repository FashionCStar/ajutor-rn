import React, { Component } from "react";
import { Body, Button, Header, Icon, Left, Right, Text } from "native-base";
import { Material } from "../../styles";
import { TouchableOpacity } from "react-native";

class AuthHeader extends Component {
  constructor(props) {
    super(props);
  }

  onBack = () => {
    this.props.navigation.goBack();
  }

  onLogout = () => { }

  render() {
    const { navigation } = this.props;
    if (navigation.isFirstRouteInParent())
      return (
        <Header transparent iosBarStyle={Material.iosStatusbar} style={{ backgroundColor: '#252f3f' }}>
        </Header>
      );

    return (
      <Header transparent iosBarStyle={Material.iosStatusbar} style={{ backgroundColor: '#252f3f' }}>
        <TouchableOpacity transparent onPress={this.onBack} style={{alignSelf: 'center'}}>
          <Icon name='chevron-back' style={{ color: '#fff' }} />
        </TouchableOpacity>
        <Body style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 30, color: '#fff' }}>{navigation.state.routeName}</Text>
        </Body>
        <TouchableOpacity transparent>
          <Icon name='chevron-back' style={{ color: 'transparent' }} />
        </TouchableOpacity>
      </Header>
    );
  }
}

export default AuthHeader;