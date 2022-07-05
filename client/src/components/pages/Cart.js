import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/user';

const Cart = ({ cart, setCart, addToCart, removeFromCart, products }) => {
	const [errors, setErrors] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const history = useHistory();
	const { user } = useContext(UserContext);

	const handleClick = () => {
		history.push('/products');
	};

	const handleCheckout = () => {
		fetch('/api/checkout', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				user_id: user.id,
			}),
		}).then((r) => {
			setIsLoading(false);
			if (r.ok) {
				setCart([]);
			} else {
				r.json().then((err) => setErrors(err.errors));
			}
		});
	};

	console.log(cart);
	return (
		<section className='container'>
			<div className='text '>
				{cart?.length === 0 && (
					<h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
						Your Shopping Cart Is Empty
					</h2>
				)}
			</div>
			{cart.map((product) => {
        const proc = products.find(item => item.id === product.product_id)
        console.log(proc)
        return (
				<div className='details cart' key={proc.id}>
					<img src={proc.image_url} alt={proc.name} />
					<div className='box'>
						<div className='row'>
							<h2>{proc.name}</h2>
							<span>${proc.price}</span>
						</div>
						<p>{proc.description}</p>
						<div className='amount'>
							<button className='count' onClick={() => removeFromCart(proc)}>
								{' '}
								-{' '}
							</button>
							<span>{proc.quantity}</span>
							<button className='count' onClick={() => addToCart(proc)}>
								{' '}
								+{' '}
							</button>
						</div>
					</div>
				</div>
        )
      })}
			<div className='total'>
				{cart.length !== 0 && (
					<>
						{/* <h3>Total: ${itemsAmount.toFixed(2)}</h3> */}
						<button
							className='btn btn-outline-dark mb-4'
							onClick={handleCheckout}
						>
							CHECK OUT
						</button>
						<button className='btn btn-outline-dark mb-4' onClick={handleClick}>
							CONTINUE SHOPPING
						</button>
					</>
				)}
			</div>
		</section>
	);
};

export default Cart;
