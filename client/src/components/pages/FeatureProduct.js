import {useState, useEffect} from 'react'
import { Carousel } from 'react-bootstrap'


const FeatureProduct = () => {
  const [featureProduct, setFeatureProduct] = useState([])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    fetch('/api/most-popular')
    .then((r) => r.json())
    .then((fpData) => {
      setFeatureProduct(fpData)
    })
    .catch((err) => alert(err.errors))
  }, [])

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className='container' style={{padding: "15px"}}>
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={featureProduct.image_url}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>{featureProduct.name}</h3>
          <p>{featureProduct.category}</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-70"
          src="holder.js/800x400?text=Second slide&bg=282c34"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-70"
          src="holder.js/800x400?text=Third slide&bg=20232a"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  );

}

export default FeatureProduct