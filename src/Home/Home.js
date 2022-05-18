
import { Button, FloatingLabel, Form, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import DeleteModal from "../Modal/DeleteModal";
import auth from "../firebaseinit";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

function App() {
  const [user, loading, error] = useAuthState(auth);
  const [task, setTask] = useState([]);
 // Handle Modal
 const [show, setShow] = useState(false);
 const [del, setDel] = useState(false);
 const [pid, setPid] = useState(false);
 const [title, setTitle] = useState(false);
 const handleClose = () => setShow(false);
 const handleShow = () => setShow(true);

  const handleTask = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const description = e.target.description.value;
    const task = { name, description };

    axios.post("https://stormy-gorge-17032.herokuapp.com/task", task)
    .then((res) => {
      if (res?.data?.acknowledged) {
        
        e.target.reset()
        toast.success(`Task added!`, {
          position: "top-center",
          });
      } 
    });
  };

  useEffect(() => {
    fetch(`https://stormy-gorge-17032.herokuapp.com/task`)
  .then(res => res.json())
  .then(task => setTask(task))
  },[task])

  const deleteHandle = (id, name) => {
    setPid(id);
    setTitle(name)
    handleShow();
  }
  useEffect(() => {
    if(del) {
      handleClose();
      setDel(false);
      fetch(`https://stormy-gorge-17032.herokuapp.com/delete-task/${pid}`, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(result => {
      if(result.acknowledged) {
        toast.success('Task Successfully Deleted!', {
          position: "top-center",
          });
        const remainProducts = task.filter(item => item._id !== pid);
        setTask(remainProducts)
      }
    })
    }
  },[del]);

  const handleLogin = () => {
    signOut(auth)
  }

  return (
    <div className="to_do_list">
      <div className="container">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <div className="App">
              <div className="add_form">
                <h6 className="text-center mb-3 mt-2">
                  What is your main focus for today <b>{user.displayName}</b>?
                </h6>
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

                  <Button className="mt-3" variant="primary" type="submit">
                    Add task
                  </Button>
                </Form>
                {task.length === 0 ? '' : <div className="my_list mt-3 pb-2">
                <h6 className="text-center mb-3 mt-2">
                  My task list
                </h6>
                  <ListGroup>
                    {task.map(t => <ListGroup.Item className="d-flex list_item" key={t._id}>
                      <div>
                      <h5>{t.name}</h5>
                      <p>{t.description}</p>
                      </div>
                      <div>
                      <Button onClick={()=>deleteHandle(t._id, t.name)} className="btn-sm" variant="outline-danger">Delete</Button>
                      </div>
                    </ListGroup.Item>)}
                  </ListGroup>
                </div>}
                <Button onClick={handleLogin} className="mt-3 btn-sm" variant="danger" type="submit">
                    Logout
                  </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
<DeleteModal show={show} setDel={setDel} title={title} handleClose={handleClose} />
      <ToastContainer />
    </div>
  );
}

export default App;
