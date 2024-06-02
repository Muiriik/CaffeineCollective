import { useEffect, useState, useContext } from "react";
import { QueueContext } from "../contexts/QueueContext";
import { RolesContext } from "../contexts/RolesContext";

function QueueProvider({ children }) {
    const [queueObject, setQueueObject] = useState({
        state: "pending",
        error: null,
        data: null,
    });
    const [selectedQueue, setSelectedQueue] = useState(null);
    const { selectedRole } = useContext(RolesContext);


    useEffect(() => {
        handleLoad();
    }, []);

    async function handleLoad() {
        setQueueObject((current) => ({ ...current, state: "pending" }));
        const response = await fetch(`http://localhost:3000/api/v1/queues/in-group/${selectedRole}`, {
            method: "GET",
        });
        const responseJson = await response.json();
        if (response.status < 400) {
            setQueueObject({ state: "ready", data: responseJson });
            return responseJson;
        } else {
            setQueueObject((current) => ({
                state: "error",
                data: current.data,
                error: responseJson.error,
            }));
            throw new Error(JSON.stringify(responseJson, null, 2));
        }
    }

    const value = {
        state: queueObject.state,
        queueObject: queueObject.data || [],
        queueHandlerMap: {
            open: setSelectedQueue,
            close: () => setSelectedQueue(null),
        },
        error: queueObject.error || null,
    };

    return (
        <>
            <QueueContext.Provider value={value}>{children}</QueueContext.Provider>
        </>
    );
}

export default QueueProvider;