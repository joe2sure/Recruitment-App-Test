## 🧾 POST /api/jobs

- **Description**: Creates a new job posting.

- **Request Body**:
  - **Content-Type**: `application/json`
  - **Data**:
    ```json
    {
      "title": "Registered Nurse",
      "description": "Looking for ICU nurses with at least 2 years of experience.",
      "department": "Critical Care",
      "employmentType": "Full-time",
      "location": {
        "city": "New York",
        "state": "NY",
        "country": "USA",
        "remote": false
      },
      "salaryRange": {
        "min": 70000,
        "max": 90000,
        "currency": "USD"
      },
      "requiredExperience": {
        "minYears": 2,
        "maxYears": 10
      },
      "skillsRequired": ["IV Therapy", "Patient Assessment"],
      "shift": "Day",
      "status": "Open",
      "requiredCredentials": [
        {
          "name": "RN License",
          "issuingAuthority": "Nursing Board",
          "required": true
        }
      ],
      "atsSettings": {
        "useCustomATS": true,
        "screeningCriteria": [
          {
            "field": "experience",
            "operator": ">=",
            "value": 3
          }
        ]
      },
      "applicationDeadline": "2025-04-30T23:59:59Z",
      "interviewSlots": [
        {
          "start": "2025-04-01T10:00:00Z",
          "end": "2025-04-01T10:30:00Z"
        }
      ],
      "notes": "Urgent hiring due to ICU bed expansion."
    }
    ```

- **Field Explanation**:
  - `title`: (string) Title of the job.
  - `description`: (string) Detailed description of the job.
  - `department`: (string) Department or unit this job belongs to.
  - `employmentType`: (string) One of `Full-time`, `Part-time`, `Contract`, `Temporary`, `Internship`.
  - `location`: (object) City, state, country, and whether it's remote.
  - `salaryRange`: (object) Minimum and maximum salary, with currency.
  - `requiredExperience`: (object) Min/Max years of experience.
  - `skillsRequired`: (array) List of required skills.
  - `shift`: (string) Work shift: `Day`, `Night`, or `Rotating`.
  - `employerId`: (ObjectId) Reference to employer.
  - `status`: (string) Job status: `Open`, `Closed`, or `Paused`.
  - `requiredCredentials`: (array) Certifications/licenses required.
  - `atsSettings`: (object) Custom screening criteria for candidate filtering.
  - `applicationDeadline`: (date) Deadline for applications.
  - `interviewSlots`: (array) Available interview times.
  - `postedBy`: (ObjectId) Admin who posted the job.
  - `notes`: (string) Internal notes for HR or admin.

- **Response**:
  - **Status Code**: `201 Created`
  - **Data**:
    ```json
    {
      "_id": "65f1a1b8e7c0a91f1c8b4567",
      "title": "Registered Nurse",
      "createdAt": "2025-04-01T12:00:00Z",
      "updatedAt": "2025-04-01T12:00:00Z"
    }
    ```



## 🔍 GET /api/jobs/:id

- **Description**: Fetches a specific job post by ID.

- **Query Parameters**:
  - None

- **Response**:
  - **Status Code**: `200 OK`
  - **Data**: Full job post object as returned from `POST /api/jobs`.



## 📋 GET /api/jobs/all

- **Description**: Lists all job posts, optionally filtered by query parameters.

- **Query Parameters**:
  - `status`: Filter by job status (e.g., `Open`)
  - `employerId`: Filter by employer ObjectId

- **Example Request**:
  ```bash
  curl "http://localhost:3500/api/jobs/all?status=Open&employerId=65f1a1b8e7c0a91f1c8b4567"
  ```

- **Response**:
  - **Status Code**: `200 OK`
  - **Data**: Array of job post objects.



## 🖊️ PUT /api/jobs/:id

- **Description**: Updates an existing job post.

- **Request Body**:  
  *(unchanged, see your original doc for details)*

- **Example Request**:
  ```bash
  curl -X PUT http://localhost:3500/api/jobs/65f1a1b8e7c0a91f1c8b4567 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Senior Registered Nurse",
    "skillsRequired": ["IV Therapy", "Leadership"]
  }'
  ```

- **Response**:
  - **Status Code**: `200 OK`
  - **Data**: Updated job post object.

---

## 🗑️ DELETE /api/jobs/:id

- **Description**: Deletes a job post by ID.

