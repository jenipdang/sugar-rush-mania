import { useLocation, useParams, Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import { useGlobalContext } from '../data/context';
import { useEffect, useState } from 'react';
import NewReview from '../reviews/NewReview';
import ReviewsList from '../reviews/ReviewsList';

const Product = ({ user, product }) => {
	const { addItem } = useGlobalContext();
	const [productObj, setProductObj] = useState(null);
	const [reviews, setReviews] = useState([]);
	const { productId } = useParams();
	const location = useLocation();

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

	console.log(finalProduct)
	return (
		<Card.Group itemsPerRow={4}>
			<div className='col-md-4 mb-4' key={finalProduct.id}>
				<div className='card'>
					<img
						src={finalProduct.images_url}
						className='card-img-top'
						alt='...'
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
						<p>Price: {finalProduct.price}</p>
						<p className='card-text'>{finalProduct.description}</p>
						<button className='btn btn-dark' onClick={() => addItem(product)}>
							Add to Cart
						</button>
					</div>
					<NewReview productId={finalProduct.id} addNewReview={addNewReview} />
					<br/>
					<ReviewsList reviews={reviews} />
				</div>
			</div>
		</Card.Group>
	);
};

export default Product;
