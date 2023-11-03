import { Container, Navbar, Nav, Form } from 'react-bootstrap'
import { Link } from "react-router-dom";

import { HouseDoorFill, PersonFill, GearFill } from 'react-bootstrap-icons';

export function NavBar() {
  return (
    <Navbar fixed="top" sticky="top" expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Ikeada</Navbar.Brand>
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        ></Nav>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          {/* <Button variant="outline-success">Search</Button> /// A remettre selon le besoin */}
        </Form>
        <Nav className="grid gap-3">
          <Link to={`/accueil`}><HouseDoorFill size={30} /></Link>
          <Link to={`/login`}><PersonFill size={30} /></Link>
          <Link to={`/back-office`}><GearFill size={30} /></Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;




