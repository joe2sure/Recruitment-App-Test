import React, { useState, useEffect } from "react";
import JobListingTable from "./JobListingTable";
import ApplicantsPipeline from "./ApplicantsPipeline";
import ApplicantsTable from "./ApplicantsTable";
import JobTabs from "./JobTabs";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

// API service functions (to be implemented with your backend)
const jobService = {
  async getJobs(page = 1, search = "") {
    // Replace with actual API call
    // return await fetch(`/api/jobs?page=${page}&search=${search}`, {
    //   method: 'GET',
    //   headers: { 'Authorization': `Bearer ${token}` }
    // }).then(res => res.json());

    // Mock implementation for now
    let filteredJobs = SAMPLE_JOBS;
    if (search && search.trim() !== "") {
      const lowerSearch = search.toLowerCase();
      filteredJobs = SAMPLE_JOBS.filter((job) =>
        job.title.toLowerCase().includes(lowerSearch)
      );
    }
    return {
      jobs: filteredJobs,
      totalPages: 5,
      currentPage: page,
      total: filteredJobs.length,
    };
  },

  async getJobDetails(jobId) {
    // Replace with actual API call
    // return await fetch(`/api/jobs/${jobId}`, {
    //   method: 'GET',
    //   headers: { 'Authorization': `Bearer ${token}` }
    // }).then(res => res.json());

    // Mock implementation
    return SAMPLE_JOBS.find((job) => job.id === jobId);
  },

  async getApplicants(jobId, page = 1) {
    // Replace with actual API call
    // return await fetch(`/api/jobs/${jobId}/applicants?page=${page}`, {
    //   method: 'GET',
    //   headers: { 'Authorization': `Bearer ${token}` }
    // }).then(res => res.json());

    // Mock implementation
    const job = SAMPLE_JOBS.find((j) => j.id === jobId);
    return {
      applicants: job?.applicantsList || [],
      totalPages: 1,
      currentPage: page,
      total: job?.applicantsList?.length || 0,
    };
  },

  async updateJob(jobId, jobData) {
    // Replace with actual API call
    // return await fetch(`/api/jobs/${jobId}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   },
    //   body: JSON.stringify(jobData)
    // }).then(res => res.json());

    console.log("Updating job:", jobId, jobData);
    return { success: true };
  },
};

