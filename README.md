Mini Expense Manager
=====================

This repository contains a small full-stack Expense Manager app (Frontend: React + TypeScript, Backend: Node.js + Express + TypeScript, Database: PostgreSQL). It implements:

- Manual expense entry (date, amount, vendor, description)
- CSV upload of multiple expenses
- Rule-based vendor → category mapping
- Anomaly detection: expense flagged if amount > 3× category average
- Dashboard: monthly totals per category, top 5 vendors, anomaly list

Important note: The original assignment suggested a Spring Boot backend; this implementation uses the existing Node/TypeScript backend in this workspace for speed and consistency with the provided code.

Repository layout (relevant)
- backend/: Express + TypeScript server, DB code, controllers, utils
- frontend/my-app/: React + TypeScript frontend

Setup (development)

1) Install dependencies

Backend

```bash
cd backend
npm install
```

Frontend

```bash
cd frontend/my-app
npm install
```

2) Start PostgreSQL

Option B — Local Postgres:
- Ensure Postgres is running and accessible at the host and port in `.env`.

3) Configure backend environment

Create `backend/.env` (example already included in the repo). Required variables:

```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=Moin@7644
DB_NAME=postgres
```

4) Database schema (SQL)

Run the SQL below once to create the `expenses` table used by the app. You can run it with `psql` or any PG client.

```sql
CREATE TABLE IF NOT EXISTS expenses (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  amount NUMERIC NOT NULL,
  vendor TEXT NOT NULL,
  description TEXT,
  category TEXT,
  is_anomaly BOOLEAN DEFAULT FALSE
);

-- Optional: vendor → category mapping table used by the backend `getCategory()` helper
CREATE TABLE IF NOT EXISTS vendor_category (
  id SERIAL PRIMARY KEY,
  vendor TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL
);

-- Example mappings:
INSERT INTO vendor_category(vendor, category) VALUES
  ('Swiggy', 'Food'),
  ('Zomato', 'Food'),
  ('Uber', 'Transport'),
  ('Amazon', 'Shopping');

-- If a vendor is not found in `vendor_category`, the backend defaults to 'Others'.
```

5) Start backend and frontend

Backend
```bash
cd backend
npm start
```

Frontend (development)
```bash
cd frontend/my-app
npm run dev
```

Frontend will run on `http://localhost:5174`. Backend runs on `http://localhost:5000`.

Quick manual tests

- GET dashboard endpoints (example):
  - `GET http://localhost:5000/dashboard/monthly`
  - `GET http://localhost:5000/dashboard/vendors`
  - `GET http://localhost:5000/dashboard/anomalies`
- Upload a CSV via the upload UI or `curl` with multipart form data.

Assumptions

- Vendor-to-category mapping is simple and handled in `frontend` or `backend/utils/categorizer.ts`. Mapping can be extended manually.
- CSV header expected: `date,amount,vendor,description` (values parsed as strings then coerced).
- For speed, some operations (CSV inserts) use sequential inserts; this is simple and correct but not optimized for very large files.

Design Note

- Categorization: a rule-based mapping (`vendor` → `category`) is stored as a simple map in `backend/utils/categorizer.ts` and applied whenever an expense is added or on CSV import. The mapping is deterministic and easily extended.
- Anomaly detection: when inserting or processing an expense, the server computes the historical average for the expense's category using `AVG(amount)`. If the new amount is greater than 3× that average (and average > 0) it sets `is_anomaly = true`.
- Data model: a single `expenses` table stores all required fields, with `category` and `is_anomaly` derived at insert-time to keep reads fast for dashboards.
- Trade-offs: used Node/TypeScript backend instead of Spring Boot to deliver a working end-to-end MVP quickly. CSV inserts are sequential for simplicity; for production you'd use bulk inserts or COPY and transaction batching.
- Shortcuts: no authentication, no pagination on dashboard endpoints, and limited input validation (should be improved for production).



