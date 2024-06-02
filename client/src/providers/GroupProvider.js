import { useEffect, useState, useContext } from "react";
import { RolesContext } from "../contexts/RolesContext.js";
// import { UserContext } from "../contexts/UserContext";
import { GroupContext } from "../contexts/GroupContext";

function GroupProvider({ children }) {
    const [groupObject, setGroupObject] = useState({
        state: "pending",
        error: null,
        data: null,
    });
    const [selectedGroup, setSelectedGroup] = useState(null);
    const { selectedRole } = useContext(RolesContext);
    // const { loggedInUser } = useContext(UserContext);

    // console.log(selectedRole);

    useEffect(() => {
        handleLoad();
    }, []);

    async function handleLoad() {
        setGroupObject((current) => ({ ...current, state: "pending" }));
        const response = await fetch(`http://localhost:3000/api/v1/groups/${selectedRole}`, {
            method: "GET",
        });
        const responseJson = await response.json();
        if (response.status < 400) {
            setGroupObject({ state: "ready", data: responseJson });
            return responseJson;
        } else {
            setGroupObject((current) => ({
                state: "error",
                data: current.data,
                error: responseJson.error,
            }));
            throw new Error(JSON.stringify(responseJson, null, 2));
        }
    }

    const value = {
        state: groupObject.state,
        groupObject: groupObject.data || [],
        groupHandlerMap: {
            open: setSelectedGroup,
            close: () => setSelectedGroup(null),
        },
        error: groupObject.error || null,
    };

    return (
        <>
            <GroupContext.Provider value={value}>{children}</GroupContext.Provider>
        </>
    );
}

export default GroupProvider;