import { useLocation, useParams, Link, useHistory } from 'react-router-dom';
// import { Card } from 'semantic-ui-react';
import { useGlobalContext } from '../context/context';
import { useContext, useEffect, useState } from 'react';
import NewReview from '../reviews/NewReview';
import ReviewsList from '../reviews/ReviewsList';
import EditProduct from '../products/EditProduct';
// import './products.css'
import './details.css';
import { MessageContext } from '../context/message';

const Product = ({ user, product }) => {
	const { addItem } = useGlobalContext();
	const [productObj, setProductObj] = useState(null);
	const [reviews, setReviews] = useState([]);
	const [isEditing, setIsEditing] = useState(false);
	const { productId } = useParams();
	const location = useLocation();
	const history = useHistory();
	const { setMessage } = useContext(MessageContext)

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
		}).then((r) => {
			if( r.ok) {
				history.push('/products')
			} else {
				r.json().then((err) => setMessage(err.errors))
			}
		})
		.catch((err) => setMessage(err.errors))
	};


	const handleUpdate = (updatedProductObj) => {
		setIsEditing(true);
		setProductObj(updatedProductObj);
	};

	return (
		<div className='details'>
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
								<p><em>Total Ordered: {finalProduct.ordered}</em></p>
								<hr />
								<p>Price: ${finalProduct.price}</p>
								<button
									className='btn btn-dark ms-2'
									onClick={() => addItem(product)}
								>
									Add to Cart
								</button>
								{!isEditing &&
								location.pathname.includes('/product') &&
								user?.role === 'admin' ? (
									<>
										<button
											className='btn btn-dark ms-2'
											onClick={() => setIsEditing((isEditing) => !isEditing)}
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

								<br />
								{location.pathname !== '/products' ? (
									<>
										<br />
										<NewReview
											productId={finalProduct.id}
											addNewReview={addNewReview}
											/>
										<br />
										
										<hr />
										<ReviewsList reviews={reviews} />
									</>
								) : null}
							</div>
						</div>
					</div>
				</>
			) : (
				<EditProduct user={user} id={productId} productObj={finalProduct} handleUpdate={handleUpdate}/>
			)}
		</div>
	);
};

export default Product;
