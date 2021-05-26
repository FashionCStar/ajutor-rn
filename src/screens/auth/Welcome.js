import React, { Component } from 'react';
import { Button, Container, Content, Text, Icon } from 'native-base';

import styles, { Material, screenSize } from '../../styles';
import { Center } from '../../components';

class SmsVerification extends Component {
  onGetStarted = () => {
    const {navigation} = this.props;
    navigation.replace('Intro');
  }

  render() {
    return (
      <Container>
        <Content padder>
          <Center style={{marginVertical: screenSize.height * 0.25}}>
            <Text style={styles.logoTitle}>JCI</Text>
            <Text style={{color: Material.touchableTextColor}}>Just Checking In - Mental Health</Text>
          </Center>
          <Button rounded block style={{marginHorizontal: 10}} onPress={this.onGetStarted}>
            <Text>Get Started</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default SmsVerification;
