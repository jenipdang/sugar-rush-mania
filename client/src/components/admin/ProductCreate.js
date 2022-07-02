import { Create, SimpleForm, TextInput, FileField} from 'react-admin'

const ProductCreate = (props) => {
  return (
    <Create title='Create a Product' {...props}>
        <SimpleForm>
            <TextInput source='name' />
            <TextInput source='category' />
            <TextInput multiline source='description' />
            <TextInput source='price' />
            <FileField source='image' />
        </SimpleForm>
    </Create>
  )
}

export default ProductCreate