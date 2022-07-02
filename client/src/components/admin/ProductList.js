import { List, Datagrid, TextField, EditButton, DeleteButton, FileField } from 'react-admin'

const ProductList = (props) => {
  return (
    <List {...props}>
        <Datagrid>
            <TextField source='id' />
            <TextField source='name' />
            <TextField source='category' />
            <TextField source='description' />
            <TextField source='price' />
            <FileField source='image' />
            <EditButton basePath='/product' />
            <DeleteButton basePath='/product' />
        </Datagrid>
    </List>
  )
}

export default ProductList