- **Example Request**:
  ```bash
  curl -X DELETE http://localhost:3500/api/jobs/65f1a1b8e7c0a91f1c8b4567
  ```

- **Response**:
  - **Status Code**: `204 No Content`
  

## ✅ PATCH /api/jobs/:id/approve

- **Description**: Approves or disapproves a job post (admin only).

- **Request Body**:
  ```json
  { "approve": true }
  ```
  or
  ```json
  { "approve": false }
  ```

- **Response**:  
  *(returns updated job post with isApproved and postedBy fields)*

---

# ⚙️API Documentation – ATSConfig Module

### POST /api/ats/ats-configs

- **Description**: Creates a new ATS configuration for an employer.
- **Request Body**:
  ```json
  {
    "employerId": "65f1a1b8e7c0a91f1c8b4567",
    "criteria": [
      {
        "field": "yearsOfExperience",
        "operator": ">=",
        "value": 3
      },
      {
        "field": "skills",
        "operator": "in",
        "value": ["IV Therapy", "Leadership"]
      }
    ],
    "weightings": {
      "experience": 3,
      "skills": 2
    },
    "autoRejectRules": [
      {
        "field": "certifications",
        "operator": "notIn",
        "value": ["CPR"]
      }
    ],
    "enabled": true,
    "notes": "Strict filtering for ICU roles"
  }
  ```
- **Field Explanation**:
  - `employerId`: Employer ObjectId (unique)
  - `criteria[]`: Array of screening conditions
  - `field`: One of: yearsOfExperience, educationLevel, certifications, location, skills, availability
  - `operator`: One of: equals, contains, >=, <=, in, notIn
  - `value`: Flexible type (string, number, array)
  - `weightings`: Scoring weights for each field
  - `autoRejectRules[]`: Rules that immediately disqualify candidates
  - `enabled`: Boolean flag (default: true)
  - `notes`: Optional internal note

- **Response**:
  - **Status Code**: `201 Created`
  - **Data**:
    ```json
    {
      "_id": "65f1a1b8e7c0a91f1c8b4568",
      "employerId": "65f1a1b8e7c0a91f1c8b4567",
      "createdAt": "2025-04-01T12:00:00Z",
      "updatedAt": "2025-04-01T12:00:00Z"
    }
    ```


### GET /ats-configs/:employerId

- **Description**: Fetches ATS config for a specific employer.
- **Query Parameters**:
  - None
- **Response**:
  - **Status Code**: `200 OK`
  - **Data**: Full ATS config object

---

### GET /api/ats/ats-configs

- **Description**: Lists all ATS configs (with optional filters).
- **Query Parameters**:
  - `enabled`: Filter by enabled status (true/false)

- **Example Request**:
  ```bash
  curl "http://localhost:3500/api/ats/ats-configs?enabled=true"
  ```

- **Response**:
  - **Status Code**: `200 OK`
  - **Data**: Array of ATS config objects

---

### PUT /api/ats/ats-configs/:employerId

- **Description**: Updates an existing ATS config.
- **Request Body**:
  - Any subset of fields from `POST /api/ats/ats-configs `

- **Example Request**:
  ```bash
  curl -X PUT http://localhost:3500/api/ats/ats-configs/65f1a1b8e7c0a91f1c8b4567 \
  -H "Content-Type: application/json" \
  -d '{
    "notes": "Updated configuration for ICU hiring."
  }'
  ```

- **Response**:
  - **Status Code**: `200 OK`
  - **Data**: Updated config object

---

### DELETE /api/ats/ats-configs/:employerId

- **Description**: Deletes an ATS config by employer ID.

- **Example Request**:
  ```bash
  curl -X DELETE http://localhost:3500/api/ats/ats-configs/65f1a1b8e7c0a91f1c8b4567
  ```

- **Response**:
  - **Status Code**: `204 No Content`

---

# API Documentation – ATS & Matching Module

## ⚙️ GET /api/ats-filter/config/:employerId

- **Description**: Fetches ATS configuration for a specific employer.
- **Query Parameters**:
  - None
- **Response**:
  - **Status Code**: `200 OK`
  - **Data**:
    ```json
    {
      "success": true,
      "data": {
        "weightings": {
          "experience": 3,
          "skills": 2
        },
        "criteria": [
          {
            "field": "yearsOfExperience",
            "operator": ">=",
            "value": 3
          }
        ],
        "autoRejectRules": [
          {
            "field": "certifications",
            "operator": "notIn",
            "value": ["CPR"]
          }
        ],
        "enabled": true,
        "notes": "Strict filtering for ICU roles"
      }
    }
    ```



