import { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button } from '../../styles';

const FeatureProduct = () => {
	const [featureProducts, setFeatureProducts] = useState([]);
	const [index, setIndex] = useState(0);

	useEffect(() => {
		fetch('/api/most-popular')
			.then((r) => r.json())
			.then((fpData) => {
				setFeatureProducts(fpData);
			})
			.catch((err) => alert(err.errors));
	}, []);

	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	};

	return (
		<div className='fp-container' >
      <div className='header' style={{textAlign: "center"}}>
			<h2 style={{fontWeight: "bolder"}}>Top Sweets Ordered from Events</h2>
      <Link to="/products">
      <Button className='btn-btn ms-2 mb-4' >Shop Sweets!</Button>
      </Link>
      </div>
			<div className='container'>
				<Carousel activeIndex={index} onSelect={handleSelect}>
					{featureProducts?.map((fProduct) => {
						return (
							<Carousel.Item key={fProduct.id}>
								<img
									className='d-block w-100'
									src={fProduct.image_url.url}
									alt={fProduct.name}
								/>
								<Carousel.Caption style={{ color: 'black' }}>
									<h3>{fProduct.name}</h3>
									<p>{fProduct.category}</p>
								</Carousel.Caption>
							</Carousel.Item>
						);
					})}
				</Carousel>
			</div>
		</div>
	);
};

export default FeatureProduct;
