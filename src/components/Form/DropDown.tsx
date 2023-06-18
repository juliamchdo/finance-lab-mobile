import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const data = [
  { label: 'Entrada', value: 'ENTRADA' },
  { label: 'Saída', value: 'SAIDA' },
];

interface ChangedValue{
  onChangeValue: (changedValue: string) => void
}

const DropDown = ({onChangeValue}:ChangedValue) => {

  const [value, setValue] = useState('')

  //passa o valor do campo para a função recebida como parâmetro
  onChangeValue(value)

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Selecione"
      value={value}
      onChange={item => {
        setValue(item.value);
      }}
    />
  );
};

export default DropDown;

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: 150,
    marginTop: 12,
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 20,
    paddingBottom: 10,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  }
});