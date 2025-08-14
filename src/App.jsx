import React from "react"
import Container from 'react-bootstrap/Container';
import { Outlet } from "react-router-dom"
import Header from "./components/header/Header";

function App() {

  return (
    <Container fluid>
        <Header/>
        <Outlet/>
    </Container>
  )
}

export default App
