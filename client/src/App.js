import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserProvider from './providers/UserProvider';
import Layout from './components/Layout';


function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />} />
            <Route path="*" element={"not found"} />

          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  )
}

export default App;
