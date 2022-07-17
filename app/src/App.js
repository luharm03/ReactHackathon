import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, Routes, Route } from 'react-router-dom';

import Header from './component/Header';
import Types from './component/Types';
import Items from './component/Items';

function App() {
  let params = useParams();
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Items />} />
        <Route path="type/:type" element={<Items params={params} />} />
        <Route path="types" element={<Types />} />
      </Routes>

    </div>
  );
}

export default App;
