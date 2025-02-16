import mongoose from "mongoose";

const jobSeekerSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Hashed password
    phone: { type: String, required: true },
    nationality: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    dateOfBirth: { type: Date, required: true },
    placeOfBirth: { type: String, required: true },

    passport: {
        passportNumber: { type: String, required: true, unique: true },
        dateOfIssue: { type: Date, required: true },
        dateOfExpiry: { type: Date, required: true },
        issuingAuthority: { type: String, required: true },
        citizenshipId: { type: String },
        holderSignature: { type: String }
    },

    jobPreferences: {
        desiredJobTitle: { type: String, required: true },
        preferredCountries: [{ type: String, required: true }],
        expectedSalary: { type: Number, required: true },
        jobType: { type: String, enum: ["Full-time", "Part-time", "Contract", "Freelance"], required: true },
        industries: [{ type: String, required: true }]
    },

    skills: [{ type: String, required: true }],
    experience: [
        {
            company: { type: String, required: true },
            position: { type: String, required: true },
            startDate: { type: Date, required: true },
            endDate: { type: Date },
            description: { type: String }
        }
    ],

    education: [
        {
            institution: { type: String, required: true },
            degree: { type: String, required: true },
            startDate: { type: Date, required: true },
            endDate: { type: Date }
        }
    ],

    resume: { type: String, default: null },
    profilePhoto: { type: String, default: null },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const JobSeeker = mongoose.models.JobSeeker || mongoose.model("JobSeeker", jobSeekerSchema);

export default JobSeeker;
