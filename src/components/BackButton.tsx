import { useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';

type Params = {
    route: String
}

//Função para voltar para a página anterior
export function BackButton({route} : Params){

    const {navigate} = useNavigation();

    return (
        <Feather onPress={() => navigate(route)} name="arrow-left" color="#FFFFFF" size={32} />
    )
}