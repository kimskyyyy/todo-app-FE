import React from 'react'; // 리액트 사용을 위한 import
import ReactDOM from 'react-dom/client'; // 리액트 DOM 사용을 위한 import
import './index.css';
import AppRouter from './AppRouter';
import reportWebVitals from './reportWebVitals';

// ReactDOM이 내부 컴포넌트들을 root 엘리먼트에 render 함
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
