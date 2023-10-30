import { useState, useRef, useEffect } from "react"
import { 
    Text,
    View, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity 
} from "react-native"
import { connect } from "react-redux"
import { createUser } from "../store/actions/user"


const Register =  props => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const prevProps = useRef(props)

    useEffect(() =>{
        const prevPropsValue = prevProps.current
        if (prevPropsValue.loading && !props.loading){
            setName('')
            setEmail('')
            setPassword('')
            props.navigation.navigate('Profile')
        }
    },[props])

    return <View style={styles.container}>
        <TextInput 
            style={styles.input}
            placeholder="Nome"
            autoFocus={true}
            value={name}
            onChangeText={x => setName(x)}
        />
        <TextInput 
            style={styles.input}
            placeholder="E-mail"
            keyboardType="email-address"
            value={email}
            onChangeText={x => setEmail(x)}
        />
        <TextInput 
            style={styles.input}
            placeholder="Senha"
            value={password}
            onChangeText={x => setPassword(x)}
        />
        <TouchableOpacity
            onPress={() => {
                props.onCreateUser({
                    name,
                    email,
                    password
                })
            }}
            style={styles.buttom}
        >
            <Text style={styles.buttomText}>Salvar</Text>
        </TouchableOpacity>
    </View>
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent:'center'
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
    buttom:{
        marginTop: 30,
        padding:10,
        backgroundColor: '#4286f4'
    },
    buttomText:{
        fontSize: 20,
        color: '#fff'
    }
})

const mapDispatchToProps = dispatch => {
    return {
        onCreateUser: user => dispatch(createUser(user))
    }
}
export default connect(null, mapDispatchToProps)(Register)