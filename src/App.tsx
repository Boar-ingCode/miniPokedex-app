// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { TestPage } from './components/TestPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<TestPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
