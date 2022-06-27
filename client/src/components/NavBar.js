import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
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
          <Nav.Link href="#action1">Products</Nav.Link>
          <Nav.Link href="#action2">Contact Us</Nav.Link>
          {!user ? (
            <Nav.Link href="/account">Sign In</Nav.Link>
          ): null}
          {user ? (
          <NavDropdown title={user.username} id="navbarScrollingDropdown">
            <NavDropdown.Item href="#action3">Profile</NavDropdown.Item>
            <NavDropdown.Item onClick={handleLogoutClick}>
              Log Out
            {/* </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">
              Something else here */}
            </NavDropdown.Item>
          </NavDropdown>
          ) : null
          }
          {/* <Nav.Link href="#" disabled>
            Link
          </Nav.Link> */}
        </Nav>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default NavBar;
