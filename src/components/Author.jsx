import { View, Text, StyleSheet } from "react-native"
import { Gravatar } from 'react-native-gravatar'

export default props => {
    
    const email = props.email

    return <View style={styles.container}>
        <Gravatar options={{
              email: `${email}`,
              secure: true}}
              style={styles.avatar}
        />
        <Text style={styles.nickname}>{props.nickname}</Text>
    </View>
}

const styles = StyleSheet.create({
    container:{       
        flexDirection: 'row',
        alignItems: 'center',               
    },
    avatar:{
        width: 30,
        height: 30,
        borderRadius:15,
        marginHorizontal: 10
    },
    nickname:{
        color: '#444',
        marginVertical:10,
        fontSize: 15
    }
})