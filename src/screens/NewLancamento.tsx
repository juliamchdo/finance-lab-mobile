import { useState } from "react";
import { Alert, TextInput, TouchableOpacity, View } from "react-native";
import { StyleSheet, Text } from "react-native";
import { BackButton } from "../components/BackButton";
import { api } from "../lib/axios"
import DropDown from "../components/Form/DropDown";


export function NewLancamento(){
    const [descricao, setDescricao] = useState("");
    const [tipo, setTipo] = useState("");
    const [valor, setValor] = useState("");

    //Recebe o valor do componente DropDown e seta no setTipo
    function handleValueDropDown (value: string) {
      setTipo(value)
    }

    async function createNewLancamento() {
        try {
            if(!descricao.trim() || tipo === null || valor === null){
                return Alert.alert("Novo Lançamento", "Preencha todos os campos.")
            }

            await api.post('/novo-lancamento', {descricao, tipo, valor});

            setDescricao("");
            setTipo("");
            setValor("");
            Alert.alert("Novo Lançamento", "Novo lançamento adicionado com sucesso!");
        } catch (error) {
            console.log(error);
            Alert.alert("Ops!", "Não foi possível adicionar um novo lançamento.")
        }
    }



    return(
        <View style={styles.container}>
            <BackButton route="home"/>
            <View style={styles.header}>
                <Text style={styles.title}>NOVO</Text>
                <Text style={styles.title}>LANÇAMENTO</Text>  
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>Descrição</Text>
                <TextInput onChangeText={setDescricao} style={styles.input}/>
            </View>

            <View style={styles.form}>
                <View style={styles.formGroup}>
                    <View >
                        <Text style={styles.label}>Tipo</Text>
                        {/* passa como parâmnetro uma função */}
                        <DropDown onChangeValue={handleValueDropDown}/>
                    </View>
                    
                    <View style={{width: 150,marginLeft: 30}}>
                        <Text style={styles.label}>Valor</Text>
                        <TextInput onChangeText={setValor} style={styles.input}/>
                    </View>                   
                </View>

                <TouchableOpacity onPress={createNewLancamento} activeOpacity={0.7} style={styles.button}>
                    <Text style={styles.buttonText}>NOVO LANÇAMENTO</Text>
              </TouchableOpacity>
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
        marginTop: 20,
        marginBottom: 100
    },
    form:{
        marginTop: 10
    },
    formGroup:{
        flexDirection: 'row'
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
    },
    button:{
        marginTop: 70,
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
        borderRadius: 10,
        backgroundColor: '#4DB6AC',
        color: '#FFFFFF'
      },
      buttonText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '700'
      }
})

