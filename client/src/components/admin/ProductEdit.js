import { Edit, SimpleForm, TextInput, FileField} from 'react-admin'

const ProductEdit = (props) => {
  return (
    <Edit title='Edit a Product' {...props}>
        <SimpleForm>
            <TextInput disabled source='id' />
            <TextInput source='name' />
            <TextInput source='category' />
            <TextInput multiline source='description' />
            <TextInput source='price' />
            <FileField source='image' />
        </SimpleForm>
    </Edit>
  )
}

export default ProductEdit