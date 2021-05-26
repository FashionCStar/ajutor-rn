import React, { Component, useState } from 'react';
import { Button, Container, Content, Text, Icon, View } from 'native-base';
import { TouchableOpacity } from 'react-native';

import {
  CodeField,
  Cursor,
  isLastFilledCell,
  MaskSymbol,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Center } from '../../components';

const SmsVerification = ({ navigation }) => {
  const [value, setValue] = useState();
  const ref = useBlurOnFulfill({ value, cellCount: 4 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const renderCell = ({ index, symbol, isFocused }) => {
    let textChild = null;

    if (symbol) {
      textChild = (
        <MaskSymbol
          maskSymbol={"\u2B24"}
          isLastFilledCell={isLastFilledCell({ index, value })}>
          {symbol}
        </MaskSymbol>
      );
    } else if (isFocused) {
      textChild = <Cursor />;
    }

    return (
      <Text
        key={index}
        style={[{
          width: 75,
          height: 75,
          margin: 5,
          lineHeight: 70,
          fontSize: 24,
          borderWidth: 1,
          borderRadius: 5,
          borderColor: '#fff',
          textAlign: 'center',
          color: "#fff"
        }, isFocused && {
          borderColor: '#fff',
        }]}
        onLayout={getCellOnLayoutHandler(index)}>
        {textChild}
      </Text>
    );
  };

  return (
    <Container style={{ backgroundColor: '#252f3f' }}>
      <Content padder>
        <Center style={{ marginTop: 100 }}>
          <Text style={{ color: "#fff", fontSize: 24, textAlign: 'center', paddingHorizontal: 40 }}>Enter the 4-digit code send to you at 0725863977</Text>
          <CodeField
            ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={value}
            onChangeText={setValue}
            cellCount={4}
            rootStyle={{ marginTop: 20 }}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={renderCell}
          />
          <TouchableOpacity style={{ marginTop: 20 }}>
            <Text style={{ color: "#cad4db", fontSize: 16 }}>SEND AGAIN</Text>
          </TouchableOpacity>
          <View style={{ marginTop: 20 }}>
            <Button style={{ width: '100%', height: 60, justifyContent: 'center', backgroundColor: '#584fea' }}
              onPress={() => navigation.navigate("ConfirmInfo")}
            >
              <Text style={{ fontSize: 20 }}>Confirm Phone Number</Text>
            </Button>
          </View>
        </Center>
      </Content>
    </Container>
  );
}

export default SmsVerification;
