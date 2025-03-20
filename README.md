# Desktop Journal - Dream & Reflection Logger

## Description

Desktop Journal is a full-stack web application that allows users to record
their dreams and personal reflections through voice recording and text input.
The application features speech-to-text conversion, mood tracking, and secure
storage of personal entries.

## Key Features

- 🎤 Voice Recording: Record dreams with automatic speech-to-text conversion
- 📝 Text Journal: Write and store personal reflections
- 🌈 Mood Tracking: Track emotional states with an extensive mood classification
  system
- 🔒 Secure Authentication: Protected user accounts and private entries
- 📱 Responsive Design: Full functionality across all device sizes
- 📊 Entry Management: View, edit, and delete past entries
- 📅 Date Filtering: Filter entries by date ranges

## Tech Stack

### Frontend

- React.js
- Tailwind CSS
- Axios for API calls
- React Router for navigation
- Context API for state management

### Backend

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Cloudinary for audio storage
- Multer for file handling

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Cloudinary account

### Setup Steps

1. Clone the repository

```bash
git clone [repository-url]
```

2. Install dependencies for both client and server

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. Create .env file in server directory with the following variables:

```env
MONGODB_URI=your_mongodb_uri
TOKEN_SECRET=your_jwt_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

4. Start the development servers

```bash
# Start server (from server directory)
npm run dev

# Start client (from client directory)
npm start
```

## Usage

1. Create an account or login
2. Navigate to "Dreams Log" to record dreams
3. Use "Reflection Log" to write journal entries with mood tracking
4. View past entries in "Dreams Entries" or "My Entries"
5. Filter entries by date
6. Edit or delete entries as needed

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT License](LICENSE)

## Contact

[Your Name] - [Your Email]

Project Link: [repository-url]
