import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Products from "./components/Products";
import Cart from "./components/Cart";
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container fluid>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route index path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
