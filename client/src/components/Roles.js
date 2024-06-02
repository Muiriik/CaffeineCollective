import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { RolesContext } from "../contexts/RolesContext";
import { Link } from "react-router-dom";



const Roles = () => {
    const { loggedInUser } = useContext(UserContext);
    const { roleList, selectedRole, handlerMap } = useContext(RolesContext);

    return (
        <>
            {selectedRole ? null
                :
                <>
                    <h1>Group Selection</h1>
                    <ul>
                        {
                            roleList.filter((role) => role.user_id === loggedInUser.id)
                                .map((role) => (
                                    <li style={{ cursor: "pointer", textDecoration: "underline" }} key={role.group_id} >
                                        <Link to="/group" onClick={() => handlerMap.open(role.group_id)}>{role.group_id}</Link>
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