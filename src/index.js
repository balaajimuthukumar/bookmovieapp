import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import registerServiceWorker from './registerServiceWorker';
import Controller from './screens/Controller';
import Header from './common/header/Header';
import {Fragment} from 'react'

ReactDOM.render(<Fragment>
    <Header/>
    <Controller />
    </Fragment>, document.getElementById('root'));
registerServiceWorker();
