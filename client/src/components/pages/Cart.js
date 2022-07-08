import { useContext, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { UserContext } from '../context/user';
import { CartContext } from '../context/cart';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Error, FormField, Button } from '../../styles';


const Cart = ({onRemove, onAdd, products }) => {
	const [errors, setErrors] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const history = useHistory();
	const { user } = useContext(UserContext);
	const [value, setValue] = useState('');
	const { cart, setCart } = useContext(CartContext)


	const eventOption = user?.hosted_events?.map((hevent) => [
		<Dropdown.Item key={hevent.id} eventKey={hevent.id} value={hevent}>
			{hevent.name}
		</Dropdown.Item>,
	]);

	const handleSelect = (e) => {
		setValue(e);
	};

	const handleClick = () => {
		history.push('/products');
	};

	const reduceQuantity = (proc) => {
		const newQuantity = proc.item_quantity - 1 

		fetch(`/api/cart_products/${proc.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				product_id: proc.id,
				user_id: user.id,
				quantity: newQuantity
			})
		}).then((r) => {
			if (r.ok) {
				r.json().then((cart_products) => setCart(cart_products))
			}
			else {
				r.json().then((err) => setErrors(err.errors))
			}
		})
	}


	function handleCheckout() {
		debugger
		fetch('/api/checkout', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				order: {
				// user_id: user.id,
				event_id: value,
				cart_product_id: cart.id
				}
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
						<div className='proc-detail' style={{width: "760px", height: "200px"}}>
							<div className='row'>
								<h2>{proc?.name}</h2>
								<span>${proc?.price}</span>
							</div>
							<p>{proc?.description}</p>
							<br />
							<div className='amount'>
								<button
									className='btn'
									onClick={() => reduceQuantity(proc)}
								>
									{' '}
									-{' '}
								</button>
								<span style={{fontWeight: "14px", margin: "5px"}}>{proc?.item_quantity}</span>
								<button
									className='btn'
									onClick={() => onAdd(proc)}
								>
									{' '}
									+{' '}
								</button>
								<span> Item Subtotal: ${proc?.item_total}</span>
							</div>
						</div>
						<button className='btn'
							onClick={() => onRemove(proc.id)}
							> X
						</button>
					</div>
				);
			})}
			<div className='total'>
				{cart?.length !== 0 && (
					<>
						<form onSubmit={handleCheckout}>
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
							<FormField>
								{errors?.map((err) => (
									<Error key={err}>{err}</Error>
								))}
							</FormField>
							<div className='buttons'>
								<Button color='primary' type='submit'>
									{isLoading ? 'Loading...' : 'CHECK OUT'}
								</Button>
								<Button className='ms-2'
									color='primary'
									onClick={handleClick}
								>
									CONTINUE SHOPPING
								</Button>
							</div>
						</form>
					</>
				)}
			</div>
		</section>
	);
};

export default Cart;