// Sample data (to be replaced with API data)
const SAMPLE_JOBS = [
  {
    id: 1,
    title: "Social Media Assistant",
    status: "Live",
    datePosted: "2024-05-20T00:00:00Z",
    dueDate: "2024-05-24T00:00:00Z",
    type: "Fulltime",
    applicants: 19,
    applied: "4 / 11",
    category: "Design",
    hired: 4,
    total: 11,
    description:
      "We are looking for a creative and enthusiastic Social Media Assistant to join our marketing team.",
    responsibilities: [
      "Create engaging content for social media platforms",
      "Monitor social media channels and respond to comments",
      "Analyze social media metrics and prepare reports",
      "Collaborate with the marketing team on campaigns",
      "Stay up-to-date with social media trends",
      "Assist in developing social media strategies",
    ],
    requirements: [
      "Bachelor's degree in Marketing, Communications, or related field",
      "2+ years of experience in social media management",
      "Proficiency in social media platforms (Facebook, Instagram, Twitter, LinkedIn)",
      "Strong written and verbal communication skills",
    ],
    niceToHaves: [
      "Fluent in English",
      "Project management skills",
      "Copy editing skills",
    ],
    skills: [
      "Project Management",
      "Copywriting",
      "English",
      "Social Media Marketing",
      "Copy Editing",
    ],
    categories: ["Marketing", "Design"],
    salary: {
      min: 75000,
      max: 85000,
      currency: "USD",
    },
    benefits: [
      "Full Healthcare",
      "Unlimited Vacation",
      "Skill Development",
      "Commuter Benefits",
      "We give back",
      "Team Summits",
      "Remote Working",
    ],
    applicantsList: [
      {
        id: 1,
        name: "Jake Gyll",
        email: "jake.gyll@email.com",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        stage: "In Review",
        appliedDate: "2021-07-13T00:00:00Z",
        resume: "/resumes/jake-gyll.pdf",
        coverLetter: "I am excited to apply for this position...",
      },
      {
        id: 2,
        name: "Jane Cooper",
        email: "jane.cooper@email.com",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        stage: "Shortlisted",
        appliedDate: "2021-07-13T00:00:00Z",
        resume: "/resumes/jane-cooper.pdf",
        coverLetter: "With my background in social media...",
      },
      {
        id: 3,
        name: "Floyd Miles",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        stage: "Interview",
        appliedDate: "13 July, 2021",
      },
      {
        id: 4,
        name: "Jenny Wilson",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        stage: "In Review",
        appliedDate: "13 July, 2021",
      },
      {
        id: 5,
        name: "Courtney Henry",
        avatar: "https://randomuser.me/api/portraits/men/67.jpg",
        stage: "Shortlisted",
        appliedDate: "13 July, 2021",
      },
      {
        id: 6,
        name: "Devon Lane",
        avatar: "https://randomuser.me/api/portraits/men/23.jpg",
        stage: "Interview",
        appliedDate: "13 July, 2021",
      },
      {
        id: 7,
        name: "Jacob Jones",
        avatar: "https://randomuser.me/api/portraits/men/12.jpg",
        stage: "In Review",
        appliedDate: "13 July, 2021",
      },
      {
        id: 8,
        name: "Wade Warren",
        avatar: "https://randomuser.me/api/portraits/men/14.jpg",
        stage: "In Review",
        appliedDate: "13 July, 2021",
      },
      {
        id: 9,
        name: "Marvin McKinney",
        avatar: "https://randomuser.me/api/portraits/men/15.jpg",
        stage: "Interview",
        appliedDate: "13 July, 2021",
      },
    ],
  },
  {
    id: 2,
    title: "Senior Designer",
    status: "Live",
    datePosted: "16 May 2020",
    dueDate: "24 May 2020",
    type: "Fulltime",
    applicants: "1,234",
    applied: "0 / 20",
  },
  {
    id: 3,
    title: "Visual Designer",
    status: "Live",
    datePosted: "15 May 2020",
    dueDate: "24 May 2020",
    type: "Freelance",
    applicants: "2,435",
    applied: "1 / 5",
  },
  {
    id: 4,
    title: "Data Science",
    status: "Closed",
    datePosted: "13 May 2020",
    dueDate: "24 May 2020",
    type: "Freelance",
    applicants: "6,234",
    applied: "10 / 10",
  },
  {
    id: 5,
    title: "Kotlin Developer",
    status: "Closed",
    datePosted: "12 May 2020",
    dueDate: "24 May 2020",
    type: "Fulltime",
    applicants: 12,
    applied: "20 / 20",
  },
  {
    id: 6,
    title: "React Developer",
    status: "Closed",
    datePosted: "11 May 2020",
    dueDate: "24 May 2020",
    type: "Fulltime",
    applicants: 14,
    applied: "10 / 10",
  },
];

function Section({ title, items = [], isEditable = false }) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-lg mb-3">{title}</h3>
      <ul className="space-y-3 pl-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm">
            <Checkbox
              id={`${title}-${i}`}
              className="mt-0.5 flex-shrink-0"
              disabled={!isEditable}
            />
            <label htmlFor={`${title}-${i}`} className="leading-relaxed">
              {item}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
    </div>
  );
}

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <p className="text-red-600 mb-4">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          Try Again
        </Button>
      )}
    </div>
  );
}

