import { useState, useRef, useEffect } from "react"
import { TextInput } from "react-native"
import { connect } from 'react-redux'
import { login } from '../store/actions/user'
import {
    TouchableOpacity, 
    View,
    StyleSheet,
    Text
} from "react-native"

const Login = props => {
    const name = ''
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const prevProps = useRef(props)

    useEffect(() =>{
        const prevPropsValue = prevProps.current
        if (prevPropsValue.loading && !props.loading){
            props.navigation.navigate('Profile')
        }
    },[props])

    if(props.name)
        props.navigation.navigate('Profile')

    function login(){
        props.onLogin({
            name,
            email,
            password
        })
        props.navigation.navigate('Profile')
    }

    return <View style={styles.container}>
        <TextInput 
            placeholder="E-mail"
            style={styles.input}
            autoFocus={true}
            keyboardType="email-address"
            value={email}
            onChangeText={x => setEmail(x)}
        />
        <TextInput 
            placeholder="Senha"
            style={styles.input}
            secureTextEntry={true}
            value={password}
            onChangeText={x => setPassword(x)}
        />
        <TouchableOpacity onPress={login}
            style={styles.buttom}
        >
            <Text style={styles.buttomText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
                props.navigation.navigate('Register')
            }}
            style={styles.buttom}
        >
            <Text style={styles.buttomText}>Criar nova conta...</Text>
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent:'center'
    },
    buttom:{
        marginTop: 30,
        padding:10,
        backgroundColor: '#4286f4'
    },
    input:{
        marginTop:20,
        height: 40,
        width:'90%',
        backgroundColor: '#eee',
        borderWidth: 1,
        borderColor: '#333',
        padding:8
    },    
    buttomText:{
        fontSize: 20,
        color: '#fff'
    }
})

const mapStateToProps = ({ user }) => {
    return {
        loading: user.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: user => dispatch(login(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)