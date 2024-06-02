import { useEffect, useState, useContext } from "react";
import { QueueContext } from "../contexts/QueueContext";
import { RolesContext } from "../contexts/RolesContext";
import { GroupContext } from "../contexts/GroupContext";

function QueueProvider({ children }) {
    const [queueObject, setQueueObject] = useState({
        state: "pending",
        error: null,
        data: null,
    });
    const [selectedQueue, setSelectedQueue] = useState(null);
    const { selectedRole } = useContext(RolesContext);
    const { groupObject } = useContext(GroupContext);



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

    async function joinQueue(dtoIn) {
        setQueueObject((current) => ({ ...current, state: "pending" }));
        const response = await fetch(`http://localhost:3000/api/v1/queues`, {
            method: "POST",
            body: JSON.stringify(dtoIn),
            headers: { "Content-Type": "application/json", },
        });
        const responseJson = response.json();

        if (response.status < 400) {
            handleLoad();
        } else {
            setQueueObject((current) => ({
                state: "error",
                data: current.data,
                error: responseJson.error,
            }));
        }
    }

    const value = {
        state: queueObject.state,
        queueObject: queueObject.data || [],
        queueHandlerMap: {
            open: setSelectedQueue,
            close: () => setSelectedQueue(null),
            join: joinQueue,
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