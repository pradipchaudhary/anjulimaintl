# Architecture

- Next.js (App Router)
- Mongoose for MongoDB
- Domain-driven layout in `features/`
- Services handle API calls client-side
- API routes inside `app/api/*` use Mongoose directly
- Zustand for light client state
