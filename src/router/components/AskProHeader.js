import React, { Component } from "react";
import { Body, Button, Header, Icon, Left, Right, Text } from "native-base";

import { Material } from "../../styles";
import { signOut } from '../../actions/auth';
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native";

class AskProHeader extends Component {
  constructor(props) {
    super(props);
  }

  onBack = () => {
    this.props.navigation.goBack();
  }

  onLogout = () => {
    Alert.alert(
      APP_NAME,
      'Do you wanna sign out?',
      [
        {
          text: 'Yes',
          onPress: () => this.props.signOut()
        },
        {
          text: 'No',
          onPress: () => { },
          style: 'cancel'
        },
      ],
      { cancelable: true }
    );
  }

  render() {
    const { navigation } = this.props;
    const { routeName } = navigation.state;
    if (navigation.isFirstRouteInParent()) {
      return (
        <Header transparent iosBarStyle={Material.iosStatusbar} style={{ backgroundColor: '#252f3f' }}>
        </Header>
      );
    }

    return (
      <Header transparent iosBarStyle={Material.iosStatusbar} style={{ backgroundColor: '#252f3f' }}>
        <TouchableOpacity transparent onPress={this.onBack} style={{ alignSelf: 'center' }}>
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

function mapStateToProps({ auth }) {
  return {
    auth
  };
}

const bindActions = {
  signOut
};

export default connect(mapStateToProps, bindActions)(AskProHeader);