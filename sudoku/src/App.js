import React from 'react';
import './App.css';
import SudokuGame from './component/SudokuGame';
import "bootstrap/dist/css/bootstrap.min.css"
import { ConfigProvider } from 'antd';

function App() {
  return (
    <ConfigProvider>
      <div className="App">
        <SudokuGame />
      </div>
    </ConfigProvider>
  );
}

export default App;
