import { useContext } from "react";

import { QueueContext } from "../contexts/QueueContext";

const Queue = () => {
    const { queueObject, queueHandlerMap } = useContext(QueueContext)

    return (
        <>
            <ul>
                {
                    queueObject.map((entry) => (
                        <li key={entry.id}>
                            <p>ID: {entry.id}</p>
                            <p>User ID: {entry.user_id}</p>
                            <p>Group ID: {entry.group_id}</p>
                            <p>Timestamp: {entry.timestamp}</p>
                            <p>Processed: {entry.processed ? "Yes" : "No"}</p>
                        </li>
                    ))
                }

            </ul>

        </>
    );
};
export default Queue;