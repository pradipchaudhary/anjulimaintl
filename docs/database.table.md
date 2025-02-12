Here’s the **database schema design** for your **AI-Powered Recruitment Web App** using **MongoDB (NoSQL)**.

---

## **Database Schema Design**
### **1. Users Collection (`users`)**
- Stores **Job Seekers** and **Employers**.
- Uses a `role` field to differentiate them.

| Field        | Type                         | Description |
|-------------|-----------------------------|-------------|
| `_id`       | `ObjectId`                   | Unique identifier |
| `name`      | `String`                      | User's full name |
| `email`     | `String (unique)`             | User's email address |
| `password`  | `String`                      | Hashed password |
| `role`      | `Enum("job_seeker", "employer")` | Defines user type |
| `profileImage` | `String`                  | Profile picture URL |
| `location`  | `String`                      | User's location |
| `resume`    | `String`                      | Resume file URL (for job seekers) |
| `company`   | `String`                      | Company name (for employers) |
| `createdAt` | `Date`                        | Account creation date |

---

### **2. Jobs Collection (`jobs`)**
- Stores job listings posted by **Employers**.

| Field          | Type                         | Description |
|---------------|-----------------------------|-------------|
| `_id`        | `ObjectId`                   | Unique identifier |
| `title`      | `String`                      | Job title |
| `description` | `String`                     | Job details |
| `company`    | `String`                      | Employer’s company name |
| `employer`   | `ObjectId (ref: users)`       | Employer ID |
| `location`   | `String`                      | Job location |
| `salaryRange` | `String`                     | Salary range (e.g., $50k-$70k) |
| `jobType`    | `Enum("full-time", "part-time", "remote", "contract")` | Type of job |
| `skillsRequired` | `Array[String]`           | List of required skills |
| `applicants` | `Array[ObjectId] (ref: users)` | Users who applied for the job |
| `createdAt`  | `Date`                        | Date when job was posted |

---

### **3. Applications Collection (`applications`)**
- Stores job applications from **Job Seekers**.

| Field        | Type                         | Description |
|-------------|-----------------------------|-------------|
| `_id`       | `ObjectId`                   | Unique identifier |
| `jobId`     | `ObjectId (ref: jobs)`       | Job applied for |
| `applicantId` | `ObjectId (ref: users)`    | User applying |
| `resume`    | `String`                      | Resume file URL |
| `status`    | `Enum("pending", "shortlisted", "rejected", "hired")` | Application status |
| `aiScore`   | `Number (0-100)`              | AI-calculated match score |
| `createdAt` | `Date`                        | Date of application |

---

### **4. AI Resume Analysis (`ai_resume_analysis`)**
- Stores AI-extracted data for **resume screening**.

| Field            | Type                         | Description |
|-----------------|-----------------------------|-------------|
| `_id`           | `ObjectId`                   | Unique identifier |
| `userId`        | `ObjectId (ref: users)`      | Applicant ID |
| `extractedSkills` | `Array[String]`            | AI-extracted skills |
| `experienceYears` | `Number`                   | Years of experience |
| `jobMatchPercentage` | `Number (0-100)`        | AI job match score |
| `recommendations` | `Array[String]`            | AI-generated improvement tips |
| `createdAt`     | `Date`                        | Analysis date |

---

### **5. Messages Collection (`messages`)**
- Stores chat messages between **Employers and Candidates** or **AI Chatbot responses**.

| Field        | Type                         | Description |
|-------------|-----------------------------|-------------|
| `_id`       | `ObjectId`                   | Unique identifier |
| `sender`    | `ObjectId (ref: users)`      | Message sender ID |
| `receiver`  | `ObjectId (ref: users)`      | Message receiver ID |
| `message`   | `String`                      | Message text |
| `isAIResponse` | `Boolean (default: false)` | If AI chatbot sent the message |
| `createdAt` | `Date`                        | Timestamp |

---

### **Relationships Between Collections**
- **Users ↔ Jobs**: Employers create job postings.
- **Users ↔ Applications**: Job seekers apply for jobs.
- **Applications ↔ AI Resume Analysis**: AI evaluates applicants.
- **Users ↔ Messages**: Communication between employers, candidates, and the AI chatbot.

---

## **Next Steps**
Would you like:
1. **ER Diagram for visualization?**  
2. **Database indexing strategy for fast searches?**  
3. **Boilerplate schema code in Mongoose?**  

Let me know how you want to proceed! 🚀
