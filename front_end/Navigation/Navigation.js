import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Homescreen from '../Src/screens/Home/index'
import RetailSignUp from '../Src/screens/RetailSignUp/index'
import SignIn from '../Src/screens/SignIn/index'
import SignUp from '../Src/screens/SignUp/index'
import UserSignUp from '../Src/screens/UserSignUp/index'
import UserMainScreen from '../Src/screens/UserScreen/MainScreen/index'
import Chart from '../Src/screens/ChartCom/index'
import UserSignIn from '../Src/screens/UserSignIn/index'
import RetailSignIn from '../Src/screens/RetailSignIn/index'
import CarteC from '../Src/Components/Carte_covid.react'


const SearchStackNavigator = createStackNavigator({
    Homescreen : {
        screen : Homescreen,
        navigationOptions : {
            headerShown : false
        }
    },
    SignIn : {
        screen : SignIn,
        navigationOptions : {
            headerShown : false
        }
    },
    SignUp : {
        screen : SignUp,
        navigationOptions : {
            headerShown : false
        }
    },
    UserSignUp : {
        screen : UserSignUp,
        navigationOptions : {
            headerShown : false
        }
    },
    RetailSignUp : {
        screen : RetailSignUp,
        navigationOptions : {
            headerShown : false
        }
    },
    UserMainScreen : {
        screen : UserMainScreen,
        navigationOptions : {
            headerShown : false
        }
    },
    Chart : {
        screen : Chart,
        navigationOptions : {
            headerShown : false
        }
    },
    UserSignIn : {
        screen : UserSignIn,
        navigationOptions : {
            headerShown : false
        }
    },
    RetailSignIn : {
        screen : RetailSignIn,
        navigationOptions : {
            headerShown : false
        }
    },
    CarteC : {
        screen : CarteC,
        navigationOptions : {
            headerShown : false
        }
    }




})

export default createAppContainer(SearchStackNavigator)