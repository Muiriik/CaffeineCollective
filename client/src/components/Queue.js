import { useContext } from "react";
import Button from 'react-bootstrap/Button';
import { QueueContext } from "../contexts/QueueContext";
import { UserContext } from "../contexts/UserContext";
import { GroupContext } from "../contexts/GroupContext";

const Queue = () => {
    const { queueObject, queueHandlerMap } = useContext(QueueContext)
    const { loggedInUser } = useContext(UserContext);
    const { groupObject } = useContext(GroupContext);

    return (
        <>
            <h2>queue</h2>
            <p>{queueObject.length} users waiting in queue</p>
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
            <Button variant="primary" onClick={async () => {
                try {
                    const date = new Date();
                    queueHandlerMap.join({
                        "user_id": `${loggedInUser.id}`,
                        "group_id": `${groupObject.id}`,
                        "timestamp": `${date.toISOString()}`,
                        "processed": "0",
                    });
                } catch (e) {
                    console.error(e);
                }
            }
            }>Join queue</Button>
        </>
    );
};
export default Queue;