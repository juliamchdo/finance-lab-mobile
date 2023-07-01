import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const data = [
  { label: 'Entrada', value: 'ENTRADA' },
  { label: 'Saída', value: 'SAIDA' },
];

interface ChangedValue{
  onChangeValue: (changedValue: string) => void
  valor: string | undefined
}

const DropDown = ({onChangeValue, valor}:ChangedValue) => {
  const [value, setValue] = useState('')

  //passa o valor do campo para a função recebida como parâmetro quando o
  //valor do dropdown é alterado
  useEffect(() => {
    onChangeValue(value)
  }, [value, onChangeValue])

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
      value={value || valor}
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
    paddingTop: 6,
    paddingRight: 10,
    paddingLeft: 20,
    paddingBottom: 6,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  }
});