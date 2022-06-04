import React, { useEffect, useState } from "react";
import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, createTaskStart } from "./redux/tasks/action";
import "./App.css";
import ListCompilation from "./Components/ListCompilation";

function App() {
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const handleChange = (fieldName, e) => {
    if (fieldName == "title") {
      setTitle(e.target.value);
    } else if (fieldName == "body") {
      setBody(e.target.value);
      console.log("testing body, ", body);
    }
  };
  const handleSubmit = (e) => {
    console.log("testing in handleSubmit");
    e.preventDefault();
    let postData = {
      task_title: title,
      task_body: body,
    };
    dispatch(createTaskStart(postData));
  };
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);
  useEffect(() => {
    setList(tasks);
    setBody("")
    setTitle("")
  }, [tasks]);
  return (
    <Container>
      <h1 className="text-editing">Post Handling</h1>
      <Form>
        <FormGroup>
          <Label for="exampleTitle">Title</Label>
          <Input
            type="title"
            name="title"
            value={title}
            id="exampleTitle"
            placeholder="Please fill in the title"
            onChange={(e) => {
              setTitle(e.target.value);
              console.log("testing title, ", title);
            }}
          />
        </FormGroup>
        <FormGroup className="form">
          <Label for="exampleBody">Body</Label>
          <Input
            type="body"
            name="body"
            value={body}
            id="exampleBody"
            placeholder="Please fill in the body"
            onChange={(e) => handleChange("body", e)}
          />
        </FormGroup>
        <div className="button-spacing">
          <Button className="submit-button" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Form>
      <ListCompilation testing={tasks}/>
    </Container>
  );
}

export default App;


