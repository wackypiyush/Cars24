# Task Management Backend
This project is a backend API for managing tasks, built with Flask and interfacing with an MSSQL database. It provides endpoints for creating, reading, updating, and deleting tasks.

## Table of Contents
* Installation
* Configuration
* Usage
* API Endpoints
* Error Handling
  
## Installation
### Prerequisites
* Python 3.6 or higher
* MSSQL Server
* Virtual environment tool (optional but recommended)

### Steps
1. Clone the repository:

```
git clone https://github.com/yourusername/task-management-backend.git
cd task-management-backend
```
2. Create a virtual environment and activate it:
```
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```

3. Install the required packages:
```
pip install -r requirements.txt
```

4. Configure the MSSQL database connection in db.py:
```
DRIVER_NAME = "SQL SERVER"
SERVER_NAME = "YOUR_SERVER_NAME"
DATABASE_NAME = "YOUR_DATABASE_NAME"

connection_string = f"""
    DRIVER={{{DRIVER_NAME}}};
    SERVER={SERVER_NAME};
    DATABASE={DATABASE_NAME};
    Trust_Connection=yes;
"""
```
## Configuration
### Database Setup
Ensure you have an MSSQL database set up with the following schema:
```
CREATE TABLE Tasks (
    Task_id INT PRIMARY KEY IDENTITY(1,1),
    Title VARCHAR(255) NOT NULL,
    Description TEXT,
    Status VARCHAR(50) NOT NULL
);
```
### Usage
1. Run the Flask application:
'''
python run.py
'''
2. The API will be available at http://localhost:5000.

### Info on API is in 'API_Endpoints.pdf'
