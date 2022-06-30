import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { DataProvider } from './components/context/context';
import { MessageContext, MessageProvider } from './components/context/message';
import { UserProvider } from './components/context/user';

ReactDOM.render(
	<BrowserRouter>
		<MessageProvider>
			<UserProvider>
				<DataProvider>
					<App />
				</DataProvider>
			</UserProvider>
		</MessageProvider>
	</BrowserRouter>,
	document.getElementById('root')
);
