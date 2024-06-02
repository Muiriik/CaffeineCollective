import { useContext } from "react";

import { QueueContext } from "../contexts/QueueContext";

const Queue = () => {
    const { queueObject, queueHandlerMap } = useContext(QueueContext)

    return (
        <>
            <h2>queue</h2>
            <p>users waiting in queue</p>
            <ul>
                {
                    queueObject.map((entry) => (

                        entry.processed ? null :
                            <li key={entry.id}>
                                <p>User ID: {entry.user_id}</p>
                                <p>joined: {entry.timestamp}</p>
                            </li>


                    ))
                }
            </ul>

        </>
    );
};
export default Queue;