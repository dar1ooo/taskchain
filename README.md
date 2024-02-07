# Taskchain

Taskchain is a Trello clone built with Angular, MongoDB, and .NET Core. It is designed to help developers plan their weekly tasks effectively. This project was created as a practice project for a computer science final.

## Table of Contents
- [Setup](#setup)
- [Architecture](#architecture)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Setup

### Prerequisites
Before you begin, ensure you have met the following requirements:
- Node.js installed
- MongoDB installed and running
- .NET Core SDK installed

### Installation
- Clone the repository:
- Set up the MongoDB connection string in `appsettings.json`.
- Start the backend server
- Navigate to the frontend directory and install Angular dependencies:
   ```
   npm install
   ```

- Start the frontend application:
   ```
   ng serve
   ```

7. Access Taskchain in your browser at `http://localhost:4200`.

## Architecture

Taskchain follows a client-server architecture. The frontend is built with Angular, providing a responsive and dynamic user interface. The backend is powered by .NET Core, serving RESTful APIs and managing data persistence with MongoDB.

### Frontend
- **Angular**: Frontend framework for building single-page applications.
- **RxJS**: Reactive Extensions library for handling asynchronous operations and managing state.
- **Angular Material**: UI component library for Angular, providing pre-designed components for a consistent user experience.

### Backend
- **.NET Core**: Backend framework for building scalable and performant web applications.
- **MongoDB**: NoSQL database used for storing task data.
- **ASP.NET Core Web API**: Provides endpoints for client-server communication through HTTP requests.

## Features

- **Task Management**: Create, update, and delete tasks.
- **Task Boards**: Organize tasks into different boards based on categories.
- **User Authentication**: Register and login to manage tasks securely.

## Contributing

Contributions are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
