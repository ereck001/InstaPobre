import Header from '../components/Header'
import { FlatList, StyleSheet, View } from 'react-native'
import Post from '../components/Post'
import { connect } from 'react-redux'
import { fetchPosts } from '../store/actions/posts'
import { useEffect } from 'react'

const Feed = props => {  

    useEffect(()=>{
        props.onFetchPost()
    },[])
    
    return <View style={styles.container}>
        <Header />
        <FlatList 
            data={props.posts}
            keyExtractor={ item => `${item.id}`}
            renderItem={
                ({item}) => <Post key={item.id} {...item}/>
            }
        />
    </View>
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:  '#f5fcff'
    }
})

const mapStateToProps =({ posts }) => {
    return {
        posts: posts.posts
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchPost: () => dispatch(fetchPosts())
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(Feed)