import Icon from 'react-native-vector-icons/FontAwesome'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Feed from './screens/Feed'
import AddPhoto from './screens/AddPhoto'
import Profile from './screens/Profile'
import Login from './screens/Login'
import Register from './screens/Register'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const LoginOrProfileRouter = () => <Stack.Navigator
    initialRouteName='Auth'
    screenOptions={{headerShown: false}}
>
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="Auth" component={Login} />
    <Stack.Screen name="Register" component={Register} />
</Stack.Navigator>

export default props => <NavigationContainer>
    <Tab.Navigator
        initialRouteName='Home'
        screenOptions={
            {                             
                headerShown:false ,
                tabBarShowLabel:false,
                tabBarStyle:{ height: 60 }
            }}

    >
        <Tab.Screen 
            name='Home' 
            component={Feed}
            options={{ 
                title: 'Feed',
                // tabBarIcon: ({tintColor}) => <Icon 
                //     name='home' size={30} color={tintColor} 
                // />
                tabBarIcon: (x) => {
                    if (x.focused)
                        x.tintColor = '#000'
                    else
                        x.tintColor = '#666'
                    return <Icon 
                        name='home' size={30} color={x.tintColor}
                    />
                }
            }}
        />
        <Tab.Screen 
            name='AddPhoto' 
            component={AddPhoto}
            options={{ 
                title: 'Add Pic',
                tabBarIcon: (x) => {
                    if (x.focused)
                        x.tintColor = '#000'
                    else
                        x.tintColor = '#666'
                    return <Icon 
                        name='camera' size={30} color={x.tintColor}
                    />
                }
            }}
        />
        <Tab.Screen 
            name='LoginOrProfile' 
            component={LoginOrProfileRouter}
            options={{                 
                title: 'Profile',
                tabBarIcon: (x) => {
                    if (x.focused)
                        x.tintColor = '#000'
                    else
                        x.tintColor = '#666'
                    return <Icon 
                        name='user' size={30} color={x.tintColor}
                    />
                }
            }}
        />
    </Tab.Navigator>
</NavigationContainer> 