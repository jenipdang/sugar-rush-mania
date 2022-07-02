import { Edit, SimpleForm, TextInput } from 'react-admin'

const UserCreate = (props) => {
  return (
    <Edit title='Create a User' {...props}>
        <SimpleForm>
            <TextInput source='username' />
            <TextInput multiline source='email' />
            <TextInput source='password' />
        </SimpleForm>
    </Edit>
  )
}

export default UserCreate