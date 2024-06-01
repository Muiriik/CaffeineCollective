import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { RolesContext } from "../contexts/RolesContext";

const Groups = () => {
    const { loggedInUser } = useContext(UserContext);
    const { roleList, selectedGroup, handlerMap } = useContext(RolesContext);


    console.log("groups", roleList);
    console.log("selected", selectedGroup);

    return (
        <>
            {selectedGroup ?
                <>
                    <h1>Group {selectedGroup.group_id}</h1>
                </>
                :
                <>
                    <h1>Group Selection</h1>
                    <ul>
                        {
                            roleList.filter((role) => role.user_id === loggedInUser.id)
                                .map((role) => (
                                    <li style={{ cursor: "pointer", textDecoration: "underline" }} key={role.group_id} onClick={() => handlerMap.open(role.group_id)}>
                                        {role.group_id}
                                    </li>
                                ))
                        }
                    </ul>
                </>
            }
        </>
    );
};
export default Groups;