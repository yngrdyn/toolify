import React from 'react';
import { render } from 'react-dom';

import ExportImport from './Export-import';
import './index.css';

render(<ExportImport />, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
