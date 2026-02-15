"use client";

import { Container, Nav, Navbar } from "react-bootstrap";

export default function NavigationBar() {
  return (
    <Navbar className={"border-bottom"} expand={"lg"}>
      <Container>
        <Navbar.Brand href={"/"}>
          <img alt={"Faker Spotter"} src={"/icon.png"} width={32} />
          <span className={"ms-2"}>Faker Spotter</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navigation" />
        <Navbar.Collapse id="navigation">
          <Nav className={"w-100 justify-content-end"}>
            <Nav.Link href={"/about"}>About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
