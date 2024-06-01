import { useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext.js";

function UserProvider({ children }) {
    const [userList, setUserList] = useState({
        state: "ready",
        data: null,
    });
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        setUserList((current) => ({ ...current, state: "loading" }));
        fetch(`http://localhost:3000/api/v1/users`, {
            method: "GET",
        }).then(async (response) => {
            const responseJson = await response.json();
            if (response.status >= 400) {
                setUserList({ state: "error", error: responseJson.error });
            } else {
                setUserList({ state: "ready", data: responseJson });
            }
        });
    }, []);

    const value = {
        userList: userList.data || [],
        loggedInUser: loggedInUser
            ? (userList.data || []).find((user) => user.id === loggedInUser)
            : null,
        handlerMap: {
            login: setLoggedInUser,
            logout: () => setLoggedInUser(null),
        },
    };

    return (
        <>
            <UserContext.Provider value={value}>{children}</UserContext.Provider>
        </>
    );
}

export default UserProvider;