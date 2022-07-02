import { Edit, SimpleForm, TextInput, FileField} from 'react-admin'

const ReviewEdit = (props) => {
  return (
    <Edit title='Post a Review' {...props}>
        <SimpleForm>
            <TextInput source='title' />
            <TextInput source='rating' />
            <TextInput multiline source='content' />
            <TextInput source='event_id' placeholder='Enter Event Invoice #'/>
            <FileField source='image' />
        </SimpleForm>
    </Edit>
  )
}

export default ReviewEdit