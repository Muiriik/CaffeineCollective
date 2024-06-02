import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserProvider from './providers/UserProvider';
import RolesProvider from './providers/RolesProvider';
import GroupProvider from './providers/GroupProvider';

import Layout from './components/Layout';
import Roles from './components/Roles';
import Group from './components/Group';

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>

              <Route index element={<Roles />} />
              <Route path="/group" element={<GroupProvider><Group /></GroupProvider>} />
              <Route path="*" element={"not found"} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  )
}

export default App;
