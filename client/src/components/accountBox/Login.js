import React, { useState } from 'react';
import styled from 'styled-components';
import { LoginForm } from './LoginForm';
import { motion } from 'framer-motion/dist/framer-motion';
import { AccountContext } from './accountContext';
import { SignupForm } from './SignUpForm';

const AccountContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BoxContainer = styled.div`
	width: 280px;
	min-height: 550px;
	display: flex;
	flex-direction: column;
	border-radius: 19px;
	background-color: #fff;
	box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
	position: relative;
	overflow: hidden;
`;

const TopContainer = styled.div`
	width: 100%;
	height: 250px;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	padding: 0 1.8em;
	padding-bottom: 5em;
`;

const BackDrop = styled(motion.div)`
	width: 160%;
	height: 550px;
	position: absolute;
	display: flex;
	flex-direction: column;
	border-radius: 50%;
	transform: rotate(60deg);
	top: -290px;
	left: -70px;
	background: #EECDA3;  /* fallback for old browsers */
  	background: -webkit-linear-gradient(to right, #EF629F, #EECDA3);  /* Chrome 10-25, Safari 5.1-6 */
  	background: linear-gradient(to right, #EF629F, #EECDA3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const HeaderContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const HeaderText = styled.h2`
	font-size: 30px;
	font-weight: 600;
	line-height: 1.24;
	color: #fff;
	z-index: 10;
	margin: 0;
`;

const SmallText = styled.h5`
	color: #fff;
	font-weight: 500;
	font-size: 11px;
	z-index: 10;
	margin: 0;
	margin-top: 7px;
`;

const InnerContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 0 1.8em;
`;

const backdropVariants = {
	expanded: {
		width: '233%',
		height: '1050px',
		borderRadius: '20%',
		transform: 'rotate(60deg)',
	},
	collapsed: {
		width: '160%',
		height: '550px',
		borderRadius: '50%',
		transform: 'rotate(60deg)',
	},
};

const expandingTransition = {
	type: 'spring',
	duration: 2.3,
	stiffness: 30,
};

export function AccountBox(props, onLogin) {
	const [isExpanded, setExpanded] = useState(false);
	const [active, setActive] = useState('signin');

	const playExpandingAnimation = () => {
		setExpanded(true);
		setTimeout(() => {
			setExpanded(false);
		}, expandingTransition.duration * 1000 - 1500);
	};

	const switchToSignup = () => {
		playExpandingAnimation();
		setTimeout(() => {
			setActive('signup');
		}, 400);
	};

	const switchToSignin = () => {
		playExpandingAnimation();
		setTimeout(() => {
			setActive('signin');
		}, 400);
	};

	const contextValue = { switchToSignup, switchToSignin };

	return (
		<AccountContext.Provider value={contextValue}>
			<AccountContainer>
			<BoxContainer>
				<TopContainer>
					<BackDrop
						initial={false}
						animate={isExpanded ? 'expanded' : 'collapsed'}
						variants={backdropVariants}
						transition={expandingTransition}
					/>
					{active === 'signin' && (
						<HeaderContainer>
							<HeaderText>Sugar Rush</HeaderText>
							<HeaderText>Mania</HeaderText>
							<SmallText>Please sign-in to continue!</SmallText>
						</HeaderContainer>
					)}
					{active === 'signup' && (
						<HeaderContainer>
							<HeaderText>Create</HeaderText>
							<HeaderText>Account</HeaderText>
							<SmallText>Please sign-up to continue!</SmallText>
						</HeaderContainer>
					)}
				</TopContainer>
				<InnerContainer>
					{active === 'signin' && <LoginForm onLogin={onLogin} />}
					{active === 'signup' && <SignupForm onLogin={onLogin} />}
				</InnerContainer>
			</BoxContainer>
			</AccountContainer>
		</AccountContext.Provider>
	);
}