## 🔁 PUT /config/:employerId

- **Description**: Updates an existing ATS config.
- **Request Body**:
  ```json
  {
    "criteria": [
      {
        "field": "yearsOfExperience",
        "operator": "equals",
        "value": 3
      }
    ],
    "weightings": {
      "experience": 3,
      "skills": 3
    },
    "autoRejectRules": [
      {
        "field": "certifications",
        "operator": "notIn",
        "value": ["CPR"]
      }
    ],
    "enabled": true,
    "notes": "Strict filtering for ICU roles"
  }
  ```
- **Response**:
  - **Status Code**: `200 OK`
  - **Data**: Updated config object

---

## 🔍 POST /api/ats-filter/jobs/:jobId/filter

- **Description**: Filters candidates for a job posting.
- **Request Body**:
  ```json
  {
    "candidateIds": ["68224a117fcdb08d0b2db11c", "68224a647fcdb08d0b2db121"]
  }
  ```
- **Response**:
  - **Status Code**: `200 OK`
  - **Data**:
    ```json
    {
      "success": true,
      "data": {
        "jobId": "681f8325a8b27978b788c019",
        "total": 2,
        "passed": 0,
        "failed": 2,
        "passedCandidates": [],
        "failedCandidates": [
          {
            "candidateId": "68224a117fcdb08d0b2db11c",
            "candidateName": "Chioma Peace Okonkwo",
            "passed": false,
            "failedCriteria": [...],
            "rejectionRules": [...]
          },
          ...
        ]
      }
    }
    ```



## 🧠 POST /api/ats-filter/jobs/:jobId/match

- **Description**: Matches and ranks candidates for a job.
- **Request Body**:
  ```json
  {
    "candidateIds": ["68224a117fcdb08d0b2db11c", "68224a647fcdb08d0b2db121"]
  }
  ```
- **Response**:
  - **Status Code**: `200 OK`
  - **Data**:
    ```json
    {
      "success": true,
      "data": {
        "jobId": "681f8325a8b27978b788c019",
        "total": 2,
        "matches": [
          {
            "candidateId": "68224a117fcdb08d0b2db11c",
            "candidateName": "Chioma Peace Okonkwo",
            "totalScore": 0.3,
            "scores": {
              "experience": 0,
              "education": 1,
              "certifications": 0,
              "skills": 0,
              "location": 1,
              "availability": 1
            },
            "weightedScores": {
              "experience": 0,
              "education": 1,
              "certifications": 0,
              "skills": 0,
              "location": 1,
              "availability": 1
            }
          },
          ...
        ]
      }
    }
    ```



## 💼 GET /api/ats-filter/jobs/:jobId/ranked

- **Description**: Gets candidates ranked by match score.
- **Response**:
  - **Status Code**: `200 OK`
  - **Data**:
    ```json
    {
      "success": true,
      "data": {
        "jobId": "681f8325a8b27978b788c019",
        "total": 0,
        "rankedCandidates": []
      }
    }
    ```



## 🎯 POST /api/ats-filter/jobs/:jobId/screen

- **Description**: Screens a single candidate against a job.
- **Request Body**:
  ```json
  {
    "candidateId": "68224a117fcdb08d0b2db11c"
  }
  ```
- **Response**:
  - **Status Code**: `200 OK`
  - **Data**:
    ```json
    {
      "success": true,
      "data": {
        "jobId": "681f8325a8b27978b788c019",
        "candidateId": "68224a117fcdb08d0b2db11c",
        "passed": false,
        "failedCriteria": [...],
        "rejectionRules": [...],
        "matchScore": null
      }
    }
    ```



## 📦 POST /api/ats-filter/jobs/:jobId/batch

- **Description**: Processes a batch of new applications.
- **Request Body**:
  ```json
  {
    "candidateIds": ["68224a117fcdb08d0b2db11c", "68224a647fcdb08d0b2db121"]
  }
  ```
- **Response**:
  - **Status Code**: `200 OK`
  - **Data**:
    ```json
    {
      "success": true,
      "data": {
        "jobId": "681f8325a8b27978b788c019",
        "totalCandidates": 2,
        "passedFilter": 0,
        "failedFilter": 2,
        "rankedCandidates": []
      }
    }
    ```



