import App from "./src/App"
import storeConfig from './src/store/storeConfig'
import { Provider } from 'react-redux'

export default () => {
    const store = storeConfig()
    const Redux = () => <Provider store={store}>
        <App />
    </Provider>

  return Redux()
}