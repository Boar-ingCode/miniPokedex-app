// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { PokemonList } from './components/pokemon/PokemonList';
import { PokemonDetail } from './components/pokemon/PokemonDetail';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
