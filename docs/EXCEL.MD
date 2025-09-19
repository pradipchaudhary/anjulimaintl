Got it 👍 — you want me to generate a **sample Excel file format** that matches your `Medical` schema so you (or users) can download it and then fill in data for import.

Your schema requires these fields:

* **Name**
* **Email**
* **Address**
* **Phone**

---

## 1. Excel Format Example

| Name       | Email                                       | Address   | Phone      |
| ---------- | ------------------------------------------- | --------- | ---------- |
| John Doe   | [john@example.com](mailto:john@example.com) | Kathmandu | 9812345678 |
| Jane Smith | [jane@example.com](mailto:jane@example.com) | Lalitpur  | 9801234567 |
| Raj Sharma | [raj@gmail.com](mailto:raj@gmail.com)       | Bhaktapur | 9823456789 |

⚠️ **Important:** Column headers **must match exactly** (`Name, Email, Address, Phone`) otherwise the import will fail.

---

## 2. Generate Excel File via API (Next.js)

You can add an API endpoint to generate and download the Excel file.

### `app/api/medicals/export-template/route.ts`

```ts
import { NextResponse } from "next/server";
import * as XLSX from "xlsx";

export async function GET() {
  try {
    // Sample rows
    const data = [
      { Name: "John Doe", Email: "john@example.com", Address: "Kathmandu", Phone: "9812345678" },
      { Name: "Jane Smith", Email: "jane@example.com", Address: "Lalitpur", Phone: "9801234567" },
    ];

    // Convert JSON → worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Medical");

    // Write Excel file to buffer
    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Disposition": "attachment; filename=medical-template.xlsx",
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

---

## 3. Add Download Button in `MedicalList`

```tsx
<Link
  href="/api/medicals/export-template"
  className="border border-primary px-4 py-1.5 rounded"
>
  Download Template
</Link>
```

---

✅ Now users can **download the Excel template**, fill it with data, and then upload it on your **Import page**.

Do you want me to also generate a **full export (all Medical records to Excel)** in addition to just the **template**?
