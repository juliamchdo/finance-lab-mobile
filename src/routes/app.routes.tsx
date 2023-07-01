import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home'
import { NewLancamento } from '../screens/NewLancamento';
import { LancamentosInfo } from '../screens/LancamentosInfo';

//Navigator -> cria o escopo da rota
//Screen -> define para onde a rota vai levar
const { Navigator, Screen } = createNativeStackNavigator();
interface Params{
    item:{
        id: String
    }
}
export function AppRoutes({item} : Params){

    return(
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="home" component={Home}/>
            <Screen name="new" component={NewLancamento}/>
            <Screen name="info" component={LancamentosInfo}/>
        </Navigator>
    )
}