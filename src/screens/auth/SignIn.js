import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dimensions, StyleSheet } from 'react-native';
import { Button, Container, Content, Text, Footer, Item, Input, Col, Row, View, Label, Separator } from 'native-base';
import PhoneInput from "react-native-phone-number-input";
import Icon from 'react-native-vector-icons/FontAwesome5';

// import styles, { Material, screenSize } from '../../styles';
import { Center } from '../../components';
import { validateEmail } from '../../utils';
import { signInWithEmail } from '../../actions/auth';
import { MIN_PASSWORD_LEN } from '../../config';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

class SignUp extends Component {
  state = {
    email: '',
    isValidEmail: true,
    password: '',
    isValidPwd: true,
    phoneNumber: "",
    showPwd: false
  };

  onChangeEmail = (email) => {
    this.setState({
      email,
      isValidEmail: true
    });
  }

  onChangePwd = (password) => {
    this.setState({
      password,
      isValidPwd: true
    });
  }

  togglePwdShow = () => {
    this.setState(prevState => ({
      showPwd: !prevState.showPwd
    }))
  }

  onSignIn = () => {
    const { email, password } = this.state;
    const isValidEmail = validateEmail(email);
    const isValidPwd = password.length >= MIN_PASSWORD_LEN;
    this.setState({ isValidEmail, isValidPwd });

    if (!isValidEmail || !isValidPwd) return;

    this.props.signInWithEmail({ email, password });
  }

  onTerms = () => { }

  render() {
    const { isValidEmail, isValidPwd, phoneNumber, showPwd } = this.state;

    return (
      <Container>
        <Content>
          <View style={{ flex: 1, height: height - 80, position: 'relative' }}>
            <View style={{ flex: 1, backgroundColor: '#252f3f' }}></View>
            <View style={{ flex: 1, backgroundColor: '#f2f2f2' }}></View>
            <View style={styles.container}>
              <View padder style={styles.loginForm}>
                <View style={{ marginTop: 20 }}>
                  <Label style={{ color: '#7d8c96' }}>Phone Number</Label>
                  <PhoneInput
                    placeholder=" "
                    ref={phoneInput => { this.phoneInput = phoneInput }}
                    defaultValue={phoneNumber}
                    defaultCode="FR"
                    layout="first"
                    onChangeText={(text) => {
                      console.log('ssssssssss', text)
                    }}
                    onChangeFormattedText={(text) => {
                      console.log('ddddddddddddd', text)
                      this.setState({ phoneNumber: text })
                    }}
                    // autoFocus
                    containerStyle={{ backgroundColor: 'transparent', width: '100%' }}
                    textContainerStyle={{ paddingHorizontal: 0, paddingVertical: 0, borderBottomColor: '#cad4db', borderBottomWidth: 1 }}
                  />
                </View>
                <View style={{ marginTop: 20 }}>
                  <Label style={{ color: '#7d8c96' }}>Password</Label>
                  <Item error={!isValidPwd} style={{ borderBottomColor: '#cad4db', borderBottomWidth: 1 }}>
                    <Input
                      onChangeText={this.onChangePwd}
                      secureTextEntry={!showPwd}
                    />
                    <TouchableOpacity transparent onPress={this.togglePwdShow}>
                      {showPwd ?
                        <Icon style={{ fontSize: 20 }} name="eye"></Icon>
                        :
                        <Icon style={{ fontSize: 20 }} name="eye-slash"></Icon>
                      }
                    </TouchableOpacity>
                  </Item>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Button style={{ width: '100%', height: 60, justifyContent: 'center', backgroundColor: '#584fea' }}>
                    <Text style={{ fontSize: 20 }}>LOGIN</Text>
                  </Button>
                </View>
                <Separator style={{ height: 1, width: width - 20, marginLeft: -10, marginVertical: 10, backgroundColor: '#cad4db' }}></Separator>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Button style={{ backgroundColor: '#4b5563', width: '48%', paddingLeft: 16 }}>
                    <Icon name="facebook-square" style={{ fontSize: 30, color: '#fff' }}></Icon>
                    <Text>Log in with Facebook</Text>
                  </Button>
                  <Button style={{ backgroundColor: '#4b5563', width: '48%', paddingLeft: 16 }}>
                    <Icon name="google-plus-square" style={{ fontSize: 30, color: '#fff' }}></Icon>
                    <Text>Log in with Google+</Text>
                  </Button>
                </View>
              </View>
              <Center>
                <Text style={{ marginTop: 30 }}>Not registered yet?</Text>
                <Button style={{ marginTop: 20, width: '100%', height: 50, backgroundColor: '#584fea' }}>
                  <Text style={{ fontSize: 20 }}>REGISTER FOR FREE</Text>
                </Button>
                <TouchableOpacity>
                  <Text style={{ marginTop: 20, color: '#aca8a2' }}>I don't remember my password</Text>
                </TouchableOpacity>
              </Center>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '13%',
    left: 10,
    width: width - 20,
  },
  loginForm: {
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowOffset: {
      width: 10, height: 10
    },
    shadowRadius: 50,
    elevation: 10,
  }
})

function mapStateToProps({ auth }) {
  return {
    auth,
  };
}

const bindActions = {
  signInWithEmail,
};

export default connect(mapStateToProps, bindActions)(SignUp);
