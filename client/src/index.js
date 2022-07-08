import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './components/context/user';
import { MessageProvider } from './components/context/message';
import { CartProvider } from './components/context/cart'


ReactDOM.render(
	<BrowserRouter>
		<MessageProvider>
				<UserProvider>
					<CartProvider>
					 <App />
					</CartProvider>
				</UserProvider>
		</MessageProvider>
	</BrowserRouter>,
	document.getElementById('root')
);
