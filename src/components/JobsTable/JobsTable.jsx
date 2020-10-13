import React, {useState} from 'react'
import {connect} from 'react-redux'
import './JobsTable.scss'
// Bootstrap Imports
import Table from 'react-bootstrap/Table'
import Container from "react-bootstrap/Container"
import JobDetailModal from '../JobDetailModal/JobDetailModal'
import JobRow from '../JobRow/JobRow'

function JobsTable(props){
   const [modalShow, setModalShow] = useState(false)
   const handleClose = () => setModalShow(false)
   const handleOpen = () => setModalShow(true)
   if(props.jobs){console.log(props.jobs[0].lastContacted.toDate())}
   return(
      <>
         <Container>
            <Table id="jobs-table" striped bordered hover>
               <thead id="job-table-header">
                  <tr>
                     <th>Company Name</th>
                     <th>Job Title</th>
                     <th>Last Date of Contact</th>
                     <th>Status</th>
                  </tr>
               </thead>
               <tbody>
                  {props.jobs ? props.jobs.map(job => 
                     <JobRow key={job.id} companyName={job.company} jobStatus={job.status} jobTitle={job.jobTitle} 
                     lastContacted={job.lastContacted.toDate().getMonth()+1 + '/' + job.lastContacted.toDate().getDate()+ '/' + job.lastContacted.toDate().getFullYear()}
                     />
                  ):null}
               </tbody>
            </Table>
            <JobDetailModal show={modalShow} onHide={handleClose}></JobDetailModal>
         </Container>
      </>
   )
}

const mapStateToProps = (state) => ({
   jobs: state.jobs.jobs
})

export default connect(mapStateToProps)(JobsTable)