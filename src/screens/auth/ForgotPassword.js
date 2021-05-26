import React, { Component, useState } from 'react';
import { Button, Container, Content, Text, View, Body, Right } from 'native-base';
import { Center } from '../../components';
import PhoneInput from 'react-native-phone-number-input';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { forgotPassword } from '../../actions/auth';

const ForgotPassword = ({ navigation, forgotPassword }) => {
  const [phone, setPhone] = useState();
  const onChangePhone = (number) => {
    setPhone(number);
  }
  const onForgotPassword = () => {
    forgotPassword({ email: 'fashioncstar@gmail.com' }, () => {
      navigation.navigate("ResetPassword")
    });
    // navigation.navigate("ChangePassword")
  }

  return (
    <Container style={{ backgroundColor: '#f2f2f2' }}>
      <Content padder>
        <Center>
          <Text style={{ fontSize: 24, textAlign: 'center', paddingHorizontal: 20 }}>Please enter your phone number below we'll send you a sms to confirm your account.</Text>
          <PhoneInput
            placeholder=" "
            defaultValue={phone}
            defaultCode="FR"
            layout="first"
            onChangeText={(text) => {
            }}
            onChangeFormattedText={(text) => {
              onChangePhone(text);
            }}
            // autoFocus
            containerStyle={{ backgroundColor: 'transparent', width: '100%', marginTop: 20 }}
            textContainerStyle={{ paddingHorizontal: 0, paddingVertical: 0, borderBottomColor: '#cad4db', borderBottomWidth: 1 }}
          />
          <View style={{ marginTop: 20, flexDirection: 'row', paddingLeft: 10 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: "#b39f9e" }}>By continuing, I confirm that I have read and agree to the Terms & Conditions and Privacy Policy</Text>
            </View>
            <View style={{ width: 60 }}>
              <Button style={{ width: 60, height: 60, borderRadius: 50, justifyContent: 'center', backgroundColor: '#584fea' }}
                onPress={() => { onForgotPassword(); }}
              >
                <Icon name="angle-right" style={{ fontSize: 20, color: "#fff" }} />
              </Button>
            </View>
          </View>
        </Center>
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
  forgotPassword,
};

export default connect(mapStateToProps, bindActions)(ForgotPassword);
