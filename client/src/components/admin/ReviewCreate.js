import { Create, SimpleForm, TextInput, FileField} from 'react-admin'

const ReviewCreate = (props) => {
  return (
    <Create title='Post a Review' {...props}>
        <SimpleForm>
            <TextInput source='title' />
            <TextInput source='rating' />
            <TextInput multiline source='content' />
            <TextInput source='event_id' placeholder='Enter Event Invoice #'/>
            <FileField source='image' />
        </SimpleForm>
    </Create>
  )
}

export default ReviewCreate