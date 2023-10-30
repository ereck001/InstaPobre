import { Component } from 'react'
import Navigator from './Navigator'
import { connect } from 'react-redux'
import axios from 'axios'
import { setMessage } from './store/actions/message'
import { Alert } from 'react-native'

axios.defaults.baseURL = 'https://insta-pobre-default-rtdb.firebaseio.com/'

class App extends Component {

    componentDidUpdate = () => {
        if (this.props.text && this.props.text.toString().trim()) {
            Alert.alert(this.props.title.trim() || 'Mensagem', 
                this.props.text.toString())
            this.props.clearMessage()
        }
    }

    render() {
        return <Navigator />
    }
}

const mapStateToProps = ({ message }) => {
    return {
        title: message.title,
        text: message.text
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clearMessage: () => dispatch(setMessage({
            title: '',
            text: ''
        }))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
