import { useState } from "react";
import { TextInput, View } from "react-native";
import { StyleSheet, Text } from "react-native";
import DropDown from "../components/Form/DropDown";

export function NewLancamento(){
    const [descricao, setDescricao] = useState("");
    const [tipo, setTipo] = useState("");

    //Recebe o valor do componente DropDown e seta no setTipo
    function handleValueDropDown (value: string) {
      return value;
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>NOVO</Text>
                <Text style={styles.title}>LANÇAMENTO</Text>  
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>Descrição</Text>
                <TextInput onChangeText={setDescricao} style={styles.input}/>
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>Tipo</Text> 

                {/* passa como parâmnetro uma função */}
                <DropDown onChangeValue={handleValueDropDown}/>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: 100,
        padding: 30,
        backgroundColor: '#009688',
    },
    header:{
        marginBottom: 100
    },
    form:{
        marginTop: 30
    },
    title:{
        fontSize: 30,
        fontWeight: '700',
        color: '#FFFFFF'
    },
    label:{
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF'
    },
    input:{
        height: 45,
        marginTop: 12,
        borderRadius: 8,
        paddingLeft: 12,
        backgroundColor: '#FFFFFF',
    }
})