## 📊 GET /api/ats-filter/employers/:employerId/stats

- **Description**: Gets ATS statistics for an employer.
- **Response**:
  - **Status Code**: `200 OK`
  - **Data**:
    ```json
    {
      "success": true,
      "data": {
        "employerId": "681f20bcaa47bb4a1722339b",
        "totalJobs": 2,
        "totalFiltered": 0,
        "totalMatched": 0,
        "averagePassRate": 0,
        "jobStats": [
          {
            "jobId": "681f8325a8b27978b788c019",
            "title": "Future Program Supervisor",
            "totalCandidates": 0,
            "passedFilter": 0,
            "failedFilter": 0,
            "matched": 0,
            "passRate": 0
          }
        ]
      }
    }
    ```



## 🧩 Helper Functions (Used Internally)

| Function | Purpose |
|--------|---------|
| `calculateYearsOfExperience()` | Calculates total years from resume experience |
| `getEducationLevel()` | Maps degree text to numerical value |
| `matchCertifications()` | Checks required certifications |
| `matchLocation()` | Compares candidate and job location |
| `matchSkills()` | Evaluates skill match percentage |
| `evaluateCriterion()` | Applies field/operator/value rule to candidate |
| `calculateMatchScore()` | Computes weighted score using ATS settings |
| `filterCandidate()` | Determines pass/fail status based on ATS config |



## ✅ Summary of Security Features

We’ve implemented a **fully functional ATS filtering and matching system**, including:

| Feature | Status |
|--------|--------|
| Dynamic screening rules | ✅ Done |
| Auto-reject logic | ✅ Done |
| Weighted scoring system | ✅ Done |
| Candidate-job match calculator | ✅ Done |
| Batch processing | ✅ Done |
| Ranked candidate output | ✅ Done |
| Structured response format | ✅ Done |
| Input validation | ✅ Done |
| Field sanitization | ✅ Done |
| ObjectId validation | ✅ Done |
| Logging support | ✅ Done |
| Error handling | ✅ Done |



# API Documentation – Employer Module

## 🧾 POST  /api/employers

- **Description**: Creates a new employer with an optional profile image upload.

- **Request Body**:
  - **Content-Type**: `multipart/form-data`
  - **Fields**:
    ```json
    {
      "user_Id": "68213b8c48f75d1570d9a29f",
      "company_name": "ABC Hospital",
      "contact_Person": "{\"fullName\": \"Jane Doe\", \"email\": \"jane@hospital.com\"}",
      "address": "{\"city\": \"New York\"}",
      "profile_image": "[file upload]"
    }
    ```

- **Field Explanation**:
  - `user_Id`: Must be a valid `ObjectId` referencing a real `User` with role `Employer`
  - `company_name`: (string) Name of the company (min 2, max 100 chars)
  - `contact_Person`: (object as JSON string) Contains `fullName`, `phone`, `email`
  - `address`: (object as JSON string) Includes `street`, `city`, `state`, `country`, `zipCode`
  - `industry`: (optional) Default is `"Healthcare"`
  - `ats_Preferences`: (optional) Preferences for candidate filtering
  - `onboarding_Completed`: (boolean) Default: `false`
  - `profile_image`: (image file) Uploaded via Cloudinary and stored as URL

- **Response**:
  - **Status Code**: `201 Created`
  - **Data**:
    ```json
    {
      "success": true,
      "message": "Employer created successfully",
      "data": {
        "_id": "682728ea10ff29718895555d",
        "user_Id": "68213b8c48f75d1570d9a29f",
        "profile_image": "https://res.cloudinary.com/dphid2bdj/image/upload/v1747396842/employer_profiles/1747396838434_a.png.png",
        "company_name": "ABC Hospital",
        "contact_Person": {
          "fullName": "Jane Doe",
          "email": "jane@hospital.com"
        },
        "address": {
          "city": "New York"
        },
        "industry": "Healthcare",
        "onboarding_Completed": false
      }
    }
    ```



## 🔍 GET /api/employers/:id

- **Description**: Fetches a specific employer by ID.
- **Query Parameters**:
  - None
