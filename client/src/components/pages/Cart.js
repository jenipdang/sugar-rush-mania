import React from 'react';
import { useGlobalContext } from '../context/context';
import './cart.css';
import '../products/details.css'
import { useHistory } from 'react-router-dom';


const Cart = () => {
	const { setCart, cart, addItem, removeItem } = useGlobalContext();
	const itemsAmount = cart.reduce((a, c) => a + c.amount * c.qty, 0);

	const history = useHistory();

	const handleClick = () => {
		history.push('/products');
	};

	const handleCheckout = () => {
		alert('Order Confirmed. Thank you for shopping with us!')
		setCart([])
	};

	return (
		<section className="container">
			<div className="text ">
				{cart.length === 0 && (
					<h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
						Your Shopping Cart Is Empty
					</h2>
				)}
			</div>
			{cart.map((item, index) => (
				<div className="details cart" key={index}>
					<img src={item.images.front} alt={item.name} />
					<div className="box">
						<div className="row">
							<h2>{item.name}</h2>
							<span>${item.amount}</span>
						</div>
						<p>{item.description}</p>
						<div className="amount">
							<button className="count" onClick={() => removeItem(item)}>
								{' '}
								-{' '}
							</button>
							<span>{item.qty}</span>
							<button className="count" onClick={() => addItem(item)}>
								{' '}
								+{' '}
							</button>
						</div>
					</div>
				</div>
			))}
			<div className="total">
				{cart.length !== 0 && (
					<>
						<h3>Total: ${itemsAmount.toFixed(2)}</h3>
						<button
							className="btn btn-outline-dark mb-4"
							onClick={handleCheckout}
						>
							CHECK OUT
						</button>
						<button className="btn btn-outline-dark mb-4" onClick={handleClick}>
							CONTINUE SHOPPING
						</button>
					</>
				)}
			</div>
		</section>
	);
};

export default Cart;