import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './app.routes'

export function Routes(){
    return (
        <View style={styles.container}>
            <NavigationContainer>
                <AppRoutes />
            </NavigationContainer>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#009688',
        flex: 1,
    }
})