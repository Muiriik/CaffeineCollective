import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";


import Container from 'react-bootstrap/Container';

function LoginScreen() {
    const { userList, loggedInUser, handlerMap } = useContext(UserContext);

    // console.log("userList", userList);
    // console.log("logged in user", loggedInUser);

    return (
        <>

            <h1>Select user to log in</h1>

            <ul>
                {userList.map(({ id, display_name }) =>
                    <li style={{ cursor: "pointer", textDecoration: "underline" }} key={id} onClick={() => handlerMap.login(id)}>
                        {display_name}
                    </li>
                )}
            </ul>


        </>
    )
}


export default LoginScreen;