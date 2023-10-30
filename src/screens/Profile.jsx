import {
    TouchableOpacity, 
    View,
    StyleSheet,
    Text
} from "react-native"
import { connect } from "react-redux"
import { logout } from "../store/actions/user"
import { Gravatar } from "react-native-gravatar"

const Profile =  props => {
    const logout = () => {
        props.onLogout()
        props.navigation.navigate('Auth')
    }
    const options = {
        email: props.email,
        secure: true
    }
    return <View style={styles.container}>
        <Gravatar 
            options={options}
            style={styles.avatar}
        />
        <Text style={styles.nickname}>{props.name}</Text>
        <Text style={styles.email}>{props.email}</Text>
        <TouchableOpacity onPress={logout}
            style={styles.buttom}
        >
            <Text style={styles.buttomText}>Sair</Text>
        </TouchableOpacity>
    </View>
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    avatar:{
       width: 150,
       height: 150,
       borderRadius: 75,
       marginTop: 100
    },
    nickname:{  
        marginTop: 30,
        fontSize: 30,
        fontWeight: 'bold'  
    },
    email:{
        marginTop:20,
        fontSize: 25
    },
    buttom:{
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4'
    },
    buttomText:{
        fontSize: 20,
        color: '#fff'
    }
})

const mapStateToPops = ({ user }) => {
    return{
        email: user.email,
        name: user.name
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(logout())
    }
}

export default connect(mapStateToPops,mapDispatchToProps)(Profile)