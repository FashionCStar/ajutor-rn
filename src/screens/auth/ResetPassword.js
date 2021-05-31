import React, { Component, useState } from 'react';
import { Button, Container, Content, Text, View, Body, Right, Label, Item, Input } from 'native-base';
import { Center } from '../../components';
import { TouchableOpacity } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { resetPassword } from '../../actions/auth';
import { connect } from 'react-redux';

const ResetPassword = ({ navigation, resetPassword }) => {
  const [isValidPwd, setIsValidPwd] = useState(true);
  const [showPwd, setShowPwd] = useState(false);
  const [password, setPassword] = useState("");

  const togglePwdShow = () => {
    setShowPwd(!showPwd);
  }

  const onChangePwd = (password) => {
    setPassword(password);
    setIsValidPwd(true);
  }

  const onChangeConfirmPwd = (confirmPwd) => {
    if (confirmPwd && confirmPwd != password) {
      setIsValidPwd(false);
    } else {
      setIsValidPwd(true);
    }
  }

  const changePassword = () => {
    resetPassword({ email: 'fashioncstar@gmail.com', email_code: "", newPassword }, () => {
      navigation.navigate("ResetPassword")
    });
  }

  return (
    <Container style={{ backgroundColor: '#f2f2f2' }}>
      <Content padder>
        <View style={{ marginTop: 10 }}>
          <Label style={{ color: '#7d8c96' }}>New Password</Label>
          <Item style={{ borderBottomColor: '#cad4db', borderBottomWidth: 1 }}>
            <Input
              onChangeText={onChangePwd}
              secureTextEntry={!showPwd}
            />
            <TouchableOpacity transparent onPress={togglePwdShow}>
              {showPwd ?
                <Icon style={{ fontSize: 20 }} name="eye"></Icon>
                :
                <Icon style={{ fontSize: 20 }} name="eye-slash"></Icon>
              }
            </TouchableOpacity>
          </Item>
        </View>
        <View style={{ marginTop: 10 }}>
          <Label style={{ color: '#7d8c96' }}>Repeat New Password</Label>
          <Item error={!isValidPwd}>
            <Input
              onChangeText={onChangeConfirmPwd}
              secureTextEntry={!showPwd}
            />
            <TouchableOpacity transparent onPress={togglePwdShow}>
              {showPwd ?
                <Icon style={{ fontSize: 20 }} name="eye"></Icon>
                :
                <Icon style={{ fontSize: 20 }} name="eye-slash"></Icon>
              }
            </TouchableOpacity>
          </Item>
        </View>
        <View style={{ marginTop: 20 }}>
          <Button style={{ width: '100%', height: 60, justifyContent: 'center', backgroundColor: '#584fea' }} onPress={changePassword}>
            <Text style={{ fontSize: 20 }}>CHANGE PASSWORD</Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
}

function mapStateToProps({ auth, state }) {
  return {
    auth,
    state
  };
}

const bindActions = {
  resetPassword,
};

export default connect(mapStateToProps, bindActions)(ResetPassword);
