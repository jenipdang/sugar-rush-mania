import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { MessageContext } from '../context/message'
import { UserContext } from '../context/user';
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useHistory } from 'react-router-dom'


function NavBar({cart}) {
  const { user, setUser } = useContext(UserContext)
  const { setMessage } = useContext(MessageContext)
  const history = useHistory()

   function handleLogoutClick() {
    fetch("/api/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setMessage({message: "Successfuly logged out", color: "green"})
        setUser(null);
        history.push('/products')
      }
    });
  }
  

  return (
    <Navbar className='navbar sticky-top mb-5' style={{ background: "linear-gradient(to right, #ddd6f3, #faaca8)"}} expand="lg">
    <Container fluid>
      <Navbar.Brand>
        {/* <img src={window.location.orgin + 'public/SRMlogo.png'} alt="Sugar Rush Mania" /> */}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/products">Products</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/contact">Contact Us</Nav.Link>
        </Nav>
        <Nav className="d-flex" style={{ paddingRight: '30px'}}>
        {!user ? (
            <Nav.Link href="/account">Sign In</Nav.Link>
          ): null}
        {user ? (
        <>
          <Nav.Link href='/cart'>
            {cart?.length > 0 ? cart?.length : null}
            <AiOutlineShoppingCart style={{fontSize: '23px'}} />
            </Nav.Link>
          <NavDropdown title={user.username} id="navbarScrollingDropdown" style={{marginRight: '40px'}}>
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
            {user.role === "admin" ? (
              <>
              <NavDropdown.Item href="/products/new">New Product</NavDropdown.Item>
              </>
            ) : null }
            <NavDropdown.Item onClick={handleLogoutClick}>
              Log Out
            </NavDropdown.Item>
          </NavDropdown>
          </>) : null
          }
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default NavBar;
