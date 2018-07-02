import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import './app.css'

import Header from './header/header'

class App extends Component {
  componentDidMount(){
    alert('finish authentication with saved link, then create db for socket management')
    const socket = new WebSocket('ws://localhost:7000');
    socket.addEventListener('open', (e) => {
			socket.send('sending from client', function(err) {
				if(err){
					console.log('Error: ',  err);
				}
				console.log('Send message');
			});
		});

		socket.addEventListener('message', (newMsg) => {
			console.log(newMsg);
		});
  }
  render() {
    return (
      <BrowserRouter>
        <Route path='/' component={Header} />
      </BrowserRouter>
    );
  }
}

export default App;
