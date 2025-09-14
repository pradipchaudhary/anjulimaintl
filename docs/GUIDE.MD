```javascript


// Helper type for context
type RouteContext = {
  params: { id: string };
};

```

 Example models/Company.ts:

```js
 import { Schema, model, models } from "mongoose";

const CompanySchema = new Schema({
  name: String,
  address: String,
});

export default models.Company || model("Company", CompanySchema);
``