- **Response**:
  - **Status Code**: `200 OK`
  - **Data**:
    ```json
    {
      "success": true,
      "data": {
        "contact_Person": {
          "fullName": "Jane Doe",
          "email": "jane@hospital.com"
        },
        "address": {
          "city": "New York"
        },
        "ats_Preferences": {
          "requiredSkills": [],
          "excludeKeywords": []
        },
        "user_Id": {
          "_id": "68213b8c48f75d1570d9a29f",
          "first_Name": "Kelvin",
          "last_Name": "Mathias",
          "email": "kelvin@example.com"
        },
        "profile_image": "https://res.cloudinary.com/dphid2bdj/image/upload/v1747396842/employer_profiles/1747396838434_a.png.png",
        "company_name": "ABC Hospital",
        "industry": "Healthcare",
        "onboarding_Completed": false
      }
    }
    ```



## 📋 GET /api/employers

- **Description**: Lists all employers, optionally filtered by query parameters.

- **Query Parameters**:
  - `industry`: Filter by industry (e.g., `Manufacturing`)
  - `onboardingCompleted`: Filter by status (`true` or `false`)

- **Example Request**:
  ```bash
  curl http://localhost:3500/api/employers?industry=Manufacturing
  ```

- **Response**:
  - **Status Code**: `200 OK`
  - **Data**:
    ```json
    {
      "success": true,
      "count": 1,
      "data": [
        {
          "_id": "681f20bcaa47bb4a172233ab",
          "company_name": "Schneider and Sons",
          "industry": "Manufacturing",
          "profile_image": "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/40.jpg",
          "onboarding_Completed": true
        }
      ]
    }
    ```



## 🖊️ PUT /api/employers/:id

- **Description**: Updates an existing employer with optional image upload.

- **Request Body**:
  - **Content-Type**: `multipart/form-data`
  - **Fields**:
    ```json
    {
      "company_name": "ABC School",
      "contact_Person": "{\"fullName\": \"Simeon Doe\", \"email\": \"jane@hospital.com\"}",
      "address": "{\"city\": \"New York\"}",
      "profile_image": "[new image file]"
    }
    ```

- **Example Request**:
  ```bash
  curl -X PUT http://localhost:3500/api/employers/682728ea10ff29718895555d \
  -F 'company_name=ABC School' \
  -F 'contact_Person={\"fullName\":\"Simeon Doe\",\"email\":\"jane@hospital.com\"}' \
  -F 'address={\"city\":\"New York\"}' \
  -F 'profile_image=@C:/path/to/new-image.png' \
  -H "Content-Type: multipart/form-data"
  ```

- **Response**:
  - **Status Code**: `200 OK`
  - **Data**:
    ```json
    {
      "success": true,
      "message": "Employer updated successfully",
      "data": {
        "company_name": "ABC School",
        "contact_Person": {
          "fullName": "Simeon Doe",
          "email": "jane@hospital.com"
        },
        "address": {
          "city": "New York"
        },
        "profile_image": "https://res.cloudinary.com/dphid2bdj/image/upload/v1747403943/employer_profiles/1747403935443_q.png.png"
      }
    }
    ```



## 🗑️ DELETE /api/employers/:id

- **Description**: Deletes an employer by ID.

- **Example Request**:
  ```bash
  curl -X DELETE http://localhost:3500/simeapi/employers/681f20bcaa47bb4a1722339b
  ```

- **Response**:
  - **Status Code**: `204 No Content`
  - No body returned — standard for deletion endpoints

---

Got it! I'll now update the `api-docs.md` file using the **latest response** from the uploaded file. This includes more detailed candidate metadata (e.g., `candidateFullName`, `candidateResumeData`, `candidateApplications`, etc.) and additional application-related fields.

---

## Retrieve Employer Jobs

### **Endpoint**
```
GET http://localhost:3500/api/employers/jobs
```

### **Description**
Retrieves a list of job postings associated with the employer, including detailed metadata about each job and its applicants. Each job contains information such as title, location, salary range, required experience, credentials, interview slots, and statistics on applications received.

This endpoint is used by employers to view their open positions along with applicant details and screening metrics.

---

### **Authentication**
- **Required:** Yes (Cookie for Authorization Authorization)
- **Scope:** `employer`

---

### **Request Parameters**
None required. The endpoint returns all available jobs for the authenticated employer.

---

### **Response Structure**

