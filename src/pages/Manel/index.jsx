import React from 'react';
import { render } from 'react-dom';

import Test from './manel';
import './index.css';

render(<Test />, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
