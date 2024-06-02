import { useEffect, useState, useContext } from "react";
import { RolesContext } from "../contexts/RolesContext.js";

// import { UserContext } from "../contexts/UserContext";


function RolesProvider({ children }) {
    const [roleList, setroleList] = useState({
        state: "ready",
        data: null,
    });
    const [selectedRole, setSelectedRole] = useState(null);
    // const { loggedInUser } = useContext(UserContext);


    useEffect(() => {
        setroleList((current) => ({ ...current, state: "loading" }));
        fetch(`http://localhost:3000/api/v1/roles`, {
            method: "GET",
        }).then(async (response) => {
            const responseJson = await response.json();
            if (response.status >= 400) {
                setroleList({ state: "error", error: responseJson.error });
            } else {
                setroleList({ state: "ready", data: responseJson });
            }
        });
    }, []);


    const value = {
        roleList: roleList.data || [],
        selectedRole: selectedRole,
        handlerMap: {
            open: setSelectedRole,
            close: () => setSelectedRole(null),
        },
    };
    // console.log(value.roleList.filter((role) => role.user_id === loggedInUser.id));

    return (
        <>
            <RolesContext.Provider value={value}>{children}</RolesContext.Provider>
        </>
    );
}

export default RolesProvider;