| Field | Type | Description |
|-------|------|-------------|
| `success` | Boolean | Indicates if the request was successful. |
| `message` | String | A human-readable message describing the result. |
| `summary` | Object | Summary statistics of all jobs (see below). |
| `jobs` | Array of Objects | List of job posting objects. |

---

#### **Summary Fields**
| Field | Type | Description |
|-------|------|-------------|
| `totalJobs` | Number | Total number of jobs. |
| `activeJobs` | Number | Number of currently active jobs. |
| `pausedJobs` | Number | Number of paused jobs. |
| `closedJobs` | Number | Number of closed jobs. |
| `approvedJobs` | Number | Number of approved jobs. |
| `pendingApprovalJobs` | Number | Number of jobs awaiting approval. |
| `totalApplicationsReceived` | Number | Total applications across all jobs. |
| `totalUniqueCandidates` | Number | Total unique candidates who applied. |
| `jobsWithDeadlines` | Number | Number of jobs with deadlines set. |
| `expiredJobs` | Number | Number of expired jobs. |

---

#### **Job Fields**
Each job object contains the following properties:

| Field | Type | Description |
|-------|------|-------------|
| `jobId` | String | Unique identifier of the job. |
| `title` | String | Title of the job. |
| `department` | String | Department where the job is posted. |
| `employmentType` | String | Type of employment (e.g., Full-time, Part-time, Contract). |
| `location` | Object | Location details including city, state, country, and remote status. |
| `salaryRange` | Object | Salary range with min, max, and currency. |
| `requiredExperience` | Object | Minimum and maximum years of required experience. |
| `requiredCredentials` | Array of Objects | Credentials required for the job (name, issuing authority, etc.). |
| `skillsRequired` | Array of Strings | List of skills required for the job. |
| `shift` | String | Shift type (e.g., Day, Night). |
| `status` | String | Current status of the job (e.g., Open, Closed). |
| `applicationDeadline` | Date (ISO 8601) | Deadline for applying to the job. |
| `postedDate` | Date or String | Date when the job was posted. |
| `isApproved` | Boolean | Whether the job has been approved. |
| `notes` | String | Additional notes related to the job. |
| `interviewSlots` | Array of Objects | Scheduled interview times (start and end time). |
| `atsSettings` | Object | ATS configuration for screening applicants. |
| `companyName` | String | Name of the company posting the job. |
| `totalApplications` | Number | Total number of applications received for this job. |
| `applicationsByStatus` | Object | Count of applications grouped by status (e.g., Applied, Shortlisted). |
| `candidatesMetadata` | Array of Objects | Detailed info about each candidate who applied (see below). |
| `metrics` | Object | Job-specific metrics like days active, deadline status, etc. |

---

#### **Candidate Metadata Fields**
Each candidate in `candidatesMetadata` includes:

| Field | Type | Description |
|-------|------|-------------|
| `candidateId` | String | Unique ID of the candidate. |
| `candidateName` | String | First name of the candidate. |
| `candidateFullName` | String | Full name of the candidate. |
| `candidateImage` | String or null | URL to the candidate's profile image. |
| `candidateLocation` | Object | City, state, and country of the candidate. |
| `candidateSkills` | Array of Strings | Skills listed by the candidate. |
| `candidateExperience` | Array of Objects | Work experience entries (start and end dates). |
| `candidateEducation` | Array of Objects | Education history (institution and degree). |
| `candidateCredentials` | Array of Objects | Professional certifications or licenses. |
| `candidateResumeData` | Object | Resume data including education, experience, and skills. |
| `candidateApplications` | Array of Objects | List of all applications submitted by the candidate. |
| `candidateTotalApplications` | Number | Total number of applications submitted by the candidate. |
| `resumeUrl` | String | Link to the candidate’s resume PDF. |
| `applicationData` | Object | Application-specific data (ATS score, resume, feedback, interviews, etc.). |
| `interviewSchedule` | Array of Objects | Interview schedule for this job application. |
| `feedback` | Array of Objects | Feedback provided by reviewers. |
| `assessment` | Array of Objects | Assessment results for this candidate. |
| `trainingProgress` | Array | Training progress (if applicable). |
| `jobTitle` | String | Title of the job applied for. |

---

#### **Application Data Fields**
Inside `applicationData`, you will find:

