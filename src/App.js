import logo from "./logo.svg";
import "./App.css";
import { Button, FloatingLabel, Form, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

function App() {
  const [task, setTask] = useState([]);
  const handleTask = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const description = e.target.description.value;
    const task = { name, description };

    axios.post("http://localhost:5000/task", data).then((res) => {
      if (res?.data?.acknowledged) {
        
      } 
    });

  };
  console.log(task);
  return (
    <div className="to_do_list">
      <div className="container">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <div className="App">
              <div className="add_form">
                <h5 className="text-center mb-3 mt-2">
                  What is your main focus for today?
                </h5>
                <Form onSubmit={handleTask}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      name="name"
                      required
                      type="text"
                      placeholder="Task name"
                    />
                  </Form.Group>

                  <FloatingLabel
                    controlId="floatingTextarea2"
                    label="Task description"
                  >
                    <Form.Control
                      name="description"
                      required
                      as="textarea"
                      placeholder="Task description"
                      style={{ height: "100px" }}
                    />
                  </FloatingLabel>

                  <Button className="mt-2" variant="primary" type="submit">
                    Add task
                  </Button>
                </Form>
                <div className="my_list mt-3">
                  <ListGroup>
                    <ListGroup.Item>
                      <h5>Lorem ipsum dolor sit amet.</h5>
                      <p>Lorem ipsum dolor sit amet consectetur.</p>
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
