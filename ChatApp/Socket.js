import io from 'socket.io-client';

let socket;


const connectSocket = (address) => {
  return new Promise((resolve, reject) => {
    socket = io(`https://chatappbackend-jzmy.onrender.com`, {
      query: `address="chirag"`,
    });

    socket.on("connect", () => {
      console.log("Socket connected");
      resolve(socket);
    });
    

    socket.on("connect_error", (err) => {
      console.log("Socket connection error:", err);
      reject(err);
    });
  });
};


export { socket, connectSocket };