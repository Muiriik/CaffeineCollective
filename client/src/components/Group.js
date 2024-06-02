import { useContext } from "react";
import { GroupContext } from "../contexts/GroupContext";
import QueueProvider from "../providers/QueueProvider";

import Queue from "../components/Queue";
const Group = () => {
    const { groupObject } = useContext(GroupContext);

    return (
        <>

            <h1>{groupObject.display_name}</h1>
            <img src={groupObject.group_photo} style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                objectFit: "cover",
            }} />

            <div>
                <h2>queue</h2>
                <QueueProvider>
                    <Queue />
                </QueueProvider>
                <h2>inventory</h2>
            </div>
        </>

    );
};
export default Group;