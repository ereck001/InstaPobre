import { 
    USER_LOGGED, 
    USER_UNLOGGED,
    LOADING_USER,
    USER_LOADED
 } from "./actionTypes"
import axios from "axios"
import { setMessage } from "./message"

const authBaseUrl = 'https://identitytoolkit.googleapis.com/v1'
const API_KEY = 'AIzaSyAe3qVZqqW5o3bOPsvEK1GGdHnEt1kgvLI'

export function userLogged(user){
    return {
        type: USER_LOGGED,
        payload: user
    }
}

export function logout(){
    return {
        type: USER_UNLOGGED
    }
}

export function createUser(user){
    let localId
    return dispatch =>{
        axios.post(`${authBaseUrl}/accounts:signUp?key=${API_KEY}`,{
            email: user.email,
            password: user.password,
            returnSecureToken: true
        })
        .catch(err => dispatch(setMessage({
            title: 'Erro',
            text: err
        }))
        )
        .then( res => {  
            //console.log(res.data)                      
            if (res.data.localId){
                localId = res.data.localId  

                console.log(user)
                          
                axios.put(`/user/${localId}.json`, {
                    name: user.name
                })
                .catch(err => dispatch(setMessage({
                    title: 'Erro',
                    text: err
                })))
                .then(() => {
                    dispatch(login(user))
                })
            }
        })
    }
}
export function loadingUser(){
    return {
        type: LOADING_USER
    }
}
export function userLoaded(){
    return {
        type: USER_LOADED
    }
}

export function login(user){
    return dispatch => {
        console.log('LOGIN')
        dispatch(loadingUser())
        axios.post(`${authBaseUrl}/accounts:signInWithPassword?key=${API_KEY}`,{
            email: user.email,
            password: user.password,
            returnSecureToken: true
        })
        .catch(err => console.log(err))
        .then(res =>{
            if (res.data.localId){
                user.token = res.data.idToken
                axios.get(`/user/${res.data.localId}.json`)
                    .catch(err => dispatch(setMessage({
                        title: 'Erro',
                        text: err
                    })))
                    .then(res =>{
                        delete user.password 
                        user.name = res.data.name ? res.data.name : ''
                        dispatch(userLogged(user))
                        dispatch(userLoaded())
                    })
            }
        })
        
    }
}