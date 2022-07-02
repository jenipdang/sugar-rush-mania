import { Admin, Resource } from 'react-admin'
import restProvider from 'ra-data-simple-rest'
import ProductList from '../admin/ProductList'
import ProductCreate from '../admin/ProductCreate'
import ProductEdit from '../admin/ProductEdit'
import UserEdit from '../admin/UserEdit'
import UserList from '../admin/UserList'
import UserCreate from '../admin/UserCreate'
import ReviewCreate from '../admin/ReviewCreate'
import ReviewList from '../admin/ReviewList'
import ReviewEdit from '../admin/ReviewEdit'

const AdminDashboard = () => {
  return (
    <Admin >
      <Resource name='products' list={ProductList} create={ProductCreate} edit={ProductEdit} />
      <Resource dataProvider={restProvider('/api/reviews')} name='reviews' list={ReviewList} create={ReviewCreate} edit={ReviewEdit} />
      <Resource dataProvider={restProvider('/api/users')} name='users' list={UserList} create={UserCreate} edit={UserEdit} />
    </Admin>
  )
}

export default AdminDashboard