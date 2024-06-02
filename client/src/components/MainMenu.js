import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function MainMenu() {
    const { loggedInUser, handlerMap } = useContext(UserContext);
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#">Caffeine Collective</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    {loggedInUser ?
                        <Navbar.Text>
                            Signed in as: {loggedInUser.display_name} <span style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => handlerMap.logout()}> (logout)</span>
                        </Navbar.Text>
                        :
                        null
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default MainMenu;