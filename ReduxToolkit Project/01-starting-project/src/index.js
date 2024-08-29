import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import generalStore from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={generalStore}> <App /> </Provider> );
