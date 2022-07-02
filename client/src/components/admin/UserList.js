import { List, Datagrid, TextField, EditButton, DeleteButton, EmailField } from 'react-admin'

const UserList = (props) => {
  return (
    <List {...props}>
        <Datagrid>
            <TextField source='id' />
            <TextField source='username' />
            <EmailField source='email' />
            <EditButton basePath='/users' />
            <DeleteButton basePath='/users' />
        </Datagrid>
    </List>
  )
}

export default UserList