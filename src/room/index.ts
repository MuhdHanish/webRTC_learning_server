import { Socket } from "socket.io";

export const roomHanlder = (socket: Socket) => {
    const userId = socket.id;
    const createRoom = () => {
        console.log(`Create a room requested by ${userId} 🟠`);
        socket.emit(`created-room`);
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