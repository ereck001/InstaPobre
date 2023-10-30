import { 
    Platform, 
    Text, 
    View, 
    Image, 
    StyleSheet  
} from "react-native"
import icon from '../../assets/imgs/icon.png'
import { useFonts } from "expo-font"
import { connect } from 'react-redux'
import { Gravatar } from "react-native-gravatar"

const Header = props =>{
    const name = props.name || 'unregistered'
    const [fontsLoaded] = useFonts({
        'shelter': require('../../assets/fonts/shelter.otf'),
      });   

      if (!fontsLoaded) {
        return null;
      }
    
    return <View style={styles.container}>
        <View style={styles.rowContainer}>
            <Image source={icon} style={styles.image} />
            <Text style={styles.title}>InstaPobre</Text>
        </View>
        <View style={styles.userContainer}>
            <Text style={styles.user}>{name}</Text>
                {   
                    props.email ?
                    <Gravatar 
                        options={{
                            email: props.email,
                            secure: true    
                        }}
                        style={styles.avatar}        
                    /> :
                    false
                }        
        </View>
    </View>
}


const styles = StyleSheet.create({
    container:{        
        height: 80,
        width: '100%',
        backgroundColor:  '#f5fcff',
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomWidth: 1,
        borderColor: '#bbb'
    },
    rowContainer:{
        height:60,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Platform.OS === 'ios' ? 40 : 20,        
        padding: 10,
        
    },
    image:{
        height:30,
        width:30,
        resizeMode: 'contain'
    },
    title:{
        height:30,
        color: '#000',
        fontFamily: 'shelter',
        fontSize: 28
    },
    avatar:{
    },
    userContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:15
    },
    user:{
        fontSize: 10,
        color: '#888',
        margin: 8
    },
    avatar:{
        height: 30,
        width:30,
        margin:10,
        borderRadius:15
    }
})

const mapStateToProps = ({ user }) => {
    return {
        name: user.name,
        email: user.email
    }
}
export default connect(mapStateToProps)(Header)