Here’s a **MongoDB database schema design** for your **AI-Powered Recruitment Web App** using **Mongoose (Node.js ORM)**.

---

## **Database Schema Design**

### **1. Users Collection (`users`)**
- Stores both **Job Seekers** and **Employers**.
- Uses a `role` field to differentiate between them.

```ts
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["job_seeker", "employer"], required: true },
    profileImage: { type: String },
    location: { type: String },
    resume: { type: String }, // URL to the uploaded resume (for job seekers)
    company: { type: String }, // Only for employers
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
```

---

### **2. Jobs Collection (`jobs`)**
- Stores job postings created by **employers**.

```ts
const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String, required: true },
    employer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    location: { type: String },
    salaryRange: { type: String },
    jobType: { type: String, enum: ["full-time", "part-time", "remote", "contract"], required: true },
    skillsRequired: [{ type: String }],
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // List of applied users
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
```

---

### **3. Applications Collection (`applications`)**
- Tracks job applications from **Job Seekers**.

```ts
const ApplicationSchema = new mongoose.Schema(
  {
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    applicantId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    resume: { type: String, required: true }, // Resume URL
    status: { type: String, enum: ["pending", "shortlisted", "rejected", "hired"], default: "pending" },
    aiScore: { type: Number, min: 0, max: 100 }, // AI-calculated match score
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", ApplicationSchema);
```

---

### **4. AI Resume Analysis (`ai_resume_analysis`)**
- Stores AI-extracted data for resume screening.

```ts
const AIResumeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    extractedSkills: [{ type: String }], // AI-extracted skills
    experienceYears: { type: Number },
    jobMatchPercentage: { type: Number, min: 0, max: 100 },
    recommendations: [{ type: String }], // AI suggestions for improvement
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AIResume", AIResumeSchema);
```

---

### **5. Messages (for AI Chatbot & Employer Communication)**
- Stores chat messages between **employers and candidates**.

```ts
const MessageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    isAIResponse: { type: Boolean, default: false }, // Whether AI chatbot sent the message
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
```

---

## **Relationships Between Collections**
- **Users ↔ Jobs**: Employers create job postings.
- **Users ↔ Applications**: Job seekers apply for jobs.
- **Applications ↔ AI Resume Analysis**: AI evaluates applicants.
- **Users ↔ Messages**: Communication between employers, candidates, and the AI chatbot.

---

## **Next Steps**
Would you like:
1. **Boilerplate Node.js/MongoDB project setup?** 🚀  
2. **REST API endpoints for CRUD operations?**  
3. **GraphQL integration for efficient queries?**  

Let me know how you want to proceed! 😊
