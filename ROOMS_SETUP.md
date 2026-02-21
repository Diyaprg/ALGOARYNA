# Room Creation System with Socket.IO

A real-time room creation and management system built with Next.js, TypeScript, PostgreSQL (Neon), Prisma, and Socket.IO.

## 📁 Folder Structure

```
algoaryna/
├── server.js                          # Custom Next.js server with Socket.IO
├── prisma/
│   ├── schema.prisma                  # Database schema (User, Room models)
│   └── migrations/                    # Database migrations
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── rooms/
│   │   │   │   ├── create/route.ts    # POST /api/rooms/create
│   │   │   │   ├── join/route.ts      # POST /api/rooms/join
│   │   │   │   └── [roomCode]/route.ts # GET /api/rooms/:roomCode
│   │   │   └── auth/                   # Auth routes (register, login)
│   │   ├── rooms/
│   │   │   └── page.tsx               # Room creation/joining UI
│   │   ├── contest/
│   │   │   └── [roomCode]/
│   │   │       └── page.tsx           # Contest room page with real-time participants
│   │   └── page.tsx                   # Homepage
│   ├── components/
│   │   ├── CreateRoom.tsx             # Component to create a room
│   │   └── JoinRoom.tsx               # Component to join a room
│   ├── hooks/
│   │   └── useSocket.ts               # Socket.IO React hooks
│   ├── lib/
│   │   ├── prisma.ts                  # Prisma client singleton
│   │   └── socket.ts                  # Socket.IO client utilities
│   └── types/
│       └── global.d.ts                # TypeScript global types
└── package.json
```

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

Make sure your `.env` file has `DATABASE_URL` set:

```env
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
```

Run migrations:

```bash
npm run db:migrate
# OR for quick prototyping:
npm run db:push
```

### 3. Run the Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3000` with Socket.IO support.

## 📡 API Routes

### Create Room

**POST** `/api/rooms/create`

Request body:
```json
{
  "hostId": "user-id-here"
}
```

Response:
```json
{
  "room": {
    "id": "room-id",
    "roomCode": "ABC12345",
    "hostId": "user-id",
    "status": "waiting",
    "participants": [...],
    "createdAt": "2024-..."
  },
  "shareableLink": "http://localhost:3000/contest/ABC12345"
}
```

### Join Room

**POST** `/api/rooms/join`

Request body:
```json
{
  "roomCode": "ABC12345",
  "userId": "user-id-here"
}
```

Response:
```json
{
  "message": "Successfully joined room",
  "room": {
    "id": "room-id",
    "roomCode": "ABC12345",
    "hostId": "user-id",
    "status": "waiting",
    "participants": [...]
  }
}
```

### Get Room

**GET** `/api/rooms/[roomCode]`

Response:
```json
{
  "room": {
    "id": "room-id",
    "roomCode": "ABC12345",
    "hostId": "user-id",
    "host": {...},
    "status": "waiting",
    "participants": [...],
    "createdAt": "2024-..."
  }
}
```

## 🔌 Socket.IO Events

### Client → Server

- `join_room` - Join a Socket.IO room by roomCode
- `leave_room` - Leave a Socket.IO room

### Server → Client

- `user_joined` - Emitted when a user joins the room
- `user_left` - Emitted when a user leaves the room
- `participants_updated` - Emitted when the participant list changes

## 🎨 Frontend Usage

### Create a Room

```tsx
import CreateRoom from "@/components/CreateRoom";

<CreateRoom userId="user-id-here" />
```

### Join a Room

```tsx
import JoinRoom from "@/components/JoinRoom";

<JoinRoom userId="user-id-here" />
```

### Use Socket Hook in Contest Page

```tsx
import { useRoomSocket } from "@/hooks/useSocket";

const { participants, isConnected } = useRoomSocket(roomCode);
```

## 📝 Database Schema

### User Model
- `id` (String, unique)
- `email` (String, unique)
- `password` (String)
- `name` (String, optional)
- `createdAt`, `updatedAt`

### Room Model
- `id` (String, unique)
- `roomCode` (String, unique, 8 chars)
- `hostId` (String, foreign key to User)
- `status` (String, default: "waiting")
- `participants` (Many-to-many with User)
- `createdAt`, `updatedAt`

## 🔧 Key Features

1. **Room Creation**: Generate unique 8-character room codes using nanoid
2. **Real-time Updates**: Socket.IO broadcasts participant changes instantly
3. **Type Safety**: Full TypeScript support throughout
4. **Database**: PostgreSQL with Prisma ORM
5. **Custom Server**: Socket.IO integrated with Next.js custom server

## 🧪 Testing Flow

1. Create a user via `/api/auth/register`
2. Visit `/rooms` page
3. Create a room (you'll be redirected to `/contest/[roomCode]`)
4. Open another browser/incognito window
5. Join the same room using the room code
6. Watch participants update in real-time!

## 📌 Notes

- Room codes are 8 characters, uppercase
- Host is automatically added as first participant
- Socket.IO connection status is shown in the UI
- Participants list updates in real-time when users join
- Make sure to run `npm run db:push` or `npm run db:migrate` after schema changes
