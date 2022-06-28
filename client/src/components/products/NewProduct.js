import { useState } from 'react'
import {useHistory} from 'react-router-dom'

const NewProduct = ({user}) => {
    const [product, setProduct] = useState()
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData()

        data.append("product[name]", e.target.name.value)
        data.append("product[image]", e.target.image.files[0])
        data.append("product[price]", e.target.price.value)
        data.append("product[description]", e.target.description.value)
        submitToAPI(data)
    }
    const submitToAPI = (data) => {
        fetch('/api/products', {
            method: "POST",
            body: data
        })
        .then(r => r.json())
        .then(data => {
            setProduct(data.image_url)
            history.push('/products')
        })
        .catch((error) => console.error(error))
    }

  return (
    <div>
        <h1>Create A New Product</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor='name'>Name</label>
            <input type='text' name='name' id='name' />
            <br />
            <label htmlFor='price'>Price $</label>
            <input type='text' name='price' id='price' />
            <br/>
            <label htmlFor='description'>Description</label>
            <input type='text' name='description' id='description' />
            <br/>

            <label htmlFor='image'>Image</label>
            <input type='file' name='image' id='image' />
            <br />

            <button type='submit'>Create</button>
        </form>
    </div>
  )
}

export default NewProduct