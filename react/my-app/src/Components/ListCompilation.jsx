import React, { useState, useEffect } from "react";
import { Table, Container, Button, Form, FormGroup, Input } from "reactstrap";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskStart } from "../redux/tasks/action";

export default function ListCompilation({ testing }) {
  console.log("testing testing in componenet, ", testing);
  const [edit, setEdit] = useState(false);
  const [editRowId, setEditRowId] = useState(null);
  const [newTaskBody, setNewTaskBody] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const handleButtonChange = (event) => {
    setEditRowId(parseInt(event.target.value));
    setEdit(!edit);
  };
  const handleUpdates = (fieldName, e) => {
    console.log("testing handleUpdates!", e.target.value);
    if (fieldName == "title") {
      setNewTaskTitle(e.target.value);
      console.log("testing body, ", newTaskTitle);
    } else if (fieldName == "body") {
      setNewTaskBody(e.target.value);
      console.log("testing body, ", newTaskBody);
    }
  };

  const handleUpdatesSave = (e) => {
    const id = e.target.value;
    console.log('testing id', id)
    const newUpdates = {
      task_title: newTaskTitle,
      task_body: newTaskBody,
    };
    console.log("testing newUpdates after button click, ", newUpdates);
    dispatch(updateTaskStart({ id, newUpdates }));
  };

  useEffect(() => {
    setEdit(false)
    setEditRowId(null)
  }, [tasks]);

  // if(actionType == "edit") {
  //   setEdit(!edit)
  //   setEditRowId(id)
  // }
  return (
    <Container className="component-spacing">
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
            <th>Editing</th>
          </tr>
        </thead>
        <tbody>
          {testing.map((e, index) => (
            <tr key={e.id}>
              <th scope="row">{e.id}</th>
              <td>
                {edit && editRowId == e.id ? (
                  <Form>
                    <FormGroup className="table-input-form">
                      <Input
                        type="task-title"
                        name="task-title"
                        id="task-title"
                        value={newTaskTitle}
                        placeholder={e.task_title}
                        onChange={(e) => handleUpdates("title", e)}
                      />
                    </FormGroup>
                  </Form>
                ) : (
                  e.task_title
                )}
              </td>
              <td>
                {" "}
                {edit && editRowId == e.id ? (
                  <Form>
                    <FormGroup className="table-input-form">
                      <Input
                        type="task-body"
                        name="task-body"
                        id="task-body"
                        value={newTaskBody}
                        placeholder={e.task_body}
                        onChange={(e) => handleUpdates("body", e)}
                      />
                    </FormGroup>
                  </Form>
                ) : (
                  e.task_body
                )}
              </td>
              <td>
                <div className="table-button">
                  <Button
                    color="warning"
                    value={e.id}
                    className="table-button-size table-edit"
                    onClick={handleButtonChange}
                  >
                    Edit
                  </Button>
                  <Button
                    color="success"
                    className="table-button-size table-edit"
                    value={e.id}
                    onClick={handleUpdatesSave}
                  >
                    Save
                  </Button>
                  <Button color="danger" className="table-button-size">
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
