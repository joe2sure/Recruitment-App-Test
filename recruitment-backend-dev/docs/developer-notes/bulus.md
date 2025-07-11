# Developer: Bulus Hamnu

### Tasks Completed:

### Routes:
**Endpoint:**  
- `POST /api/candidates/resume : for candidate resume upload`
- `POST /api/candidates : creating new candidate `
- `PATCH /api/candidates : updating candidate data`
- `GET /api/candidates : getting a candidate data`
- `DELETE /api/candidates : deleting a candidate` for admin use only..
- `GET /api/candidates/application`
- `PATCH /applications/:application_id : updating candidate application data`

### Notes:
- The resume upload endpoint use multer middleware to handle upload of file, only docx and pdf are supported.
- parse the resume and exact data : i have not work on parsing yet its kinda hard to extract info
- upload the resume to cloudinary 


**Endpoint:**  
## `POST /api/candidates/resume`  
**Content-Type:** `multipart/form-data`

---

#### ✅ HTML Form Example

```html
<form action="http://localhost:3500/api/candidates/resume/662f3ab2e7c8f2b9e07a6e03" method="POST" enctype="multipart/form-data">
    <input type="file" name="resume" />
    <input type="submit" value="Send">
</form>
```

#### ✅ Responses

```json
{
  "status": "true"
  "message" : "Resume was uploaded sucessfully", 
  "data" : "userData"
}
```

```json
{
  "status": "true",
  "error": "An error occur, no file uploaded" or "error": "Your PDF file is corrupted or unsupported."
}
```

**Endpoint:**  
## `POST /api/candidates`  

- this endpoint is use to create new candidate data you. will pass all the required field like name, email. user_Id etc through json body eg.. (it return the new candidate )

```json
{
  "full_name": "Jane Doe",
  "phone": "+1234567890",
  "email" : "jane@gmail.com",
  "location": {
    "city": "Lagos",
    "state": "Lagos State",
    "country": "Nigeria"
  },
  "resumeUrl": "https://example.com/resumes/jane_doe_resume.pdf",
  "parsed_ResumeData": {
    "education": [
      {
        "institution": "University of Lagos",
        "degree": "Bachelor of Science",
        "fieldOfStudy": "Computer Science",
        "startDate": "2015-09-01T00:00:00.000Z",
        "endDate": "2019-06-30T00:00:00.000Z"
      }
    ],
    "experience": [
      {
        "jobTitle": "Frontend Developer",
        "employer": "Tech Innovations Ltd.",
        "startDate": "2020-01-15T00:00:00.000Z",
        "endDate": "2022-12-01T00:00:00.000Z",
        "responsibilities": "Developed and maintained UI components using React.js"
      }
    ],
    "skills": ["JavaScript", "React", "HTML", "CSS"]
  },
  "credentials": [
    {
      "type": "Certificate",
      "issuingAuthority": "Coursera",
      "validUntil": "2026-12-31T00:00:00.000Z",
      "verified": true,
      "documentUrl": "https://example.com/certificate/12345"
    },
    {
      "type": "License",
      "issuingAuthority": "Microsoft",
      "validUntil": "2025-06-30T00:00:00.000Z",
      "verified": false,
      "documentUrl": "https://example.com/license/abcde"
    }
  ],
  "applications": [ ],
  "training_Progress": [ ],
  "interview_Schedule": [ ],
}
```
`Response`  
```json
{
  "status" : "true",
  "message" : "Candidate was created succesfully",
  "data" : "candidate data"
}
```

- field like credentials, experience, and parsed_ResumeData especially is not necessary beacause you can use the resume upload endpoint and parse/ upload the file . also the remaining field you can update them using the PUT method

<!-- **Endpoint:**  
`PATCH /api/candidates` 
- using this endpoint to update the remaining candidate data by field like  -->

**Endpoint:**  
## `PATCH /api/candidates` 

- example updating/appending an array like credential, parsed_ResumeData, applications
```json

  {
    "credentials" : {
        "action" : "append",
        "value" :
            {
              "type": "National ID",
              "issuingAuthority": "National Identity Management Commission",
              "validUntil": "2032-12-31T00:00:00.000Z",
              "verified": true,
              "documentUrl": "https://example.com/docs/national-id.pdf"
            }
    }
}
```

- when the action is specify as append it will append the value to the field of array specific

`Response example`
```json
{
  "status" : "true",
  "message" : "Candidate credentails updated sucessfully"
}
```
- Same for removing just specify the action as "remove" and pass the exact value, value passed must match the shape of the object to remove


```json
{
    "credentials" : {
        "action" : "remove",
        "value" :
            {
              "type": "National ID",
              "issuingAuthority": "National Identity Management Commission",
              "validUntil": "2032-12-31T00:00:00.000Z",
              "verified": true,
              "documentUrl": "https://example.com/docs/national-id.pdf"
            }
    }
}
```

- updating for a singler field you can do this  

**Endpoint:**  
## `PATCH /api/candidates` 

```json
{
    "full_name" : "Bulus Hamnu",
    "phone" : "+234 999666888"
}
```
- location is also a single items as well because all the item object related so changing one will change all

`Request example`
```json
{
    "location" : {
        "city" : "bauchi",
        "state" : "bauchi state",
        "country" : "Nigeria"
    }
}
```

- getting a sepecific candidate 
**Endpoint:**  
## `POST api/candidates`  

```json
{
  "status" : "true"
  "data" : { 
    // candidate data 
    }
}
```


- create a candidate application
**Endpoint:**  
## `POST /api/candidates/application` 

