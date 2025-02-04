


// Function to extract passport fields
const parsePassportData = (text: string) => {
    return {
        passportNumber: text.match(/Passport Number\s*([A-Z0-9]+)/i)?.[1] || "",
        surname: text.match(/Surname\s*([\w\s]+)/i)?.[1] || "",
        givenNames: text.match(/Given Names\s*([\w\s]+)/i)?.[1] || "",
        nationality: text.match(/Nationality\s*([\w\s]+)/i)?.[1] || "",
        dateOfBirth: text.match(/Date of Birth\s*(\d{2}[-/]\d{2}[-/]\d{4})/i)?.[1] || "",
        gender: text.match(/Gender\s*([MF])/i)?.[1] || "",
        dateOfIssue: text.match(/Date of Issue\s*(\d{2}[-/]\d{2}[-/]\d{4})/i)?.[1] || "",
        dateOfExpiry: text.match(/Date of Expiry\s*(\d{2}[-/]\d{2}[-/]\d{4})/i)?.[1] || "",
        citizenshipId: text.match(/National Identity Number\s*([\d\w]+)/i)?.[1] || "",
        placeOfBirth: text.match(/Place of Birth\s*([\w\s]+)/i)?.[1] || "",
        issuingAuthority: text.match(/Issuing Authority\s*([\w\s]+)/i)?.[1] || "",
    };
};
