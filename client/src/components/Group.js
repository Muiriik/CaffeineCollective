import { useContext } from "react";
import { GroupContext } from "../contexts/GroupContext";
import QueueProvider from "../providers/QueueProvider";
import InventoryProvider from "../providers/InventoryProvider";

import Queue from "../components/Queue";
import Inventory from "./Inventory";
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