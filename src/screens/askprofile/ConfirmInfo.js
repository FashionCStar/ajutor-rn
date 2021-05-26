import React, { Component } from 'react';
import { connect } from 'react-redux';
import csc from 'country-state-city';
import { ICountry, IState, ICity } from 'country-state-city';
import PhoneInput from 'react-native-phone-number-input';
import DropDownPicker from 'react-native-dropdown-picker';
// import { Picker } from '@react-native-picker/picker';

import { Button, Container, Content, Text, Item, Input, View, Label } from 'native-base';

import { validateEmail } from '../../utils';
import { signUp } from '../../actions/auth';
import { MIN_PASSWORD_LEN } from '../../config';

class ConfirmInfo extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    country: "",
    state: "",
    city: "",
    phoneNumber: "",
    password: '',
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
  };

  componentDidMount() {
    let countries = csc.getAllCountries();
    let countryList = countries.map(item => {
      return { label: item.name, value: item.isoCode };
    })
    this.setState({ countryList: countryList });
  }
  onChangeFirstName = (firstName) => {
    this.setState({
      firstName,
      isValidFirstName: true
    });
  }

  onChangeLastName = (lastName) => {
    this.setState({
      lastName,
      isValidLastName: true
    });
  }

  onChangeEmail = (email) => {
    this.setState({
      email,
      isValidEmail: true
    });
  }

  onChangePhone = (phoneNumber) => {
    this.setState({
      phoneNumber,
      isValidPhone: true
    });
  }

  onChangePwd = (password) => {
    this.setState({
      password,
      isValidPwd: true
    });
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

  onConfirmInfo = () => {
    // const { firstName, lastName, email, country, state, city, phoneNumber, password } = this.state;
    // const isValidFirstName = firstName ? true : false;
    // const isValidLastName = lastName ? true : false;
    // const isValidEmail = validateEmail(email);
    // const isValidCountry = country ? true : false;
    // if (!isValidCountry) {
    //   alert("Please select your country correctly!");
    //   return;
    // }
    // const isValidState = state ? true: false;
    // if (!isValidState) {
    //   alert("Please select your state correctly!");
    //   return;
    // }
    // const isValidPhone = this.phoneRef?.isValidNumber(phoneNumber)
    // if (!isValidPhone) {
    //   alert("Please input valid phone number");
    //   return;
    // }
    // // const isValidPwd = password.length >= MIN_PASSWORD_LEN;
    // this.setState({ isValidFirstName, isValidLastName, isValidEmail, isValidCountry, isValidState, isValidPhone });

    // if (!isValidFirstName || !isValidLastName || !isValidEmail ) return;

    // this.props.signUp({ email, password });
    const { navigation } = this.props;
    navigation.navigate('SmsVerification');
  }

  onTerms = () => { }

  render() {
    const { phoneNumber, isValidPwd, isValidFirstName, isValidLastName, isValidEmail, isValidCountry,
      isValidCity, country, state, city, countryList, stateList, cityList, isCountryOpen, isStateOpen, isCityOpen,
      isStateDisable, isCityDisable
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
                defaultValue={phoneNumber}
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
              <Button style={{ width: '100%', height: 60, justifyContent: 'center', backgroundColor: '#584fea' }} onPress={this.onConfirmInfo}>
                <Text style={{ fontSize: 20 }}>Confirm Information</Text>
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

export default connect(mapStateToProps, bindActions)(ConfirmInfo);
