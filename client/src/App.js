import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserProvider from './providers/UserProvider';
import RolesProvider from './providers/RolesProvider';

import Layout from './components/Layout';
import Groups from './components/Groups';

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>

              <Route index element={
                <RolesProvider>
                  <Groups />
                </RolesProvider>
              } />
              <Route path="*" element={"not found"} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  )
}

export default App;