export default function JobListingMainPage() {
  // State management
  const [view, setView] = useState("job-listing");
  const [tab, setTab] = useState("applicants");
  const [search, setSearch] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [page, setPage] = useState(1);
  const [applicantPage, setApplicantPage] = useState(1);

  // Data state
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [jobDetails, setJobDetails] = useState(null);

  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [applicantsLoading, setApplicantsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [applicantsError, setApplicantsError] = useState(null);

  // Pagination state
  const [totalPages, setTotalPages] = useState(1);
  const [applicantTotalPages, setApplicantTotalPages] = useState(1);

  // Load jobs on component mount and when page/search changes
  useEffect(() => {
    loadJobs();
  }, [page, search]);

  // Load applicants when selected job changes
  useEffect(() => {
    if (selectedJob) {
      loadJobDetails(selectedJob.id);
      if (tab === "applicants") {
        loadApplicants(selectedJob.id);
      }
    }
  }, [selectedJob, applicantPage, tab]);

  // Load applicants when search changes
  useEffect(() => {
    if (selectedJob && tab === "applicants") {
      setApplicantPage(1);
      loadApplicants(selectedJob.id);
    }
  }, [search]);

  const loadJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await jobService.getJobs(page, search);
      setJobs(response.jobs);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError("Failed to load jobs. Please try again.");
      console.error("Error loading jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadJobDetails = async (jobId) => {
    try {
      const details = await jobService.getJobDetails(jobId);
      setJobDetails(details);
    } catch (err) {
      console.error("Error loading job details:", err);
    }
  };

  const loadApplicants = async (jobId) => {
    try {
      setApplicantsLoading(true);
      setApplicantsError(null);
      const response = await jobService.getApplicants(jobId, applicantPage);
      setApplicants(response.applicants);
      setApplicantTotalPages(response.totalPages);
    } catch (err) {
      setApplicantsError("Failed to load applicants. Please try again.");
      console.error("Error loading applicants:", err);
    } finally {
      setApplicantsLoading(false);
    }
  };

  const handleJobSelect = (job) => {
    setSelectedJob(job);
    setTab("applicants");
    setSearch("");
    setApplicantPage(1);
  };

  const handleBackToJobs = () => {
    setSelectedJob(null);
    setJobDetails(null);
    setApplicants([]);
    setSearch("");
    setView("job-listing");
  };

  const handleTabChange = (newTab) => {
    setTab(newTab);
    if (newTab === "applicants" && selectedJob) {
      loadApplicants(selectedJob.id);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatSalary = (salary) => {
    if (!salary) return "Competitive";
    return `$${salary.min.toLocaleString()} - $${salary.max.toLocaleString()} ${
      salary.currency
    }`;
  };

  if (loading && jobs.length === 0) {
    return (
      <div className="flex flex-col flex-1 bg-white">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-white">
      {!selectedJob ? (
        <>
          <h1 className="text-3xl font-bold mt-6 mb-2 px-8">Job Listing</h1>
          <p className="text-gray-500 mb-4 px-8">
            Here is your jobs listing status from July 19 - July 25.
          </p>
          <div className="px-8 mb-4">
            <SearchBar
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon="calendar"
            />
          </div>

          {error ? (
            <div className="px-8">
              <ErrorMessage message={error} onRetry={loadJobs} />
            </div>
          ) : (
            <>
              <JobListingTable
                jobs={jobs}
                search={search}
                onSelectJob={handleJobSelect}
                loading={loading}
              />
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </>
          )}
        </>
      ) : (
        <>
          <div className="flex items-center gap-2 px-8 mt-6 mb-2">
            <button
              onClick={handleBackToJobs}
              className="text-xl text-gray-500 hover:text-black transition-colors"
              aria-label="Back to jobs"
            >
              &larr;
            </button>
            <h1 className="text-2xl font-bold">{selectedJob.title}</h1>
          </div>
          <div className="px-8">
            <div className="text-gray-500 mb-2">
              {selectedJob.category || "Design"} &middot; {selectedJob.type}{" "}
              &middot; {selectedJob.hired || 0} / {selectedJob.total || 0} Hired
            </div>

            <JobTabs tab={tab} setTab={handleTabChange} />

            {tab === "applicants" && (
              <>
                <div className="mt-4 mb-2">
                  <div className="text-lg font-medium">
                    Total Applicants: {applicants.length}
                  </div>
                </div>

                <div className="flex gap-2 mb-2">
                  <SearchBar
                    placeholder="Search Applicants"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <div className="flex h-full">
                    <button
                      className={`px-4 py-2 font-medium min-w-[120px] whitespace-nowrap transition-colors ${
                        view === "pipeline"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      onClick={() => setView("pipeline")}
                    >
                      Pipeline View
                    </button>
                    <button
                      className={`px-4 py-2 font-medium min-w-[120px] whitespace-nowrap transition-colors ${
                        view === "table"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      onClick={() => setView("table")}
                    >
                      Table View
                    </button>
                  </div>
                </div>

                {applicantsLoading ? (
                  <LoadingSpinner />
                ) : applicantsError ? (
                  <ErrorMessage
                    message={applicantsError}
                    onRetry={() => loadApplicants(selectedJob.id)}
                  />
                ) : (
                  <>
                    {view === "pipeline" ? (
                      <ApplicantsPipeline
                        applicants={applicants}
                        search={search}
                        loading={applicantsLoading}
                      />
                    ) : (
                      <ApplicantsTable
                        applicants={applicants}
                        search={search}
                        loading={applicantsLoading}
                      />
                    )}
                    <Pagination
                      page={applicantPage}
                      totalPages={applicantTotalPages}
                      onPageChange={setApplicantPage}
                    />
                  </>
                )}
              </>
            )}

            {tab === "job-details" && (
              <div className="mt-4 mb-2">
                {!jobDetails ? (
                  <LoadingSpinner />
                ) : (
                  <div className="space-y-6">
                    {/* Header Section */}
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">
                        {jobDetails.title}
                      </h2>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200 transition-colors"
                        onClick={() => {
                          // Handle edit job details
                          console.log("Edit job details for:", jobDetails.id);
                        }}
                      >
                        Edit Job Details
                      </Button>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                      {/* Left Column - Main Content */}
                      <div className="lg:col-span-2 space-y-6">
                        {/* Responsibilities */}
                        <Section
                          title="Responsibilities"
                          items={jobDetails.responsibilities || []}
                          isEditable={false}
                        />

                        {/* Who You Are */}
                        <Section
                          title="Who You Are"
                          items={jobDetails.requirements || []}
                          isEditable={false}
                        />

                        {/* Nice-to-Haves */}
                        <div className="space-y-3">
                          <h3 className="font-semibold text-lg">
                            Nice-To-Haves
                          </h3>
                          <ul className="space-y-3 pl-1">
                            {(jobDetails.niceToHaves || []).map((item, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 text-sm"
                              >
                                <Checkbox
                                  id={`nice-to-have-${i}`}
                                  className="mt-0.5 flex-shrink-0"
                                />
                                <label
                                  htmlFor={`nice-to-have-${i}`}
                                  className="leading-relaxed"
                                >
                                  {item}
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Perks & Benefits */}
                        <div className="space-y-4">
                          <h3 className="font-semibold text-lg">
                            Perks & Benefits
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {(jobDetails.benefits || []).map((perk, index) => (
                              <Card
                                key={index}
                                className="h-full hover:shadow-md transition-shadow"
                              >
                                <CardContent className="pt-4 space-y-2">
                                  <h4 className="font-medium text-base">
                                    {perk}
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Nam scelerisque nec.
                                  </p>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Column - Sidebar - Aligned with "Who You Are" */}
                      <div className="lg:col-span-1 space-y-8 lg:mt-[180px]">
                        {/* About this role */}
                        <Card className="border-0 shadow-lg">
                          <CardContent className="pt-6 pb-4 space-y-4">
                            <div>
                              <div className="text-xl font-medium mb-2">
                                About this role
                              </div>
                              <Progress
                                value={
                                  (jobDetails.hired / jobDetails.total) * 100
                                }
                                className="h-2 border border-purple-500 mb-2"
                              />
                              <p className="text-sm text-muted-foreground">
                                {jobDetails.hired} applied of {jobDetails.total}{" "}
                                capacity
                              </p>
                            </div>

                            <Separator />

                            <div className="text-sm space-y-2">
                              <div className="flex justify-between">
                                <span className="font-medium">
                                  Apply Before:
                                </span>
                                <span>{formatDate(jobDetails.dueDate)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium">
                                  Job Posted On:
                                </span>
                                <span>{formatDate(jobDetails.datePosted)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium">Job Type:</span>
                                <span>{jobDetails.type}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium">Salary:</span>
                                <span>{formatSalary(jobDetails.salary)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium">Status:</span>
                                <Badge
                                  variant={
                                    jobDetails.status === "Live"
                                      ? "default"
                                      : "secondary"
                                  }
                                  className={
                                    jobDetails.status === "Live"
                                      ? "bg-green-100 text-green-700"
                                      : ""
                                  }
                                >
                                  {jobDetails.status}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Categories */}
                        <div className="space-y-3">
                          <h4 className="font-medium text-xl">Categories</h4>
                          <div className="flex gap-2 flex-wrap">
                            {(jobDetails.categories || []).map(
                              (category, i) => (
                                <Badge
                                  key={i}
                                  variant="secondary"
                                  className="bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors"
                                >
                                  {category}
                                </Badge>
                              )
                            )}
                          </div>
                        </div>

                        {/* Required Skills */}
                        <div className="space-y-3 lg:mt-[50px]">
                          <h4 className="font-medium text-xl">
                            Required Skills
                          </h4>
                          <div className="flex gap-2 flex-wrap">
                            {(jobDetails.skills || []).map((skill, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className="border-purple-500 bg-purple-500 text-black  transition-colors"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
