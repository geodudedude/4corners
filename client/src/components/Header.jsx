//got emoji from getemoji.com
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import API from "../utils/API";
import { Grid, Form, Row, Col } from "react-bootstrap";

const Header = ({ loadTasks }) => {

    const [show, setShow] = useState(false);
    // const [assignee, setAssignee] = useState([]);

    const OnOpen = () => setShow(true);
    const onClose = () => setShow(false);


    return (
        <div className={"row"}>
            <p className={"page-header"}> Four Corners Dashboard <button onClick={OnOpen} className="btn btn-md btn-primary">Create Task</button></p>
            <OpenModal
                onClose={onClose}
                show={show}
                loadTasks={loadTasks}
            />
        </div>
    )

}

export default Header;


function OpenModal(props) {

    const [assignee, setAssignee] = useState([]);

    useEffect(() => {
        assigneeOptions();
    }, [])

    function assigneeOptions() {
        API.getTasks()
            .then(res => {
                console.log("getting assigneeOptions: ", res.data);
                setAssignee(res.data.map(task => {
                    console.log(task.user);
                    return task.user
                }).reduce((acc, item) => acc.includes(item) ? acc : [...acc, item], []))
            })
            .catch(err => console.log(err));
    };

    // Login user functions.
    const [creatingTask, setCreatingTask] = useState({
        user: "",
        title: "",
        description: "",
        status: "Open",
        icon: "⭕️",
        lastUpdated: new Date(Date.now())
    });

    const handleInputChange = e => {
        const { name, value } = e.target
        setCreatingTask({ ...creatingTask, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log("task created after clicking submit: ", creatingTask)

        API.saveTask(creatingTask)
            .then(res => {
                if (res.status === 200) {
                    console.log("posted successfully");
                }
                props.onClose();
                props.loadTasks();

            }
            )

        //load tasks in items with loadtasks()


        //close the modal

    }


    return (
        //api and how its setup and that's where the below 
        //propnames
        //overlay is to make the rest of the area dark
        <Modal
            isOpen={props.show}
            onRequestClose={props.onClose}
            className={"modal_overlay"}
            overlayClassName={"overlay"}
        >
            <div className={"close-btn-ctn"}>
                {/* this is going to take up 90% of the row */}
                <h2 style={{ flex: "1 90%", textAlign: "center", color: "darkblue" }}>Create New Task</h2>
                <button className={"close-btn"} onClick={props.onClose}>X</button>
            </div>
            <div>
                <br></br>
                <Form inline>
                    <Form.Row>
                        <Form.Group className="ml-3">
                            <Form.Label><h2>Title</h2></Form.Label>
                            <Form.Control name="title" type="text" placeholder="Title" onChange={handleInputChange} type='text' />
                        </Form.Group>
                        <Form.Group className="ml-3 mr-3">
                            <Form.Label><h2 >Description</h2></Form.Label>
                            <Form.Control name="description" type="text" placeholder="Description" onChange={handleInputChange} type='text' />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group className="ml-3 mr-3">
                            <Form.Label><h4>status: "Open"</h4></Form.Label>
                            <Form.Label><h4>icon: ⭕️</h4></Form.Label>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group className="ml-3 mr-3">
                            <Form.Label><p >Assign to: </p></Form.Label>
                            <select name="user" type="text" onChange={handleInputChange} class="browser-default custom-select custom-select-lg mb-3">
                                {assignee.map(assignee => {
                                    console.log("assigned to options: ", assignee)
                                    return (
                                        <option value={assignee}>{assignee}</option>
                                    )
                                })}
                            </select>
                        </Form.Group>

                    </Form.Row>
                </Form>
                <button onClick={handleSubmit}>Submit</button>

            </div>

        </Modal >
    )


}