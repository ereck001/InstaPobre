import { 
    ADD_COMMENT, 
    SET_POSTS,
    CREATING_POST,
    POSTS_CREATED
} from "./actionTypes"
import { setMessage } from './message'
import axios from "axios"

export function addPost(post){ 
    return dispatch  => {
        dispatch(creatingPost())   
        axios({
            url: 'uploadImage',
            baseURL: 'https://us-central1-insta-pobre.cloudfunctions.net',
            method: 'post',
            data: {
                image: post.image.base64
            }
        })
        .catch(err => dispatch(setMessage({
            title: 'Erro',
            text: err
        })))
        .then(res => {
            post.image = res.data.imageUrl
            axios.post('/posts.json', {...post})
                .catch(err => dispatch(setMessage({
                    title: 'Erro',
                    text: err
                })))
                .then(res => {
                    dispatch(fetchPosts())
                    dispatch(postCreated())
                    dispatch(setMessage({
                        title: 'Sucesso',
                        text: 'Novo post!'
                    }))
                })
        })
        
    }    
}
export function addComment(payload){
    return dispatch => {
        axios.get(`posts/${payload.postId}.json`)
            .catch( err => dispatch(setMessage({
                title: 'Erro',
                text: err
            })))
            .then(res => {
                const comments = res.data.comments || []
                comments.push(payload.comment)
                axios.patch(`posts/${payload.postId}.json`, { comments })
                    .catch( err => dispatch(setMessage({
                        title: 'Erro',
                        text: err
                    })))
                    .then(res => {
                        dispatch(fetchPosts())
                    })
            })
    } 
}

export function setPosts( posts ){
    return {
        type: SET_POSTS,
        payload: posts
    }
}

export function fetchPosts(){
    return dispatch => {
        axios.get('/posts.json')
            .catch(err => dispatch(setMessage({
                title: 'Erro',
                text: err
            })))
            .then(res => {
                const rawPosts = res.data
                const posts =[]
                for (let key in rawPosts){
                    posts.push({
                        ...rawPosts[key],
                        id: key
                    })
                }
                dispatch(setPosts(posts.reverse()))
            })
    }
}

export function creatingPost(){
    return {
        type: CREATING_POST
    }
}

export function postCreated(){
    return {
        type: POSTS_CREATED
    }
}