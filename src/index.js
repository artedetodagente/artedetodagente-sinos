import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './styles.css'
import 'swiper/swiper.scss'

import { Worker } from '@phuocng/react-pdf-viewer';

ReactDOM.render(
  <React.StrictMode>
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
      <App />
    </Worker>
  </React.StrictMode>,
  document.getElementById('root')
)
