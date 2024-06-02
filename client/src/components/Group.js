import { useContext } from "react";
import { GroupContext } from "../contexts/GroupContext";

const Group = () => {
    const { groupObject, error } = useContext(GroupContext);

    return (
        <>
            {groupObject
                ?
                <>
                    <h1>{groupObject.display_name}</h1>
                    <img src={groupObject.group_photo} style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        objectFit: "cover",
                    }} />
                </>
                :
                { error }

            }

        </>
    );
};
export default Group;