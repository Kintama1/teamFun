# FantasyStocks Database Schema

## Database Overview
- **Database**: PostgreSQL (Supabase)
- **Project URL**: `https://wwiljupbehtjhkcyhhih.supabase.co`
- **Authentication**: Email-based with JWT tokens

## Tables

### 1. users
User account information and authentication data.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique user identifier |
| email | varchar | UNIQUE | User's email address |
| password_hash | varchar | NOT NULL | Hashed password |
| username | varchar | UNIQUE, NOT NULL | Display name |
| created_at | timestamptz | DEFAULT now() | Account creation timestamp |
| updated_at | timestamptz | DEFAULT now() | Last update timestamp |

### 2. teams
User's fantasy stock teams and portfolio information.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique team identifier |
| user_id | uuid | FOREIGN KEY → users(id) | Owner of the team |
| team_name | varchar | NOT NULL | Name of the fantasy team |
| stock_1 | varchar | | First stock symbol |
| stock_2 | varchar | | Second stock symbol |
| stock_3 | varchar | | Third stock symbol |
| points | integer | DEFAULT 0 | Team's total points |
| prev_points | integer | DEFAULT 0 | Team's previous points |
| cash_balance | numeric | DEFAULT 10000.00 | Available cash for trades |
| created_at | timestamptz | DEFAULT now() | Team creation timestamp |
| updated_at | timestamptz | DEFAULT now() | Last update timestamp |

### 3. stocks
Available stocks that users can select for their teams.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique stock identifier |
| stock_name | varchar | NOT NULL | Company name |
| symbol | varchar | UNIQUE, NOT NULL | Stock ticker symbol |
| price | numeric | NOT NULL | Current stock price |
| link | varchar | | Yahoo Finance or other link |
| created_at | timestamptz | DEFAULT now() | Record creation timestamp |
| updated_at | timestamptz | DEFAULT now() | Last update timestamp |

### 4. leaderboard
Simple leaderboard tracking user performance.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique record identifier |
| user_id | uuid | FOREIGN KEY → users(id) | Reference to user |
| created_at | timestamptz | DEFAULT now() | Record creation timestamp |
| updated_at | timestamptz | DEFAULT now() | Last update timestamp |

## Relationships

```
users (1) ←→ (many) teams
  └─ users.id = teams.user_id

users (1) ←→ (many) leaderboard
  └─ users.id = leaderboard.user_id
```

## API Endpoints

### Authentication
- `POST /register` - Create new user account
- `POST /signup` - Alternative registration endpoint
- `POST /login` - User login
- `POST /logout` - User logout
- `GET /me` - Get current user info (requires auth)

### Base URL
- **Development**: `http://localhost:5000`
- **Frontend**: `http://localhost:3000` 