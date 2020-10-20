//React imports
import React, { useState, useEffect } from "react";
// Redux  imports
import { connect } from "react-redux";
import { fetchInteractionsStart } from "../../redux/interactions/interactions.actions";
//component imports
import InteractionTable from "../InteractionTable/InteractionTable";
import EditButton from "../EditButton/EditButton";
//bootstrap imports
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
//styling imports
import "./JobDetailModal.scss";

function JobDetailModal(props) {
	const [editing, setEditing] = useState(false);
	let title;

	useEffect((props) => {
		console.log("Modal props :>> ", props);
		// props.fetchInteractionsStart(props.user, props.jobID)
	}, []);

	if (editing) {
		title = (
			<>
				<Modal.Header>
					<Modal.Title>Edit this Job</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Job Id #: {props.selectedJob.id}</p>
					<Form.Label>Company Name:</Form.Label>
					<Form.Control defaultValue={props.selectedJob.company} />
					<Form.Label>Job Title:</Form.Label>
					<Form.Control defaultValue={props.selectedJob.jobTitle} />
					<Form.Label>Last Updated:</Form.Label>
					<Form.Control defaultValue={props.selectedJob.lastContacted} />
					<Form.Label>Status:</Form.Label>
					<Form.Control name="status" as="select" defaultValue={props.selectedJob.status}>
						{/* need a way to get the already selected choice and input it */}
						<option value="saved">Saved</option>
						<option value="applied">Applied</option>
						<option value="interviewing">Interviewing</option>
						<option value="closed">Closed</option>
					</Form.Control>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={() => setEditing(false)}>Stop Editing</Button>
					<Button onClick={() => setEditing(false)}>Save Changes</Button>
				</Modal.Footer>
			</>
		);
	} else {
		title = (
			<>
				<Modal.Header closeButton>
					<Modal.Title>
						{props.selectedJob.jobTitle} @ {props.selectedJob.company}
						<EditButton clicked={() => setEditing(true)} show={true} />
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<InteractionTable />
				</Modal.Body>
				<Modal.Footer>
					<Button variant="success" onClick={props.onHide}>
						Save Changes
					</Button>
				</Modal.Footer>
			</>
		);
	}
	return (
		<Modal
			centered
			id="fullscreenModal"
			show={props.show}
			onHide={props.onHide}
		>
			{title}
		</Modal>
	);
}

const msp = state => ({
	user: state.user.currentUser,
	selectedJob: state.jobs.selectedJob
});

const mdp = (dispatch) => {
	return {
		fetchInteractionsStart: (user, job) =>
         dispatch(fetchInteractionsStart(user, job))
	};
};

export default connect(msp, mdp)(JobDetailModal);
