import { Create, SimpleForm, TextInput } from 'react-admin'

const UserCreate = (props) => {
  return (
    <Create title='Create a User' {...props}>
        <SimpleForm>
            <TextInput source='username' />
            <TextInput multiline source='email' />
            <TextInput source='password' />
        </SimpleForm>
    </Create>
  )
}

export default UserCreate