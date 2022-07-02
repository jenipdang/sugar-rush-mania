import { List, Datagrid, TextField, FileField, EditButton, DeleteButton } from 'react-admin'

const ReviewList = (props) => {
  return (
    <List {...props}>
        <Datagrid>
            <TextField source='id' />
            <TextField source='title' />
            <TextField multiline source='content' />
            <TextField source='rating' />
            <FileField source='image' />
            <EditButton basePath='/posts' />
            <DeleteButton basePath='/posts' />
        </Datagrid>
    </List>
  )
}

export default ReviewList