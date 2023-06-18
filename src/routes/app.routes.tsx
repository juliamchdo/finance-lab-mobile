import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home'
import { NewLancamento } from '../screens/NewLancamento';

//Navigator -> cria o escopo da rota
//Screen -> define para onde a rota vai levar
const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes(){
    
    return(
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="home" component={Home}/>
            <Screen name="new" component={NewLancamento}/>
        </Navigator>
    )
}