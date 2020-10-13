import JobActionTypes from './jobs.types'

export const fetchJobsStart = (user) => ({
    type: JobActionTypes.FETCH_JOBS_START,
    user
  });

  
export const fetchJobsSuccess = jobs => ({
    type: JobActionTypes.FETCH_JOBS_SUCCESS,
    payload: jobs
  });
  
export const fetchJobsFailure = errorMessage => ({
    type: JobActionTypes.FETCH_JOBS_FAILURE,
    payload: errorMessage
  });