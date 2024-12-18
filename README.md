
# 💬 Relay-Chat Typescript/React

RTC Terminal is a modern real-time chat application that enables users to create or join chat rooms and communicate instantly with other participants. The application features a clean, responsive interface and supports real-time message delivery using WebSocket technology.

---

## 🚀 Getting Started  


2. **Cloning the Repository**:  
   ```bash  
   git clone https://github.com/yashksaini-coder/relay-chat
   ```

2. **Installing Dependencies**:
   ```bash
    npm install
   ```
   
3. **Running the application**:
   ```
   npm run dev
   ```
   
4. **Click on the local deployment URL of the Application**:  
   ```bash  
   https://localhost/5173
   ```
   
---

## ✨ Features

### 🏠 Room Management
- 🆕 Create new rooms with auto-generated unique room IDs
- 🔗 Join existing rooms using room IDs
- 📋 Copy room IDs to clipboard for easy sharing
- 👥 Real-time user connection tracking

### 💬 Chat Features
- ⚡ Real-time message delivery
- 🖼️ User-friendly message interface with distinct styling for sent/received messages
- 👨‍👩‍👧‍👦 Support for multiple users in the same room
- 📝 Username display for each message
- ⏎ Enter key support for sending messages

### 🎨 UI/UX
- 🌓 Clean, modern interface with dark theme
- 📱 Responsive design that works on mobile and desktop
- 🔔 Toast notifications for important actions
- 🎢 Smooth transitions and hover effects
- 📜 Scrollable message history


## 🛠️ Tech Stack

### 🌐 Frontend
| React | TypeScript | Tailwind CSS | Vite | React Toastify | Lucide React |
| :---: | :--------: | :----------: | :--: | :------------: | :----------: |
| ![React](https://skillicons.dev/icons?i=react) | ![TypeScript](https://skillicons.dev/icons?i=ts) | ![Tailwind CSS](https://skillicons.dev/icons?i=tailwind) | ![Vite](https://skillicons.dev/icons?i=vite) | ![React Toastify](https://skillicons.dev/icons?i=react) | ![Lucide React](https://github.com/user-attachments/assets/f4ad1606-9ad2-4726-910d-7843e45e8f9f) |

## 🏗️ Architecture

### 🌐 Frontend Architecture
The frontend is built as a single-page application (SPA) with React. Key components include:
- 🔗 Connection management with WebSocket
- 🗃️ State management using React hooks
- 📐 Responsive UI components
- ⚡ Real-time message handling and display

### 🖥️ Backend Architecture
The backend implements a WebSocket server that handles:
- 👥 User connections and disconnections
- 🏠 Room management
- 📡 Message broadcasting to room participants
- 🔢 User count tracking

### 📡 Communication Protocol
The application uses a simple message protocol over WebSocket:

#### 🚪 Join Room Message
```json
{
    "type": "join",
    "payload": {
        "roomid": "ROOM_ID"
    }
}
```

#### 💬 Chat Message
```json
{
    "type": "chat",
    "payload": {
        "name": "USERNAME",
        "message": "MESSAGE_CONTENT"
    }
}
```

## 🔒 Security Features
- 🔐 Secure WebSocket connections (WSS)
- 🛡️ Input validation
- 🚪 Room isolation (messages only broadcast to users in the same room)


## 🌍 Deployment
- 🌐 Frontend deployed on Vercel
- 🖥️ Backend deployed on Render
- 🔧 WebSocket server configured for production use
