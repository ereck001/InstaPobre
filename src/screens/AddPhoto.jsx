import { useState } from "react"
import { connect } from "react-redux"
import { addPost } from '../store/actions/posts'
import { 
    Alert, 
    TouchableOpacity,
    ScrollView,
    View,
    StyleSheet,
    Text,
    TextInput,
    Image,
    Dimensions, 
    Platform
} from "react-native"
//import ImagePicker from 'react-native-image-picker'
import * as ImagePicker from 'expo-image-picker'
import { useEffect, useRef } from "react"

const AddPhoto = props => {
    const [image, setImage] = useState(null)
    const [comment, setComment] = useState('')
    const prevProps = useRef(props)

    useEffect(() =>{
        const prevPropsValue = prevProps.current
        if (prevPropsValue.loading && !props.loading){
            setImage(null)
            setComment('')
            props.navigation.navigate('Home')
        }
        
    },[props])

    const pickImage = () => {
        Alert.alert('Escolha de imagem',
            'Tipo de seleção',
            [
                {
                    text: 'Abrir camera',
                    onPress: pickImageFromCamera
                },
                {
                    text: 'Abrir galeria',
                    onPress: pickImageFromGallery
                }
            ],{
                cancelable:true
            }
        )}

    const pickImageFromCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
          })
        if (!result.canceled) {
            
            setImage({
                uri: result.assets[0].uri,
                base64: result.assets[0].base64
            });
        }
    }

    const  pickImageFromGallery = async () =>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
          })
        if (!result.canceled) {
            setImage({
                uri: result.assets[0].uri,
                base64: result.assets[0].base64
            });
        }   
    }

    const save = async () => {        
        props.onAddPost({
            id: Math.random(),
            nickname: props.name,
            email: props.email,
            image,
            comments:comment.trim() !== ''? 
            [{
                nickname: props.name,
                comment
            }] :
            []
        })
        // setImage('')
        // setComment('')
        // props.navigation.navigate('Home')
    }

    return <>{props.name ? 
        <ScrollView>
            <View style={[styles.container, 
                {marginTop: Platform.OS === 'ios' ? 60 : 40}]}
            >
                <Text style={styles.title}>
                    Compartilhe sua foto
                </Text>
            
            <View style={styles.imageContainer}>
                <Image source={image} style={styles.image}/>
            </View>
            <TouchableOpacity 
                onPress={pickImage} 
                style={styles.buttom}            
            >
                <Text style={styles.buttomText}>
                    Escolha a foto
                </Text>
            </TouchableOpacity>
            <TextInput 
                value={comment}
                onChangeText={comment => setComment(comment)}
                placeholder="Comentários..."
                style={styles.input}            
            />
            <TouchableOpacity                 
                onPress={save}
                disabled={props.loading}
                style={[styles.buttom, 
                    props.loading ? styles.buttomDisabled : null
                ]} 
            > 
                <Text style={styles.buttomText}>Salvar</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
    :
    <View style={[
        styles.container, 
        {justifyContent:'center'}]}
    >
        <Text style={styles.alternativeText}>Faça Login para postar</Text>
    </View>
    }
    </>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',        
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    imageContainer: {
        width: '90%',
        height: Dimensions.get('window').width / 2,
        backgroundColor: '#EEE',
        marginTop: 10
    },
    image: {
        width: '100%',
        height: Dimensions.get('window').width / 2,
        resizeMode: 'center'
    },
    buttom: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4',
        width: '42%'
        
    },
    buttomText: {
        fontSize: 20,
        color: '#FFF',
        textAlign:'center'
    },
    input: {
        marginTop: 20,
        width: '90%'
    },
    buttonDisabled: {
        backgroundColor: '#AAA'
    },
    alternativeText: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    buttomDisabled:{
        backgroundColor: '#AAA'
    }
})

const mapStateToProps = ({user, posts}) => {
    return {
        email: user.email,
        name: user.email,
        loading: posts.isUploading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPost: post => dispatch(addPost(post))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddPhoto)