"use strict";

import { createSelector, createSlice } from '@reduxjs/toolkit'


const mockJobs = [
  { id: '1', title: 'Registered Nurse', type: 'Full-time', status: 'Applied', applicants: 24, postedDate: '06/01/2025', department: 'Nursing', location: 'New York' },
  { id: '2', title: 'Medical Assistant', type: 'Part-time', status: 'Interviewed', applicants: 10, postedDate: '06/05/2025', department: 'Pediatrics', location: 'Remote' },
  { id: '3', title: 'CNA', type: 'Contract', status: 'Rejected', applicants: 5, postedDate: '05/20/2025', department: 'Surgery', location: 'New York' },
  { id: '4', title: 'Administrative Assistant', type: 'Full-time', status: 'Shortilsted', applicants: 17, postedDate: '05/30/2025', department: 'Admin', location: 'Remote' },
  { id: '5', title: 'Nursing Assistant', type: 'Part-time', status: 'Rejected', applicants: 8, postedDate: '04/15/2025', department: 'Nursing', location: 'New York' }
];


const initialState = {
  allJobs: mockJobs,
  filters: { status: 'All, Applied, Interviewed, Shortilsted, Rejected', type: 'Full-time, Part-time, Contract', department: 'e.g., Surgery, Pediatrics', location: 'e.g., New York, Remote', postedDate: 'e.g., Newest, Most Applicants' }
}

// const jobSlice = createSlice({
//   name: 'jobs',
//   initialState,
//   reducers: {
//     setFilters(state, action) {
//       state.filters = { ...state.filters, ...action.payload }
//     },
//     addJob(state, action) {
//       state.allJobs.push(action.payload)
//     }
//   }
// })


const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload }
    },
    addJob(state, action) {
      state.allJobs.push(action.payload)
    }
  }
})


export const { setFilters, addJob } = jobSlice.actions

// // Selector that returns filtered jobs
// export const selectFilteredJobs = state => {
//   const { allJobs, filters } = state.jobs
//   return allJobs.filter(job =>
//     (filters.status === 'All, Active, Draft, Closed' || job.status === filters.status) &&
//     (filters.type === 'Full-time, Part-time, Contract' || job.type === filters.type) &&
//     (filters.department === 'e.g., Surgery, Pediatrics' || job.department === filters.department) &&
//     (filters.location === 'e.g., New York, Remote' || job.location === filters.location) &&
//     (filters.postedDate === 'e.g., Newest, Most Applicants' || job.postedDate === filters.postedDate)
//   )
// }

// Base selectors
const selectAllJobs = state => state.jobs.allJobs
const selectFilters = state => state.jobs.filters

// Memoized filtered jobs selector
export const selectFilteredJobs = createSelector(
  [selectAllJobs, selectFilters],
  (allJobs, filters) => {
    return allJobs.filter(job =>
      (filters.status === 'All, Applied, Interviewed, Shortilsted, Rejected' || job.status === filters.status) &&
      (filters.type === 'Full-time, Part-time, Contract' || job.type === filters.type) &&
      (filters.department === 'e.g., Surgery, Pediatrics' || job.department === filters.department) &&
      (filters.location === 'e.g., New York, Remote' || job.location === filters.location) &&
      (filters.postedDate === 'e.g., Newest, Most Applicants' || job.postedDate === filters.postedDate)
    )
  }
)

export default jobSlice.reducer