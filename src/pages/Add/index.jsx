import React from 'react';
import { render } from 'react-dom';

import Add from './Add';
import './index.css';

render(<Add />, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
