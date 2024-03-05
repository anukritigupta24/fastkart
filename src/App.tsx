import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Products from "./components/Products";
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container fluid>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Products />}>
            <Route index path="/" element={<Products />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
