import { useState } from "react"
import { connect } from "react-redux"
import { addComment } from "../store/actions/posts"
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Alert,
    TouchableWithoutFeedback as TWF
} from "react-native"

import Icon from 'react-native-vector-icons/FontAwesome'

const AddComment = props => {
    const [comment, setComment] = useState('')
    const [editMode, setEditMode] = useState(false)
    let commentArea

    handleAddComment = () => {
        if (comment.trim() === '')
            return

        props.onAddComment({
            postId: props.postId,
            comment: {
                nickname: props.name,
                comment
            }            
        })
        setEditMode(false)
    }
    if (editMode) {
        commentArea = (
            <View style={styles.container}>
                <TextInput
                    placeholder="Comentar..."
                    style={styles.input}
                    autoFocus={true}
                    value={comment}
                    onChangeText={comment => setComment(comment)}
                    onSubmitEditing={handleAddComment}
                />
                <TWF onPress={() => setEditMode(false)}>
                    <Icon name='times' size={20} color='#555' />
                </TWF>
            </View>
        )
    }else{
        commentArea = <View style={styles.container}>
            <TWF onPress={
                () => props.name ? setEditMode(true) : Alert.alert('Faça Login para comentar') 
            }>
                <Icon name='comment-o' size={20} color='#555'/>                
            </TWF>  
            <Text style={styles.caption}>Adicione um comentário...</Text>  
        </View>
    }
    return <View style={{flex: 1}}>
        {commentArea}
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',   
        marginTop: 10,
        padding: 10,
        //backgroundColor: 'orange'
    },
    caption: {
        marginLeft: 10,
        fontSize: 12,
        color: '#ccc'
    },
    input: {
        width: '90%'
    }
})

const mapStateToProps = ({user}) => {
    return {
        name: user.name
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddComment: comment => dispatch(addComment(comment))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddComment)