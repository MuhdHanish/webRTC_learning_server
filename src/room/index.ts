import { Socket } from "socket.io";
import { v4 as uuidV4 } from "uuid";

const rooms: Record<string, string[]> = {};

interface IRoomParams {
    roomId: string;
    peerId: string;
}

export const roomHandler = (socket: Socket) => {
    const createRoom = () => {
        const roomId = uuidV4();
        rooms[roomId] = [];
        socket.join(roomId);
        socket.emit(`room-created`, { roomId });
        console.log(`user created the room`)
    };

    const joinRoom = ({ roomId, peerId }: IRoomParams) => {
        console.log(`user joined then room, roomId: ${roomId}, peerId: ${peerId}`);
        socket.join(roomId);
        socket.emit(`joined-room`);
    };

    socket.on(`create-room`, createRoom);
    socket.on(`join-room`, joinRoom);
};
