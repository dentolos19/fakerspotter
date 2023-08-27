"use client";

import "@/styles/globals.scss";

import { Inter } from "next/font/google";
import { Container, Nav, Navbar } from "react-bootstrap";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FakerSpotter",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={"d-flex flex-column vh-100"}>
          <Navbar className={"border-bottom"} expand={"lg"}>
            <Container>
              <Navbar.Brand href={"/"}>
                <img alt={"FakerSpotter"} src={"/assets/icon.png"} width={32} />
                <span className={"ms-2"}>FakerSpotter</span>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="navigation" />
              <Navbar.Collapse id="navigation">
                <Nav className={"w-100 justify-content-end"}>
                  <Nav.Link href={"/leaderboard"}>Leaderboard</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Container className="h-100 py-4">
            {children}
          </Container>
        </div>
      </body>
    </html>
  );
}