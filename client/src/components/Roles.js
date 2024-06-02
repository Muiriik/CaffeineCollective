import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { RolesContext } from "../contexts/RolesContext";
// import { GroupContext } from "../contexts/GroupContext";
import GroupProvider from "../providers/GroupProvider";
import Group from "../components/Group";


const Roles = () => {
    const { loggedInUser } = useContext(UserContext);
    const { roleList, selectedRole, handlerMap } = useContext(RolesContext);
    // const { groupList, selectedGroup, groupHandlerMap } = useContext(GroupContext);


    // console.log("Roles", roleList);
    // console.log("selected", selectedRole);

    return (
        <>
            {selectedRole ?
                <>
                    {/* <h1>Role {selectedRole}</h1> */}
                    <GroupProvider>
                        <Group />
                    </GroupProvider>
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
export default Roles;