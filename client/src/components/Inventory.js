import { useContext } from "react";

import { InventoryContext } from "../contexts/InventoryContext";

const Inventory = () => {
    const { inventoryObject, inventoryHandlerMap } = useContext(InventoryContext)

    return (
        <>
            <h2>Inventory</h2>
            <ul>
                {
                    inventoryObject.map((entry) => (

                        entry.processed ?
                            <p>no entries</p>
                            :
                            <li key={entry.id}>
                                <p>Added by: {entry.user_id}</p>
                                <p>Added at: {entry.timestamp}</p>
                                <p>Weight: {entry.weight} units</p>
                            </li>


                    ))
                }
            </ul>

        </>
    );
};
export default Inventory;