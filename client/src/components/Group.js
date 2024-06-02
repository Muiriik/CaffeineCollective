import { useContext } from "react";
import { GroupContext } from "../contexts/GroupContext";
import QueueProvider from "../providers/QueueProvider";
import InventoryProvider from "../providers/InventoryProvider";

import { RolesContext } from "../contexts/RolesContext";
import RolesProvider from "../providers/RolesProvider";

import Queue from "../components/Queue";
import Inventory from "../components/Inventory";
import { Link } from "react-router-dom";
const Group = () => {
    const { groupObject } = useContext(GroupContext);
    const { handlerMap } = useContext(RolesContext);

    return (
        <>
            <Link to="/" style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => handlerMap.close()}>Go back to group select</Link>

            <h1>{groupObject.display_name}</h1>
            <img src={groupObject.group_photo} style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                objectFit: "cover",
            }} />

            <div>
                <QueueProvider>
                    <Queue />
                </QueueProvider>
            </div>
            <div>
                <InventoryProvider>
                    <Inventory />
                </InventoryProvider>
            </div>
        </>

    );
};
export default Group;