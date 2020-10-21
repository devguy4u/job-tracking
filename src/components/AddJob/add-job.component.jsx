import React, { Component } from 'react';
import {connect} from 'react-redux'
import {addJobToUserJobsCollection} from '../../firebase/firebase.utils'
import { fetchJobsStart } from '../../redux/jobs/jobs.actions';

//BootStrap Imports
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

//css import
import './add-job.scss'

class AddJob extends Component {

    state = {
        company: '',
        status: '',
        jobTitle: '',
        lastContacted: ''
    }

    handleChange = e => {
        const {name, value} = e.target
        this.setState({[name]: value})
    }

    // not liking the async but runs. document ID currently saying undefined
    handleSubmit = e => {
        e.preventDefault();
        addJobToUserJobsCollection(this.state)
        this.setState({
            company: '',
            status: '',
            jobTitle: '',
            lastContacted: ''
        })
    }

    componentDidMount(){
        this.props.fetchJobsStart()
    }

    render() {
        const {company, status, jobTitle, lastContacted } = this.state
        return (
            <Container className='add-job'>
                <Form id='add-job-form' onSubmit={this.handleSubmit}>
                    <Form.Group controlId="companyForm">
                        <Form.Label>Company:</Form.Label>
                        <Form.Control name='company' value={company} onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="jobTitleForm">
                        <Form.Label>JobT Title:</Form.Label>
                        <Form.Control name='jobTitle' value={jobTitle} onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="lastContactForm">
                        <Form.Label>Last Contacted:</Form.Label>
                        <Form.Control type="date" name='lastContacted' value={lastContacted} onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="statusForm">
                        <Form.Label>Status:</Form.Label>
                        <Form.Control name="status" as="select" value={status} onChange={this.handleChange} >
                            <option disabled defaultValue></option>
                            <option value="saved">Saved</option>
                            <option value="applied">Applied</option>
                            <option value="interviewing">Interviewing</option>
                            <option value="closed">Closed</option>
                        </Form.Control>
                        {/* <Form.Control name='status' value={status} onChange={this.handleChange}/> */}
                    </Form.Group>
                    <Button variant='success' type='submit'>Add Job</Button>
                </Form>
            </Container>
        ); 
    }
}

const msp = ({jobs}) => ({
    jobs: jobs.jobs
})

const mdp = (dispatch) => {
    return {
      fetchJobsStart: () => dispatch(fetchJobsStart()),
    }
  }

export default connect(msp, mdp)(AddJob);

