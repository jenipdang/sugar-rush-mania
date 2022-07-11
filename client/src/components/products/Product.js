import { useLocation, useParams, Link, useHistory } from 'react-router-dom';
// import { Card } from 'semantic-ui-react';
import { useContext, useEffect, useState } from 'react';
import NewReview from '../reviews/NewReview';
import ReviewsList from '../reviews/ReviewsList';
import EditProduct from '../products/EditProduct';
import './products.css';
import './details.css';
import { MessageContext } from '../context/message';
import { UserContext } from '../context/user';
import { MdOutlineExpandMore, MdOutlineExpandLess } from 'react-icons/md';

const Product = ({ product, onAdd, isLoading }) => {
	const [productObj, setProductObj] = useState(null);
	const [reviews, setReviews] = useState([]);
	const [isEditing, setIsEditing] = useState(false);
	const { productId } = useParams();
	const location = useLocation();
	const history = useHistory();
	const { setMessage } = useContext(MessageContext);
	const { user } = useContext(UserContext);
	const [show, setShow] = useState(true);

	useEffect(() => {
		if (!product) {
			fetch(`/api/products/${productId}`)
				.then((r) => r.json())
				.then((product) => {
					setProductObj(product);
					setReviews(product.reviews);
				});
		}
	}, [product, productId]);

	const addNewReview = (reviewObj) => {
		setReviews((currentReviews) => [reviewObj, ...currentReviews]);
	};

	const finalProduct = product ? product : productObj;
	if (!finalProduct) return <h1>Loading...</h1>;

	const handleDelete = () => {
		fetch(`/api/products/${productId}`, {
			method: 'DELETE',
		})
			.then((r) => {
				if (r.ok) {
					setMessage({
						message: 'Successfully deleted the product.',
						color: 'green',
					});
					history.push('/products');
				} else {
					r.json().then((err) => setMessage(err.errors));
				}
			})
			.catch((err) => setMessage(err.errors));
	};

	const handleUpdate = (updatedProductObj) => {
		setIsEditing(true);
		setProductObj(updatedProductObj);
	};

	return (
		<div className='products details'>
			{!isEditing ? (
				<>
					<div className='col-md-4 mb-4' key={finalProduct.id}>
						<div className='card'>
							<img
								src={finalProduct.image_url}
								className='card-img-top'
								alt={finalProduct.name}
							/>
							<div className='card-body'>
								<Link
									style={{
										textDecoration: 'none',
										color: 'black',
										textTransform: 'uppercase',
										textAlign: 'center',
									}}
									to={`/products/${finalProduct.id}`}
								>
									<h5 className='card-title'>{finalProduct.name}</h5>
								</Link>
								<p className='card-text'>{finalProduct.description}</p>
								<p>Cateogry: {finalProduct.category}</p>
								<p>
									<em>Total Ordered for Events: {finalProduct.ordered}</em>
								</p>
								<hr />
								<p>Price: ${finalProduct.price}</p>
								{user ? (
									<>
										<button
											className='btn btn-dark ms-2'
											onClick={() => onAdd(finalProduct)}
										>
											{isLoading ? 'Adding' : 'Add to Cart'}
										</button>
									</>
								) : null}
								{user?.role === 'admin' ? (
									<>
										{location.pathname !== '/products' ? (
											<>
												<button
													className='btn btn-dark ms-2'
													onClick={() =>
														setIsEditing((isEditing) => !isEditing)
													}
												>
													Edit
												</button>
												<button
													className='btn btn-dark ms-2'
													onClick={handleDelete}
												>
													Delete
												</button>
											</>
										) : null}
									</>
								) : null}
								<br />
								{location.pathname !== '/products' ? (
									<>
										{!user ? null : (
											<>
												<br />
												<div>
													<button
														onClick={() => setShow((show) => !show)}
														style={{ border: 'none', backgroundColor: 'white' }}
													>
														{show ? (
															<MdOutlineExpandMore />
														) : (
															<MdOutlineExpandLess />
														)}{' '}
														Add a Review
													</button>
													{!show ? (
														<NewReview
															productId={finalProduct.id}
															addNewReview={addNewReview}
														/>
													) : null}
												</div>
											</>
										)}
										<hr />
										<ReviewsList reviews={reviews} />
									</>
								) : null}
							</div>
						</div>
					</div>
				</>
			) : (
				<EditProduct
					user={user}
					id={productId}
					productObj={finalProduct}
					handleUpdate={handleUpdate}
				/>
			)}
		</div>
	);
};

export default Product;
