# **Finance Dashboard Backend**

Overview
This is a backend system for a finance dashboard,built for the Zorvyn Backend Developer Intern assessment.

It allows:
- User registration & login with JWT authentication
- Role-based access (Viewer, Analyst, Admin)
- CRUD operations on Financial transactions
- Dashboard data : summary, recent activity, monthly trends, category breakdown
- Input validation and error handling

The backend is built with Node.js, Express, Prisma and PostgreSQL.

## Tech Stack

| Layer | Technology/Library |
| :--- | :--- |
| Runtime | Node.js 24.4.1 |
| Framework | Express 5.2.1 |
| Database ORM | Prisma 5.22.0 |
| Database | PostgreSQL/SQLite | 
| Authentication | JWT (jsonwebtoken) |
| Password Hashing | bcrypt |
| Environment | dotenv |

### Setup Instructions
1. Clone the repository

   ```bash
   git clone https://github.com/AbhiramDaita/assesment
   cd assesment
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Set environment variables in .env
   ```
   DATABASE_URL="postgres://...@db.prisma.io:5432/postgres?sslmode=require"
   JWT_SECRET="your-secret"
   ```
4. Prisma setup
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```
5. Start server
   ```bash
   npm run dev
   ```
   
### API Endpoints
Auth

| Method | Endpoint| Description | Role |
| :--- | :--- | :--- | :--- |
| POST | /api/v1/auth/register|Register a new user| Public |
| POST | /api/v1/auth/login | Login and get JWT token | Public |

Transactions

| Method | Endpoint | Description | Role |
| :--- | :--- | :--- | :--- |
| POST | /api/v1/transactions/createTransaction| Create transaction | Admin|
| GET | /api/v1/transactions/getTransactions | List all transactions | Admin/Analyst/Viewer|
| GET | /api/v1/transactions/getTransactionById/:id | Get transaction by ID | Admin/Analyst/Viewer|
| PUT | /api/v1/transactions/updateTransactionById/:id| Update transaction | Admin |
| DELETE | /api/v1/transactions/deleteTransaction/:id|Delete transaction | Admin|

Dashboard

| Method | Endpoint | Description | Role|
| :--- | :--- | :---| :---|
| GET | /api/v1/dashboard/summary | Total income, expenses, net balance | Analyst/Viewer/Admin |
| GET | /api/v1/dashboard/recent-transactions | Recent transactions | Analyst/Viewer/Admin | 
| GET | /api/v1/dashboard/monthly-trends | Monthly trends aggregation | Analyst/Viewer/Admin |


### Middleware
1. Authentication - checks JWT and sets req.user.
2. Authorization - checks req.user.role against allowed roles.


### Asumption & Notes
- All dates are stored in ISO-8601 format.
- Users have roles : ADMIN, ANALYST, VIEWER.
- Transactions belong to a user via userId.
- Passwords are hashed using bcrypt.
- JWT tokens expire in 1 hour.
- Dashboard aggregates are per authenticated user.


### Example Request & Respone

Login 
```bash
POST /api/v1/auth/login
Content-Type:application/json

{
  "email":"test@test.com",
  "password":"password"
}
```

### Design Decisions
- Used Prisma for type safety and migration support
- Used UUID for distributed scalability
- Used Layered Architecture for maintainability
- ISO-8601 enforced for DateTime Consistency
- RESTful routing conventions followed


### Error Handling Strategy
- Service throw errors
- Controllers handle HTTP response formatting
- Consistent error structure:
```
{
"error":"Error message"
}
```

### Architectural Trade-offs
1. No External Validation Library
   Decision :
   Basic validation handled manually inside services.

   Trade-off:
      - Faster development.
      - Less strict request validation.
  
   Why:
   Adding Zod/Joi would improve robustness, but was intentionally avoided to keep dependencies minimal.

2. Prisma ORM over Raw SQL
   Decision :
   Used Prisma for DB access.

   Trade-off :
      - Slight abstraction overgead.
      - Less granular query control compared to raw SQL.
  
   Why:
   - Type safety
   - Migration management
   - Faster development
   - Clean schema management

3. UUID instead of Auto-Increment IDs
   Decision:
   Used UUID for primary keys.

   Trade-off:
      - Slightly larger index size.
      - Slight performance overhead.

   Why :
      - Better for distributed systems.
      - Avoids ID enumeration attacks.
      - Safer for public APIs


### Assumptions Made
1. Single-User Context per Token
   Each Request assumes:
   - Valid JWT
   - User exists
   - No token revocation logic implemented
  
2. Financial Accuracy Scope
   - No currency conversion
   - No multi-currency support
   - No tax calculation
   Assumed single currency usage.

3. Transaction Ownership
   Assumed:
   - Users can only access their own transactions.
   - No shared accounts or multi-user collaboration
  



