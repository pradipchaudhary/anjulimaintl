import { Schema, model, models } from "mongoose";

const CompanySchema = new Schema({
    name: String,
    address: String,
});

export default models.Company || model("Company", CompanySchema);
