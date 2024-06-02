import { Outlet } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import LoginScreen from "../components/LoginScreen";

import MainMenu from "../components/MainMenu";
import Container from "react-bootstrap/esm/Container";

const Layout = () => {
    const { loggedInUser } = useContext(UserContext);
    return (
        <>
            <div>
                <MainMenu />
            </div>
            <div>
                <Container>
                    {loggedInUser ?
                        <Outlet />
                        :
                        <LoginScreen />
                    }
                </Container>
            </div>
        </>
    );
};
export default Layout;