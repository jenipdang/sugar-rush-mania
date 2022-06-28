import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/api/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <Navbar style={{ background: "linear-gradient(to right, #ddd6f3, #faaca8)"}} expand="lg">
    <Container fluid>
      <Navbar.Brand>
        <object type='image/svg+xml' data='SugarRushMania.svg' alt="Sugar Rush Mania">Sugar Rush Mania</object>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Nav.Link href="/products">Products</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/contact">Contact Us</Nav.Link>
          {/* <Nav.Link href="#" disabled>
            Link
          </Nav.Link> */}
        </Nav>
        <Nav className="d-flex" style={{ paddingRight: '30px'}}>
        {!user ? (
            <Nav.Link href="/account">Sign In</Nav.Link>
          ): null}
        {user ? (
          <NavDropdown title={user.username} id="navbarScrollingDropdown" style={{marginRight: '40px'}}>
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Item href="/products/new">New Product</NavDropdown.Item>
            <NavDropdown.Item onClick={handleLogoutClick}>
              Log Out
            </NavDropdown.Item>
          </NavDropdown>
          ) : null
          }
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default NavBar;
