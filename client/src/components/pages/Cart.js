import { useContext, useState, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { UserContext } from '../context/user';
import { CartContext } from '../context/cart';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Error, FormField, Button, Label, Input } from '../../styles';
import emailjs from '@emailjs/browser';
import { MessageContext } from '../context/message';

const Cart = ({ onRemove, onAdd, products }) => {
	const [errors, setErrors] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const history = useHistory();
	const { user } = useContext(UserContext);
	const [value, setValue] = useState('');
	const { cart, setCart } = useContext(CartContext);
	const { setMessage } = useContext(MessageContext)
	const form = useRef();

	const eventOption = user?.hosted_events?.map((hevent) => [
		<Dropdown.Item key={hevent.id} eventKey={hevent.id} value={hevent}>
			{hevent.name}
		</Dropdown.Item>,
	]);

	const handleSelect = (e) => {
		setValue(Number(e));
	};

	const handleClick = () => {
		history.push('/products');
	};

	console.log(value)

	const reduceQuantity = (proc) => {
		const newQuantity = proc.item_quantity - 1;

		fetch(`/api/cart_products/${proc.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				product_id: proc.id,
				user_id: user.id,
				quantity: newQuantity,
			}),
		}).then((r) => {
			if (r.ok) {
				r.json().then((cart_products) => setCart(cart_products));
			} else {
				r.json().then((err) => setErrors(err.errors));
			}
		});
	};
	const sendEmail = (e) => {
		e.preventDefault();

		emailjs
			.sendForm(
				process.env.REACT_APP_EMAILJS_SERVICE_ID,
				process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
				form.current,
				process.env.REACT_APP_EMAILJS_PUBLIC_KEY
			)
			.then(
				(result) => {
					console.log(result.text);
					setMessage({ message: `Order confirmed. Order confirmation was sent to ${user?.email}`, color: 'green' });
				},
				(error) => {
					console.log(error.text);
				}
			);
	};

	function handleCheckout() {
		debugger
		fetch('/api/checkout', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				user_id: user.id,
				event_id: value
			}),
		}).then((r) => {
			setIsLoading(false);
			if (r.ok) {
				setCart([]);
			} else {
				r.json().then((err) => setErrors(err.errors));
			}
		});
	}

	return (
		<section className='card details'>
			<div className='text '>
				{cart?.length === 0 && (
					<h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
						Your Shopping Cart Is Empty
					</h2>
				)}
			</div>
			{cart?.map((product) => {
				const proc = products.find((item) => item.id === product.product_id);
				return (
					<div className='details' key={proc?.id}>
						<img
							style={{ width: '200px', height: '200px' }}
							src={proc?.image_url}
							alt={proc?.name}
						/>
						<div
							className='proc-detail'
							style={{ width: '760px', height: '200px' }}
						>
							<div className='row'>
								<h2>{proc?.name}</h2>
								<span>${proc?.price}</span>
							</div>
							<p>{proc?.description}</p>
							<br />
							<div className='amount'>
								<button className='btn' onClick={() => reduceQuantity(proc)}>
									{' '}
									-{' '}
								</button>
								<span style={{ fontWeight: '14px', margin: '5px' }}>
									{proc?.item_quantity}
								</span>
								<button className='btn' onClick={() => onAdd(proc)}>
									{' '}
									+{' '}
								</button>
								<span> Item Subtotal: ${proc?.item_total}</span>
							</div>.
						</div>
						<button className='btn' onClick={() => onRemove(proc.id)}>
							{' '}
							X
						</button>
					</div>
				);
			})}
			<div className='total'>
				{cart?.length !== 0 && (
					<>
						{/* <form ref={form} onSubmit={sendEmail}> */}
						<form>
							<FormField>
							<DropdownButton
								title='Event List'
								id='dropdown-menu-align-right'
								onSelect={handleSelect}
							>
								{eventOption}
								<Dropdown.Divider />
								<Dropdown.Item as={Link} to='/event/new'>
									New Event
								</Dropdown.Item>
							</DropdownButton>
							</FormField>
							<FormField>
								<Label>Name</Label>
								<Input type='text' name='user_name' value={user?.username}/>
							</FormField>
							<FormField>
								<Label>Email</Label>
								<Input type='email' name='user_email' value={user?.email}/>
							</FormField>
							<FormField>
								{errors?.map((err) => (
									<Error key={err}>{err}</Error>
								))}
							</FormField>
							<Button color='primary' type='submit' onClick={handleCheckout}>
								{isLoading ? 'Loading...' : 'CHECK OUT'}
							</Button>
						</form>
					
						<Button className='mt-3' color='primary' onClick={handleClick}>
							CONTINUE SHOPPING
						</Button>
					</>
				)}
			</div>
		</section>
	);
};

export default Cart;
