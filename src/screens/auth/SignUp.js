import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import csc from 'country-state-city';
import { ICountry, IState, ICity } from 'country-state-city';
import PhoneInput from 'react-native-phone-number-input';
import DropDownPicker from 'react-native-dropdown-picker';
// import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Button, Container, Content, Text, Item, Input, View, Label, Toast } from 'native-base';

import { validateEmail } from '../../utils';
import { signUp } from '../../actions/auth';
import { MIN_PASSWORD_LEN } from '../../config';

class SignUp extends Component {
  state = {
    first_name: 'Aadil',
    last_name: 'Achaa',
    email: 'fashion7@gmail.com',
    country: "United States",
    state: "California",
    city: "San Francisco",
    phone: "123123124",
    password: 'Qwert!2345*',
    isValidFirstName: true,
    isValidLastName: true,
    isValidEmail: true,
    isValidCountry: true,
    isValidState: true,
    isValidCity: true,
    isValidPhone: true,
    isValidPwd: true,
    countryList: [],
    stateList: [],
    cityList: [],
    isCountryOpen: false,
    isStateOpen: false,
    isStateDisable: true,
    isCityOpen: false,
    isCityDisable: true,
    showPwd: false,
  };

  componentDidMount() {
    let countries = csc.getAllCountries();
    let countryList = countries.map(item => {
      return { label: item.name, value: item.isoCode };
    })
    this.setState({ countryList: countryList });
  }
  onChangeFirstName = (first_name) => {
    this.setState({
      first_name,
      isValidFirstName: true
    });
  }

  onChangeLastName = (last_name) => {
    this.setState({
      last_name,
      isValidLastName: true
    });
  }

  onChangeEmail = (email) => {
    this.setState({
      email,
      isValidEmail: true
    });
  }

  onChangePhone = (phone) => {
    this.setState({
      phone,
      isValidPhone: true
    });
  }

  onChangePwd = (password) => {
    this.setState({
      password,
      isValidPwd: true
    });
  }

  onChangeConfirmPwd = (confirmPassword) => {
    this.setState({
      confirmPassword
    })
  }

  onChangeCountry = (value) => {
    let states = csc.getStatesOfCountry(value);
    let stateList = states.map(item => {
      return { label: item.name, value: item.isoCode };
    })
    this.setState({ stateList: stateList, state: "", city: "", isStateDisable: false });
  }

  onChangeState = (country, state) => {
    let cities = csc.getCitiesOfState(country, state);
    let cityList = cities.map(item => {
      return { label: item.name, value: item.name };
    })
    this.setState({ cityList: cityList, city: "", isCityDisable: false });
  }

  togglePwdShow = () => {
    this.setState(prevState => ({
      showPwd: !prevState.showPwd
    }))
  }

  onSignUp = () => {
    const { first_name, last_name, email, country, state, city, phone, password } = this.state;
    const isValidFirstName = first_name ? true : false;
    const isValidLastName = last_name ? true : false;
    const isValidEmail = validateEmail(email);
    const isValidCountry = country ? true : false;
    if (!isValidCountry) {
      Toast.show({ text: "Please select your country correctly!", type: 'warning', duration: 3000 });
      return;
    }
    const isValidState = state ? true: false;
    if (!isValidState) {
      Toast.show({ text: "Please select your state correctly!", type: 'warning', duration: 3000 });
      return;
    }
    const isValidPhone = this.phoneRef?.isValidNumber(phone)
    if (!isValidPhone) {
      Toast.show({ text: "Please input valid phone number!", type: 'warning', duration: 3000 });
      return;
    }
    // const isValidPwd = password.length >= MIN_PASSWORD_LEN;
    this.setState({ isValidFirstName, isValidLastName, isValidEmail, isValidCountry, isValidState, isValidPhone });

    if (!isValidFirstName || !isValidLastName || !isValidEmail) return;
    
    try {
      this.props.signUp({ email, phone, password, first_name, last_name, country, state, city });
    } catch (error) {
      console.log('sign up errorrrrr', error);
    }
    
    // const { navigation } = this.props;
    // navigation.navigate('SmsVerification');
  }

  onTerms = () => { }