| Field | Type | Description |
|-------|------|-------------|
| `applicationId` | String | Unique ID of the application. |
| `currentStage` | String | Current stage in the hiring pipeline (e.g., "Shortlisted", "Interviewing"). |
| `appliedDate` | Date (ISO 8601) | Timestamp when the application was submitted. |
| `atsScore` | Number | Score assigned by the ATS based on fit criteria. |
| `resumeUrl` | String | Link to the candidate’s resume. |
| `coverLetter` | String | Candidate's cover letter. |
| `feedback` | Array of Objects | Reviewer feedback with notes and timestamps. |
| `interviewSchedule` | Array of Objects | Scheduled interviews for this application. |
| `assessments` | Array of Objects | Results of any assessments taken. |
| `isWithdrawn` | Boolean | Whether the candidate withdrew the application. |
| `notes` | String | Internal notes about the candidate. |

---

### **Example Response**

```json
{
	"success": true,
	"message": "Jobs retrieved successfully",
	"summary": {
		"totalJobs": 9,
		"activeJobs": 9,
		"pausedJobs": 0,
		"closedJobs": 0,
		"approvedJobs": 3,
		"pendingApprovalJobs": 6,
		"totalApplicationsReceived": 2,
		"totalUniqueCandidates": 2,
		"jobsWithDeadlines": 9,
		"expiredJobs": 2
	},
	"jobs": [
		{
			"jobId": "68373b8c3452c9b8ba497002",
			"title": "Radiology Tech R325",
			"department": "Imaging",
			"employmentType": "Part-time",
			"location": {
				"city": "Los Angeles",
				"state": "CA",
				"country": "USA",
				"remote": false
			},
			"salaryRange": {
				"min": 40000,
				"max": 60000,
				"currency": "USD"
			},
			"requiredExperience": {
				"minYears": 1,
				"maxYears": 5
			},
			"requiredCredentials": [
				{
					"name": "Radiology License",
					"issuingAuthority": "Medical Imaging Board",
					"required": true
				}
			],
			"skillsRequired": ["X-ray operation", "Patient Positioning"],
			"shift": "Day",
			"status": "Open",
			"applicationDeadline": "2025-05-15T23:59:59.000Z",
			"postedDate": "Wed May 28 2025 17:36:28 GMT+0100 (West Africa Standard Time)",
			"isApproved": false,
			"notes": "Urgent replacement needed for maternity leave.",
			"interviewSlots": [
				{
					"start": "2025-05-01T14:00:00.000Z",
					"end": "2025-05-01T14:30:00.000Z"
				}
			],
			"atsSettings": {
				"useCustomATS": false,
				"screeningCriteria": []
			},
			"companyName": "ABC Hospita",
			"totalApplications": 1,
			"applicationsByStatus": {
				"Applied": 0,
				"Shortlisted": 1,
				"Interviewing": 0,
				"Offered": 0,
				"Rejected": 0,
				"Hired": 0
			},
			"candidatesMetadata": [
				{
					"candidateId": "683592b81ac3c2ffb7dc7652",
					"candidateName": "user.fullName",
					"candidateFullName": "Amaka Okoye",
					"candidateImage": null,
					"candidateLocation": {
						"city": "Abuja",
						"state": "FCT",
						"country": "Nigeria"
					},
					"candidateSkills": ["Patient assessment", "Wound care", "Vital signs monitoring", "Medication administration"],
					"candidateExperience": [
						{
							"startDate": "2019-02-01T00:00:00.000Z",
							"endDate": "2088-05-03T23:00:00.000Z"
						}
					],
					"candidateEducation": [
						{
							"institution": "University of Nigeria, Nsukka",
							"degree": "B.NSc. Nursing Science"
						}
					],
					"candidateCredentials": [
						{
							"type": "AWS Architect",
							"issuingAuthority": "Amazon",
							"validUntil": "2026-12-31T00:00:00.000Z",
							"verified": true
						}
					],
					"candidateResumeData": {
						"education": [...],
						"experience": [...],
						"skills": [...]
					},
					"candidateApplications": [
						{
							"_id": "683828866883c2dac7b58ba0",
							"jobId": "68373b8c3452c9b8ba497002",
							"candidateId": "683592b81ac3c2ffb7dc7652",
							"resumeUrl": "...",
							"currentStage": "Shortlisted",
							"atsScore": 78
						}
					],
					"applicationData": {
						"applicationId": "683828866883c2dac7b58ba0",
						"currentStage": "Shortlisted",
						"appliedDate": "2025-05-29T09:27:34.750Z",
						"atsScore": 78,
						"resumeUrl": "...",
						"coverLetter": "I am excited to contribute...",
						"interviewSchedule": [...],
						"assessments": [...]
					}
				}
			],
			"metrics": {
				"daysActive": 7,
				"isDeadlinePassed": true,
				"hasInterviewSlots": true,
				"isRemote": false,
				"uniqueCandidatesCount": 1,
				"averageAtsScore": 78
			}
		}
	]
}
```

