// import {useState} from 'react'
import {Card} from 'react-bootstrap'
import "./products.css"
import { useGlobalContext } from '../data/context'

const Product = ({product}) => {
    const { id, name, price, description, images_url } = product;
	const { addItem } = useGlobalContext()

	console.log(product)
	return (
		<Card>
			<div className="products" key={id}>
				<div className='image' >
					<img src={images_url} alt={name} />
				</div>
				<div className="box">
					<div className="row">
						<a className='nav-link' style={{color: "black"}} href={`/products/${id}`}><h2>{name}</h2></a>
						<span>${price}</span>
					</div>
					<p>
						{description}
					</p>
					<button className="btn w-50" onClick={() => addItem(product)}>
						Add to cart
					</button>
				</div>
			</div>
		</Card>
	);
}

export default Product