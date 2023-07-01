import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useState } from "react";
import { formatReal } from '../utils/formatReal'
import { NavigationProp, useNavigation } from "@react-navigation/native";


interface Movimentacao {
    item: {
        date: string,
        descricao: string,
        id: string,
        tipo: string,
        valor: string
    }
}

//Define as rotas disponíveis na navegação
type RootStackParamList = {
    info: { id: string };
};

//Define o tipo da propriedade
type NavigationType = NavigationProp<RootStackParamList, 'info'>;

export function Card({ item }: Movimentacao) {
    const { navigate } = useNavigation<NavigationType>();

    //definido os ícones e suas cores quando o componente é  montado, evitando loops infinitos
    const [iconName, setIconName] = useState<"arrow-up" | "arrow-down">(
        item.tipo === 'ENTRADA' ? "arrow-up" : "arrow-down"
    );

    const [iconColor, setIconColor] = useState<'#4DB6AC' | "#C62828">(
        item.tipo === 'ENTRADA' ? '#4DB6AC' : "#C62828"
    );

    let value = parseFloat(item.valor);

    return (
        <View style={styles.card}>
            <View style={styles.resumo}>
                <Feather name={iconName} color={iconColor} size={32} />
                <Text style={[styles.text, item.tipo === 'ENTRADA' ? styles.positive : styles.negative]}>
                    R${formatReal(value)}
                </Text>
            </View>
            
            <TouchableOpacity style={styles.info} >
                <Feather onPress={() => navigate("info", {id: item.id})} name="info" size={22} style={styles.infoIcon}/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: "space-between",
        height: 95,
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
        backgroundColor: '#FFFFFF'
    },
    resumo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    info:{
        justifyContent: 'center',
        marginRight: 20
    },
    infoIcon:{
        color: '#455A64'
    },
    text: {
        marginLeft: 10,
        fontSize: 22,
        fontWeight: '700'
    },
    positive: {
        color: '#4DB6AC'
    },
    negative: {
        color: '#C62828'
    }
});