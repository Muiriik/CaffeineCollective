import { useEffect, useState, useContext } from "react";
import { InventoryContext } from "../contexts/InventoryContext";
import { RolesContext } from "../contexts/RolesContext";

function InventoryProvider({ children }) {
    const [inventoryObject, setInventoryObject] = useState({
        state: "pending",
        error: null,
        data: null,
    });
    const [selectedInventory, setSelectedInventory] = useState(null);
    const { selectedRole } = useContext(RolesContext);


    useEffect(() => {
        handleLoad();
    }, []);

    async function handleLoad() {
        setInventoryObject((current) => ({ ...current, state: "pending" }));
        const response = await fetch(`http://localhost:3000/api/v1/inventory/in-group/${selectedRole}`, {
            method: "GET",
        });
        const responseJson = await response.json();
        if (response.status < 400) {
            setInventoryObject({ state: "ready", data: responseJson });
            return responseJson;
        } else {
            setInventoryObject((current) => ({
                state: "error",
                data: current.data,
                error: responseJson.error,
            }));
            throw new Error(JSON.stringify(responseJson, null, 2));
        }
    }

    const value = {
        state: inventoryObject.state,
        inventoryObject: inventoryObject.data || [],
        inventoryHandlerMap: {
            open: setSelectedInventory,
            close: () => setSelectedInventory(null),
        },
        error: inventoryObject.error || null,
    };

    return (
        <>
            <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>
        </>
    );
}

export default InventoryProvider;