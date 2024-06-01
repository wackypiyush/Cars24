# Task Management Frontend

This project is a frontend application for managing tasks, built with ReactJS. It interfaces with a Flask backend API to create, read, update, and delete tasks.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Components](#components)

## Installation

### Prerequisites

- Node.js
- npm (Node Package Manager) or Yarn

### Steps

1. Clone the repository:

```
git clone https://github.com/yourusername/task-management-frontend.git
cd task-management-frontend
```
2. Install the required packages:
   ```
   npm install
    # or
    yarn install
   ```

## Configuration
### Environment Variables
Create a .env file in the root of your project with the following content:

```
REACT_APP_API_URL=http://localhost:5000
```
Replace http://localhost:5000 with the URL of your backend API if it's different.

## Usage
Run the React application:
```
npm start
# or
yarn start
```


## Components
1. TaskForm Component

File: src/components/TaskForm.js
Description: A form for adding and updating tasks.

2. TaskList Component
File: src/components/TaskList.js
Description: Displays a list of tasks and provides options to update or delete each task.

2. App Component
File: src/App.js
Description: The main component that integrates the TaskForm and TaskList components and manages the state of tasks.
