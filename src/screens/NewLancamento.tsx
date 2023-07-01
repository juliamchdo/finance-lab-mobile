import { useEffect, useState } from "react";
import { Alert, TextInput, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { StyleSheet, Text } from "react-native";
import { BackButton } from "../components/BackButton";
import { api } from "../lib/axios"
import DropDown from "../components/Form/DropDown";
import { useRoute } from "@react-navigation/native";

interface Props extends TouchableOpacityProps{
    lancamento: {
        valor: string,
        descricao: string,
        tipo: string,
        id: String
    }  | undefined
}

export function NewLancamento(){
    const [descricao, setDescricao] = useState("");
    const [tipo, setTipo] = useState("");
    const [valor, setValor] = useState("");
    const route = useRoute();
    const { lancamento = { valor: valor, descricao: valor, tipo: valor, id: valor } } = route.params as Props;
   
    

    //Recebe o valor do componente DropDown e seta no setTipo
    function handleValueDropDown (value: string) {
      setTipo(value)
    }

    async function createNewLancamento(id : String) {
        try {
            if(!descricao.trim() || tipo === null || valor === null){
                return Alert.alert("Novo Lançamento", "Preencha todos os campos.")
            }

            let v = valor.replace(",", ".")
            
            if(id !== null){
                await api.post('/editar-lancamento', {descricao: descricao, tipo: tipo, valor: Number(v), id: id});
                Alert.alert("Lançamento", "Alterações salvas com sucesso!");
            } else {
                await api.post('/novo-lancamento', {description: descricao, type: tipo, value: Number(v)});
                Alert.alert("Novo Lançamento", "Novo lançamento adicionado com sucesso!");    
            }
            setDescricao("");
            setTipo("");
            setValor("");
        } catch (error) {
            console.debug(error);
            Alert.alert("Ops!", "Não foi possível adicionar um novo lançamento.")
        }
    }

    useEffect(() => {
        setDescricao(lancamento.descricao);
        // setTipo(lancamento.tipo);
        setValor(lancamento.valor)
        console.log(tipo)
    }, [])

    return(
        <View style={styles.container}>
            <BackButton route="home"/>
            <View style={styles.header}>
                <Text style={styles.title}>{lancamento.id ? "EDITAR" : "NOVO"}</Text>
                <Text style={styles.title}>LANÇAMENTO</Text>  
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>Descrição</Text>
                <TextInput onChangeText={setDescricao} defaultValue=""  style={styles.input} value={descricao}/>
            </View>

            <View style={styles.form}>
                <View style={styles.formGroup}>
                    <View >
                        <Text style={styles.label}>Tipo</Text>
                        {/* passa como parâmetro uma função */}
                        <DropDown onChangeValue={handleValueDropDown} valor={tipo}/>
                    </View>
                    
                    <View style={{width: 150,marginLeft: 30}}>
                        <Text style={styles.label}>Valor</Text>
                        <TextInput onChangeText={setValor} style={styles.input} value={valor || lancamento.valor}/>
                    </View>                   
                </View>

                <TouchableOpacity onPress={() => createNewLancamento(lancamento.id)} activeOpacity={0.7} style={styles.button}>
                    <Text style={styles.buttonText}>{lancamento.id ? "SALVAR ALTERAÇÕES" : "ADICIONAR LANÇAMENTO"}</Text>
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

