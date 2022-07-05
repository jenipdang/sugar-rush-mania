import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { MessageProvider } from './components/context/message';
import { UserProvider } from './components/context/user';

ReactDOM.render(
	<BrowserRouter>
		<MessageProvider>
			<UserProvider>
				<App />
			</UserProvider>
		</MessageProvider>
	</BrowserRouter>,
	document.getElementById('root')
);