`Request Example`
```json
{
  "jobId": "68373b8c3452c9b8ba497002",
  "employerId": "68373639cefe73a8033d1612",
  "resumeUrl": "https://res.cloudinary.com/dfggah7yq/raw/upload/v1748343095/resumes/1748343094304_Amaka_Okoye_Resume.pdf",
  "coverLetter": "I am excited to contribute to your global health initiative with my background in epidemiology.",
  "currentStage": "Shortlisted",
  "atsScore": 78,
  "feedback": [
    {
      "reviewer": "60dfc3eabb1f2945e4a9f901",
      "note": "Candidate shows promise, needs a deeper technical screening.",
      "createdAt": "2025-05-25T09:15:00.000Z"
    }
  ],
  "interviewSchedule": [
    {
      "start": "2025-06-05T10:00:00.000Z",
      "end": "2025-06-05T10:45:00.000Z",
      "interviewer": "60dfc3eabb1f2945e4a9f901",
      "status": "Scheduled",
      "notes": "Technical interview covering statistical tools and real-life cases."
    }
  ],
  "assessments": [
    {
      "assessmentId": "65a12ef8cc33d47b8e2ac112",
      "score": 85,
      "completed": true
    }
  ],
  "isWithdrawn": false,
  "notes": "Pending second round review."
}
```
`Response Example`
```json
{
    "status": true,
    "message" : "Candidate application created sucessfully"
    "data": [
        {
            "_id": "683828866883c2dac7b58ba0",
            "jobId": "68373b8c3452c9b8ba497002",
            "candidateId": "683592b81ac3c2ffb7dc7652",
            "employerId": "68373639cefe73a8033d1612",
            "resumeUrl": "https://res.cloudinary.com/dfggah7yq/raw/upload/v1748343095/resumes/1748343094304_Amaka_Okoye_Resume.pdf",
            "coverLetter": "I am excited to contribute to your global health initiative with my background in epidemiology.",
            "currentStage": "Shortlisted",
            "atsScore": 78,
            "feedback": [
                {
                    "reviewer": "60dfc3eabb1f2945e4a9f901",
                    "note": "Candidate shows promise, needs a deeper technical screening.",
                    "createdAt": "2025-05-25T09:15:00.000Z",
                    "_id": "683828866883c2dac7b58ba1"
                }
            ],
            "interviewSchedule": [
                {
                    "start": "2025-06-05T10:00:00.000Z",
                    "end": "2025-06-05T10:45:00.000Z",
                    "interviewer": "60dfc3eabb1f2945e4a9f901",
                    "status": "Scheduled",
                    "notes": "Technical interview covering statistical tools and real-life cases.",
                    "_id": "683828866883c2dac7b58ba2"
                }
            ],
            "assessments": [
                {
                    "assessmentId": "65a12ef8cc33d47b8e2ac112",
                    "score": 85,
                    "completed": true,
                    "_id": "683828866883c2dac7b58ba3"
                }
            ],
            "isWithdrawn": false,
            "notes": "Pending second round review.",
            "createdAt": "2025-05-29T09:27:34.750Z",
            "updatedAt": "2025-05-29T09:27:34.750Z",
            "__v": 0
        }
    ]
}
```

- Getting a list of candidate applications
**Endpoint:**  
## `GET /api/candidates/application` 
- you query with the user_Id if it valid and a candidate already exist it will return a list of the candidate applications 
- when creating application candidate id is to be pass as `candidateId`

`Reponse Example`
```json
{
    "status" : true,
    "data": [
        {
            "_id": "6821be37cf6331713cf42672",
            "jobId": "665fe0b45b5ae2e07c7e01a6",
            "candidateId": "6820e7277ad581a6740f7e92",
            "employerId": "665fe0935b5ae2e07c7e01a8",
            "resumeUrl": "https://example.com/resumes/amina_lab.pdf",
            "coverLetter": "Motivated lab technician with strong diagnostic skills and attention to detail.",
            "currentStage": "Shortlisted",
            "atsScore": 90,
            "feedback": [
                {
                    "reviewer": "665fe0835b5ae2e07c7e01a9",
                    "note": "Very sharp on laboratory safety and testing standards.",
                    "_id": "6821be37cf6331713cf42673",
                    "createdAt": "2025-05-12T09:24:07.829Z"
                }
            ],
            "interviewSchedule": [],
            "assessments": [
                {
                    "assessmentId": "665fe0735b5ae2e07c7e01aa",
                    "score": 86,
                    "completed": true,
                    "_id": "6821be37cf6331713cf42674"
                }
            ],
            "isWithdrawn": false,
            "notes": "Ready for night shifts.",
            "__v": 0,
            "createdAt": "2025-05-12T09:24:07.845Z",
            "updatedAt": "2025-05-12T09:24:07.845Z"
        }
    ]
}
```
 
 or 

```json
{
  "status" : "true",
  "message" : "No applicatons found"
}
```


- updating a candidate application data
**Endpoint:**  
## `PATCH /api/candidates/application` 

- updating an application data, you can do one, can do many, or set as null to delete
`Request Example`
```json
{
  "resumeUrl": "resume url",
  "coverLetter": "Pls hire me"
}
```

- appending to an array field in the candidate application works just like the in the candidate api. pass a field specify the action and pass the value
`Request Example`
```json
{
  "feedback": {
    "action": "append",
    "value":{
        "reviewer": "665a9d2e4e98c4a8e39f4c10",
        "note": "Strong understanding of procedures"
      }
  }  
}
```

- to remove an item from candidate application array field, you need to pass the exact value and specify the action as remove then the value passed must match the shape of the object to remove

`Request Example`
```json
{
  "feedback": {
    "action": "remove",
    "value":{
        "reviewer": "665a9d2e4e98c4a8e39f4c10",
        "note": "Strong understanding of procedures"
      }
  }
}
```

### bear with me i'm not good at writting docs

