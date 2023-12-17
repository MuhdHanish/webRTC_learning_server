import { Socket } from "socket.io";
import { v4 as uuidV4 } from "uuid";

export const roomHanlder = (socket: Socket) => {
    const userId = socket.id;
    const createRoom = () => {
        console.log(`Create a room requested by ${userId} 🟠`);
        const roomId = uuidV4();
        socket.join(roomId);
        socket.emit(`room-created`, { roomId });
        console.log(`Create room request accepted for ${userId} 🟢`);
    };
    socket.on(`create-room`, createRoom);
    const joinRoom = () => {
        console.log(`Join room requested by ${userId} 🟠`);
        socket.emit(`joined-room`);
        console.log(`Join request accepted for ${userId} 🟢`);
    };
    socket.on(`join-room`, joinRoom);
};