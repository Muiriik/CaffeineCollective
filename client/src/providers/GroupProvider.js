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

    // useEffect(() => {
    //     setGroupList((current) => ({ ...current, state: "loading" }));
    //     fetch(`http://localhost:3000/api/v1/groups/${selectedRole}`, {
    //         method: "GET",
    //     }).then(async (response) => {
    //         const responseJson = await response.json();
    //         if (response.status >= 400) {
    //             setGroupList({ state: "error", error: responseJson.error });
    //         } else {
    //             setGroupList({ state: "ready", data: responseJson });
    //         }
    //     });
    // }, []);


    const value = {
        state: groupObject.state,
        groupObject: groupObject.data || [],
        groupHandlerMap: {
            open: setSelectedGroup,
            close: () => setSelectedGroup(null),
        },
        error: groupObject.error || null,
    };

    // const value = {
    //     groupList: groupList.data || [],
    //     selectedGroup: selectedGroup || "",
    //     groupHandlerMap: {
    //         open: setSelectedGroup,
    //         close: () => setSelectedGroup(null),
    //     },
    // };
    console.log(value);
    // console.log(value.groupList.filter((role) => role.user_id === loggedInUser.id));

    return (
        <>
            <GroupContext.Provider value={value}>{children}</GroupContext.Provider>
        </>
    );
}

export default GroupProvider;