  render() {
    const { phone, isValidPwd, isValidFirstName, isValidLastName, isValidEmail, isValidCountry,
      isValidCity, country, state, city, countryList, stateList, cityList, isCountryOpen, isStateOpen, isCityOpen,
      isStateDisable, isCityDisable, showPwd
    } = this.state;

    return (
      <Container>
        <Content padder>
          <View padder>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ width: '48%' }}>
                <Label style={{ color: '#7d8c96' }}>First Name</Label>
                <Item error={!isValidFirstName} style={{ borderBottomColor: '#cad4db', borderBottomWidth: 1 }}>
                  <Input
                    onChangeText={this.onChangeFirstName}
                  />
                </Item>
              </View>
              <View style={{ width: '48%' }}>
                <Label style={{ color: '#7d8c96' }}>Last Name</Label>
                <Item error={!isValidLastName} style={{ borderBottomColor: '#cad4db', borderBottomWidth: 1 }}>
                  <Input
                    onChangeText={this.onChangeLastName}
                  />
                </Item>
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <Label style={{ color: '#7d8c96' }}>Email</Label>
              <Item error={!isValidEmail} style={{ borderBottomColor: '#cad4db', borderBottomWidth: 1 }}>
                <Input
                  onChangeText={this.onChangeEmail}
                />
              </Item>
            </View>
            <View style={{ marginTop: 0 }}>
              <Label style={{ color: '#7d8c96' }}>Select your country</Label>
              <DropDownPicker
                open={isCountryOpen}
                listMode="MODAL"
                placeholder=""
                searchable={true}
                items={countryList}
                value={country}
                itemKey="value"
                containerStyle={{ height: 40 }}
                textStyle={{ fontSize: 20 }}
                style={{ borderRadius: 0, borderWidth: 0, borderBottomWidth: 1, borderBottomColor: '#cad4db' }}
                setOpen={() => this.setState({ isCountryOpen: true })}
                onClose={() => this.setState({ isCountryOpen: false })}
                setValue={(callback) => this.setState(state => ({ country: callback(state.country) }))}
                onChangeValue={(country) => this.onChangeCountry(country)}
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <Label style={{ color: '#7d8c96' }}>Select your state</Label>
              <DropDownPicker
                open={isStateOpen}
                disabled={isStateDisable}
                listMode="MODAL"
                placeholder=""
                searchable={true}
                items={stateList}
                value={state}
                itemKey="value"
                containerStyle={{ height: 40 }}
                textStyle={{ fontSize: 20 }}
                style={{ borderRadius: 0, borderWidth: 0, borderBottomWidth: 1, borderBottomColor: '#cad4db' }}
                setOpen={() => this.setState({ isStateOpen: true })}
                onClose={() => this.setState({ isStateOpen: false })}
                setValue={(callback) => { this.setState(state => ({ state: callback(state.state) })) }}
                onChangeValue={(state) => this.onChangeState(country, state)}
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <Label style={{ color: '#7d8c96' }}>Select your city</Label>
              <DropDownPicker
                open={isCityOpen}
                disabled={isCityDisable}
                listMode="MODAL"
                placeholder=""
                searchable={true}
                items={cityList}
                value={city}
                itemKey="value"
                containerStyle={{ height: 40 }}
                textStyle={{ fontSize: 20 }}
                style={{ borderRadius: 0, borderWidth: 0, borderBottomWidth: 1, borderBottomColor: '#cad4db' }}
                setOpen={() => this.setState({ isCityOpen: true })}
                onClose={() => this.setState({ isCityOpen: false })}
                setValue={(callback) => { this.setState(state => ({ city: callback(state.city) })) }}
                onChangeValue={(val) => { console.log('ddddddd', val) }}
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <Label style={{ color: '#7d8c96' }}>Phone</Label>
              <PhoneInput
                placeholder=" "
                ref={ref => { this.phoneRef = ref }}
                defaultValue={phone}
                defaultCode="FR"
                layout="first"
                onChangeText={(text) => {
                }}
                onChangeFormattedText={(text) => {
                  this.onChangePhone(text);
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
            <View style={{ marginTop: 20 }}>
              <Label style={{ color: '#7d8c96' }}>Confirm Password</Label>
              <Item error={!isValidPwd} style={{ borderBottomColor: '#cad4db', borderBottomWidth: 1 }}>
                <Input
                  onChangeText={this.onChangeConfirmPwd}
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
            <View style={{ marginTop: 20 }}>
              <Button style={{ width: '100%', height: 60, justifyContent: 'center', backgroundColor: '#584fea' }} onPress={this.onSignUp}>
                <Text style={{ fontSize: 20 }}>Sign Up</Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps({ auth, state }) {
  return {
    auth,
    state
  };
}

const bindActions = {
  signUp,
};

export default connect(mapStateToProps, bindActions)(SignUp);