---

```json
{
	"success": true,
	"message": "Jobs retrieved successfully",
	"summary": {
		"totalJobs": 9,
		"activeJobs": 9,
		"pausedJobs": 0,
		"closedJobs": 0,
		"approvedJobs": 3,
		"pendingApprovalJobs": 6,
		"totalApplicationsReceived": 2,
		"totalUniqueCandidates": 2,
		"jobsWithDeadlines": 9,
		"expiredJobs": 2
	},
	"jobs": [
		{
			"jobId": "68373bb43452c9b8ba497017",
			"title": "Surgical Nurse SN440",
			"department": "Surgery",
			"employmentType": "Full-time",
			"location": {
				"city": "Houston",
				"state": "TX",
				"country": "USA",
				"remote": false
			},
			"salaryRange": {
				"min": 75000,
				"max": 88000,
				"currency": "USD"
			},
			"requiredExperience": {
				"minYears": 2,
				"maxYears": 6
			},
			"requiredCredentials": [
				{
					"name": "Registered Nurse License",
					"issuingAuthority": "State Nursing Board",
					"required": true
				}
			],
			"skillsRequired": ["Surgical Prep", "Post-Op Care"],
			"shift": "Day",
			"status": "Open",
			"applicationDeadline": "2025-07-01T23:59:59.000Z",
			"postedDate": "Wed May 28 2025 17:37:08 GMT+0100 (West Africa Standard Time)",
			"isApproved": true,
			"notes": "New surgical wing expanding staff.",
			"interviewSlots": [
				{
					"start": "2025-05-10T11:00:00.000Z",
					"end": "2025-05-10T11:30:00.000Z"
				}
			],
			"atsSettings": {
				"useCustomATS": true,
				"screeningCriteria": [
					{
						"field": "skills",
						"operator": "contains",
						"value": "Surgical Prep"
					}
				]
			},
			"companyName": "ABC Hospita",
			"totalApplications": 0,
			"applicationsByStatus": {
				"Applied": 0,
				"Shortlisted": 0,
				"Interviewing": 0,
				"Offered": 0,
				"Rejected": 0,
				"Hired": 0
			},
			"candidatesMetadata": [],
			"metrics": {
				"daysActive": 7,
				"isDeadlinePassed": false,
				"hasInterviewSlots": true,
				"isRemote": false,
				"uniqueCandidatesCount": 0,
				"averageAtsScore": 0
			}
		}
	]
}
```

---


## 🛡️ Error Responses

| Error | Description |
|-------|-------------|
| `Validation failed` | Missing or malformed fields like `user_Id`, `company_name` |
| `Invalid employer ID format` | Sent ID is not a valid MongoDB ObjectId |
| `An employer already exists for this user` | Duplicate `user_Id` found |
| `User not found for user_Id` | Referenced User does not exist |
| `Some job IDs do not exist` | Invalid job IDs were passed in `job_Postings` |

---

## 🧠 Helper Functions (Used Internally)

| Function | Purpose |
|--------|---------|
| `secureEmployerData()` | Validates and sanitizes request body |
| `uploadFile()` | Uploads profile image to Cloudinary |
| `parseJsonFields()` | Parses JSON strings in form data |
| `validateReferences()` | Ensures `user_Id` and `job_Postings` exist in DB |
| `filterEmployerFields()` | Strips unknown or unsafe fields during update |

---

## ✅ Summary Table

| Feature | Status |
|--------|--------|
| Input validation (`Joi`) | ✅ Done |
| Data sanitization (`xss`) | ✅ Done |
| File upload integration | ✅ Done |
| Reference validation | ✅ Done |
| Immutable field protection | ✅ Done |
| Structured response format | ✅ Done |
| Logging support | ✅ Done |
| ObjectId validation | ✅ Done |
| Query filtering | ✅ Done |