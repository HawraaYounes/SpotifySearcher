import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Row,
  Card,
} from "react-bootstrap";
import { useEffect, useState } from "react";

const CLIENT_ID = "eaefb39582d1451e871cfdfffe3b5d97";
const CLIENT_SECRET = "2626608becf8457da2b99db9aef10254";

function App() {
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="App">
      <Container>
        <InputGroup>
          <FormControl
            className="mb-3"
            placeholder="Search for an artist.."
            type="input"
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                console.log("enter pressed!");
              }
            }}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <Button onClick={() => console.log("button clicked!")}>
            {" "}
            Search{" "}
          </Button>
        </InputGroup>
      </Container>

      <Container>
        <Row className="mx-2 row row-cols-4">
          <Card>
            <Card.Img src="#" />
            <Card.Body>
              <Card.Title>Album Name here</Card.Title>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  );
}

export default App;
