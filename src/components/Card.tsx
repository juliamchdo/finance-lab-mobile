import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useState } from "react";
import { formatReal } from '../utils/formatReal'
import { parse } from "react-native-svg";

interface Movimentacao {
    item: {
        date: string,
        description: string,
        id: string,
        type: string,
        value: string
    }
}

export function Card({ item }: Movimentacao) {

    //definido os ícones e suas cores quando o componente é  montado, evitando loops infinitos
    const [iconName, setIconName] = useState<"arrow-up" | "arrow-down">(
        item.type === 'ENTRADA' ? "arrow-up" : "arrow-down"
    );

    const [iconColor, setIconColor] = useState<'#4DB6AC' | "#C62828">(
        item.type === 'ENTRADA' ? '#4DB6AC' : "#C62828"
    );

    let value = parseFloat(item.value);

    return (
        <View style={styles.card}>
            <View style={styles.resumo}>
                <Feather name={iconName} color={iconColor} size={32} />
                <Text style={[styles.text, item.type === 'ENTRADA' ? styles.positive : styles.negative]}>
                    R${formatReal(value)}
                </Text>
            </View>
            
            <TouchableOpacity style={styles.info} >
                <Feather name="info" size={22} style={styles.infoIcon}/>
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