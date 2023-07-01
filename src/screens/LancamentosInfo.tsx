import { View, StyleSheet, TouchableOpacity, TouchableOpacityProps, Text, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { BackButton } from "../components/BackButton";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { api } from "../lib/axios";
import { formatReal } from "../utils/formatReal";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import dayjs from "dayjs";

interface Props extends TouchableOpacityProps{
    id: string
}

interface LancamentoProps{
    date: Date,
    descricao: String,
    id: String,
    tipo: String,
    valor: String
}

//Define as rotas disponíveis na navegação
type RootStackParamList = {
    info: { id: String };
    new: { lancamento: {} };
};

//Define o tipo da propriedade
type NavigationType = NavigationProp<RootStackParamList, 'info', 'new'>;

export function LancamentosInfo() {
    const route = useRoute();
    const [loading, setLoading] = useState(true);
    const [lancamento, setLancamento] = useState<LancamentoProps>();
    const { id } = route.params as Props;
    const { navigate } = useNavigation<NavigationType>();

    const dataCadastro = dayjs(lancamento?.date).format("DD/MM/YYYY")
    

    async function fecthData(){
        try {
            const response = await api.get(`/lancamento/${id}`);
            setLancamento(response.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            Alert.alert("Ops!", "Não foi possível carregar os detalhes do lançamento.")
        }
    }

    async function confirm(id : String) {
        Alert.alert("Excluir Lançamento", "Você tem certeza que deseja excluir esse lançamento?", [
            {
                text: "Cancelar",
                onPress: () => navigate("info", {id})
            }, 
            {
                text: "Confirmar",
                onPress: () => deleteLancamento(id)
            }
        ])
    }

    async function deleteLancamento(id: String) {
        try {
            const response = await api.delete(`/delete/${id}`)

            if(response){
                Alert.alert("Lançamento", "Lançamento excluído com sucesso!", [
                    {
                        text: "OK",
                        onPress: () => navigate("home" as never)
                    }
                ])
                
            }
        } catch (error) {
            console.log(error);
            Alert.alert("Ops!", "Não foi possível deletar o lançamento.")
        }
    }

    function editLancamento(){

    }

    function handleTipo(tipo: String | undefined){
        let value = '-';
        if(tipo === 'ENTRADA'){
            value = 'Entrada'
        } else if(tipo === 'SAIDA'){
            value = 'Saída'
        }

        return value;
    }

    useEffect(() => {
        fecthData();
    },[]);

    if(loading){
        return (
          <Loading />
        )
    }

    return (
        <View style={styles.container}>
            <BackButton route="home"/>
            <View style={styles.header}>
                <Text style={styles.title}>DETALHES DO</Text>
                <Text style={styles.title}>LANÇAMENTO</Text>  
            </View>
            <View style={styles.action}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => confirm(id)}>
                    <Text style={styles.subtext}>EXCLUIR</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.card}>
                <View style={styles.item}>
                    <Text style={styles.label}>Descrição:</Text>
                    <Text style={styles.itemValue}>{lancamento?.descricao}</Text>
                </View> 

                <View style={styles.item}>
                    <Text style={styles.label}>Tipo:</Text>
                    <Text style={styles.itemValue}>{handleTipo(lancamento?.tipo)}</Text>
                </View> 

                <View style={styles.item}>
                    <Text style={styles.label}>Valor:</Text>
                    <Text style={styles.itemValue}>R${formatReal(Number(lancamento?.valor))}</Text>
                </View> 

                <View style={styles.item}>
                    <Text style={styles.label}>Data de Cadastro:</Text>
                    <Text style={styles.itemValue}>{dataCadastro}</Text>
                </View>
            </View>

            <TouchableOpacity activeOpacity={0.7} onPress={() => navigate("new", { lancamento :{ 
                valor: lancamento?.valor, descricao: lancamento?.descricao, tipo: lancamento?.tipo, id: lancamento?.id } 
                })} style={styles.button}>
                    <Text style={styles.buttonText}>EDITAR LANÇAMENTO</Text>
                </TouchableOpacity>
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
        marginBottom: 30
    },
    title: {
        fontSize: 30,
        fontWeight: '700',
        color: '#FFFFFF'
    },
    action:{
        alignItems: "flex-end",
        padding: 10
    },
    item: {
        flexDirection: "row",
        alignItems: 'center',
        marginRight: 5,
        marginBottom: 35
    },
    itemValue:{
        fontFamily: 'Inter_400Regular',
        color: '#FFFFFF',
        fontSize: 18,
    },
    label: {
        fontFamily: 'Inter_700Bold',
        color: '#FFFFFF',
        fontSize: 18,
        marginRight: 10
    },
    subtext:{
        fontFamily: "Inter_400Regular",
        fontSize: 14,
        color: "#FFFFFF"
    },
    card: {
        height: 300,
        flexDirection: "column",
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 30,
        borderRadius: 20,
        backgroundColor: "#4DB6AC",
    },
    button:{
        marginTop: 40,
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