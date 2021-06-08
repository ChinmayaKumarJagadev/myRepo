import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios'
import registerServiceWorker from './registerServiceWorker';


// axios.interceptors.request.use((request=>{
//     console.log(request)
//     request.headers.channelName= "raju"
//     return request;
// }))

// axios.interceptors.response.use((response) =>{
//     console.log(response)
//      return response
// })

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
