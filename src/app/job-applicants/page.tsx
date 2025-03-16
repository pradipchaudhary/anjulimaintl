'use client'
import React, { useEffect, useState } from 'react';

// Type definition for a job applicant
interface JobApplicant {
  _id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  passportNumber: string;
  dateOfBirth: string;
  gender: string;
  citizenshipNo: string;
  passportType: string;
  dateOfIssue: string;
  dateOfExpiry: string;
  placeOfBirth: string;
  nationality: string;
  holderSignature: string;
  contactNo: string;
  email: string;
  educationLevel: string;
  skills: string[];
  preferredCountry: string;
  preferredIndustry: string;
  workExperienceYears: number;
  passportScanLink: string;
  resumeLink: string;
  appliedDate: string;
}

const JobApplicants = () => {
  const [applicants, setApplicants] = useState<JobApplicant[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchApplicants = async () => {
      setLoading(true); // Set loading state to true
      try {
        const response = await fetch('api/job-applicants'); // Your API route
        const data = await response.json();
        if (data.success) {
          setApplicants(data.data);
        } else {
          setError("Failed to fetch applicants");
        }
      } catch (error) {
        setError("An error occurred while fetching applicants");
      } finally {
        setLoading(false); // Set loading state to false after data is fetched
      }
    };

    fetchApplicants();
  }, []);

  return (
    <div className="container mx-auto my-8 p-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Job Applicants</h1>
      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {applicants.length === 0 && <p className="text-center text-gray-500">No applicants available</p>}
      
      {applicants.length > 0 && (
        <div className="overflow-x-auto shadow-xl border border-gray-200 rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left">First Name</th>
                <th className="px-6 py-3 text-left">Middle Name</th>
                <th className="px-6 py-3 text-left">Last Name</th>
                <th className="px-6 py-3 text-left">Passport Number</th>
                <th className="px-6 py-3 text-left">Date of Birth</th>
                <th className="px-6 py-3 text-left">Gender</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Preferred Country</th>
                <th className="px-6 py-3 text-left">Education Level</th>
                <th className="px-6 py-3 text-left">Work Experience (Years)</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {applicants.map((applicant) => (
                <tr key={applicant._id} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-4">{applicant.firstName}</td>
                  <td className="px-6 py-4">{applicant.middleName}</td>
                  <td className="px-6 py-4">{applicant.lastName}</td>
                  <td className="px-6 py-4">{applicant.passportNumber}</td>
                  <td className="px-6 py-4">{applicant.dateOfBirth}</td>
                  <td className="px-6 py-4">{applicant.gender}</td>
                  <td className="px-6 py-4">{applicant.email}</td>
                  <td className="px-6 py-4">{applicant.preferredCountry}</td>
                  <td className="px-6 py-4">{applicant.educationLevel}</td>
                  <td className="px-6 py-4">{applicant.workExperienceYears}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default JobApplicants;
