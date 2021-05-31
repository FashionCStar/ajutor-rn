import React, { Component, useState } from 'react';
import { Button, Container, Content, Text, View, Body, Right, List, ListItem } from 'native-base';
import { Center } from '../../components';
import PhoneInput from 'react-native-phone-number-input';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
// import { setLanguage } from '../../actions/main';

const SelectLanguage = ({ navigation }) => {
  const [phone, setPhone] = useState();
  const onChangePhone = (number) => {
    setPhone(number);
  }
  const onChangePassword = () => {
    // navigation.navigate("ChangePassword")
  }

  return (
    <Container style={{ backgroundColor: '#f2f2f2' }}>
      <Content padder>
        <Center>
          <Label style={{ color: '#7d8c96' }}>Select Default App Language</Label>
          <List>
            <ListItem selected>
              <Left>
                <Text>English</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem selected>
              <Left>
                <Text>Simon Mignolet</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </List>
        </Center>
      </Content>
    </Container>
  );
}

function mapStateToProps({ main, state }) {
  return {
    main,
    state
  };
}

const bindActions = {
};

export default connect(mapStateToProps, bindActions)(SelectLanguage);
