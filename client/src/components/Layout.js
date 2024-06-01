import { Outlet } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import LoginScreen from "../components/LoginScreen";

import MainMenu from "../components/MainMenu";

const Layout = () => {
    const { loggedInUser } = useContext(UserContext);
    return (
        <>
            <div>
                <MainMenu />
            </div>
            <div>
                {loggedInUser ?
                    <Outlet />
                    :
                    <LoginScreen />
                }
            </div>
        </>
    );
};
export default Layout;