import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import dayjs from "dayjs";
import { useCallback, useState } from "react";
import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import { api } from "../lib/axios"
import { formatReal } from '../utils/formatReal'
import { Loading } from "../components/Loading";
import { Card } from "../components/Card";

//Define as rotas disponíveis na navegação
type RootStackParamList = {
  new: { lancamento: {} };
};

//Define o tipo da propriedade
type NavigationType = NavigationProp<RootStackParamList, 'new'>;

export function Home(){
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState<number>(0);
    const [movimentacoes, setMovimentacoes] = useState([]);
  
    const { navigate } = useNavigation<NavigationType>();

    const day = dayjs().date();
    const getMonth = dayjs().format('MMMM');
    const [month, setMonth] = useState('');

    async function fecthData() {
        try {
            setLoading(true);
            const response = await api.get('/total')
            setTotal(response.data)

            const resumo = await api.get('/resumo')
            setMovimentacoes(resumo.data)
            setLoading(false)
        } catch (error) {
            Alert.alert("Ops!", "Não foi possível carregar os lançamentos.")
        }
    }

    //UseFocusEffect para executar a função toda vez que retorna para a tela
    useFocusEffect(useCallback(() => {
      fecthData();
      switch (getMonth) {
        case 'January':
          setMonth('Janeiro');
          break;

        case 'February':
          setMonth('Fevereiro');
          break;

        case 'March':
          setMonth('Março');
          break;

        case "April":
          setMonth('Abril');
          break;

        case "May":
          setMonth('Maio');
          break;
      
        case "June":
          setMonth('Junho');
          break;

        case "July":
          setMonth("Julho");
          break;

        case "August":
          setMonth("Agosto");
          break;

        case "September":
          setMonth("Setembro");
          break;

        case "October":
          setMonth("Setembro");
          break;

        case "November":
          setMonth("Novembro");
          break;

        case "December":
          setMonth("Dezembro");
          break;
        default:
          setMonth(getMonth);
      }
    }, [getMonth]));

      if(loading){
        return (
          <Loading />
        )
      }

    return(
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.text}>{day} de {month}</Text>
            <View style={styles.totalContainer}>
              <Text style={[styles.totalText, total > 0 ? styles.positiveText : styles.negativeText]}>
                R${formatReal(total)}</Text>
              <Text style={styles.saldo}>Saldo Total</Text>
            </View>
          </View>

            <View style={styles.resumo}>
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
              {
                
                movimentacoes.length ?
                  movimentacoes.map((m,i) => {
                    return <Card key={i} item={m}/>
                  })
                :
                <Text style={styles.subtext}>Não há movimentações existentes</Text>
              }
              </ScrollView>

              <TouchableOpacity onPress={() => navigate("new", { lancamento :{ 
                valor: "", descricao: "", tipo: "", id: "" } })} activeOpacity={0.7} style={styles.button}>
                <Text style={styles.buttonText}>NOVO LANÇAMENTO</Text>
              </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
      backgroundColor: '#009688'
    },
    header: {
        width: '100%',
        flexDirection: "column", 
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: 30,
        padding: 30,
        backgroundColor: '#009688'
    },
    text: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 22,
        color: '#FAF7F7',
        marginBottom: 50,
        marginLeft: 100
    },
    subtext:{
      color: "#455A64",
      fontSize: 16,
      fontFamily: 'Inter_600SemiBold',
      marginLeft: 16
    },
    totalContainer:{
      flexDirection: 'column'
    },
    totalText:{
      fontSize: 50,
      fontWeight: 'bold'
    },
    positiveText:{
      color: '#FAF7F7',
    },
    negativeText:{
      color: '#C62828',
    },
    saldo:{
      fontSize: 22,
      color: '#FAF7F7',
      fontWeight: 'bold'
    },
    resumo:{
      height: 600,
      padding: 50,
      backgroundColor: '#B2DFDB',
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    },
    button:{
      marginBottom: 70,
      alignItems: 'center',
      justifyContent: 'center',
      height: 48,
      borderRadius: 10,
      backgroundColor: '#009688',
      color: '#FFFFFF'
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 20,
      fontWeight: '700'
    }
})