import React, { Component } from 'react';
import './App.css';
import Routes from './routes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Routes />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
