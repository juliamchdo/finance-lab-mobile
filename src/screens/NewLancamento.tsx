import { useEffect, useState } from "react";
import { Alert, TextInput, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { StyleSheet, Text } from "react-native";
import { BackButton } from "../components/BackButton";
import { api } from "../lib/axios"
import DropDown from "../components/Form/DropDown";
import { useRoute } from "@react-navigation/native";
import { TextInputMask } from 'react-native-masked-text';

interface Props extends TouchableOpacityProps{
    lancamento: {
        valor: number,
        descricao: string,
        tipo: string,   
        date: string,
        id: String
    }  | undefined,

    edit: Boolean
}

export function NewLancamento(){
    const [descricao, setDescricao] = useState("");
    const [tipo, setTipo] = useState("");
    const [valor, setValor] = useState(0);
    const [inputValor, setInputValor] = useState("");
    const [id, setId] = useState("")
    const route = useRoute();
    const [edicao, setEdicao] = useState(false)
    const { lancamento = { valor: valor, descricao: descricao, tipo: tipo, id: id}, edit = edicao } = route.params as Props;

    //Recebe o valor do componente DropDown e seta no setTipo
    function handleValueDropDown (value: string) {
      setTipo(value)
    }

    async function createNewLancamento(id : String | number) {
        try {
            if(!descricao.trim() || tipo === null || valor === null){
                return Alert.alert("Novo Lançamento", "Preencha todos os campos.")
            }

            if(edit){
                 await api.post('/editar-lancamento', {
                    descricao: descricao ? descricao : lancamento.descricao, 
                    tipo: tipo ? tipo : lancamento.tipo, 
                    valor: valor ? valor : Number(lancamento.valor), 
                    id:id});
                Alert.alert("Lançamento", "Alterações salvas com sucesso!");
            } else {
                await api.post('/novo-lancamento', {descricao: descricao, tipo: tipo, valor: valor});
                Alert.alert("Novo Lançamento", "Novo lançamento adicionado com sucesso!");    
            }
        } catch (error) {
            console.debug(error);
            Alert.alert("Ops!", "Não foi possível adicionar um novo lançamento.")
        }
    }

    useEffect(() => {
        let v = Number(lancamento?.valor)
        setDescricao(lancamento.descricao);
        setTipo(lancamento.tipo);
        setInputValor(v.toLocaleString('pt-br', {minimumFractionDigits: 2}));
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
                    <View>
                        <Text style={styles.label}>Tipo</Text>
                        {/* passa como parâmetro uma função */}
                        <DropDown onChangeValue={handleValueDropDown} valor={tipo || lancamento.tipo}/>
                    </View>
                    
                    <View style={{width: 150,marginLeft: 30}}>
                        <Text style={styles.label}>Valor</Text>
                    
                        <TextInputMask 
                            type={`money`}
                            style={styles.input}
                            value={inputValor}
                            maxLength={18}
                            onChangeText={value => {
                                setInputValor(value)
                                value = value.replace('R$', '');
                                value = value.replace('.', '');
                                value = value.replace(",", ".")
                                setValor(Number(value))
                            }}
                        />
                    </View>                  
                </View>

                <TouchableOpacity onPress={() => createNewLancamento(lancamento?.id)} activeOpacity={0.7} style={styles.button}>
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
        marginBottom: 50
    },
    form:{
        marginTop: 10
    },
    formGroup:{
        flexDirection: 'row',
        marginBottom: 6
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

