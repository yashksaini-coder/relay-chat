import { Bounce, toast } from "react-toastify";

export function joinRoom(
  ws: WebSocket | null,
  username: string,
  roomid: string,
  setCon: (con: boolean) => void,
) {
  if (roomid == "") {
    toast.error("Please enter a room id", {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: 0,
      theme: "light",
      transition: Bounce,
    });
    return;
  }
  if (username == "") {
    toast.error("Please enter your name", {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: 0,
      theme: "light",
      transition: Bounce,
    });
    return;
  }
  if (!ws) {
    return;
  }
  const message = {
    type: "join",
    payload: {
      roomid: roomid,
    },
  };
  setCon(true);
  localStorage.setItem("roomid", roomid);
  localStorage.setItem("name", username);
  ws.send(JSON.stringify(message));
  toast.success("Room joined, Room ID: " + localStorage.getItem("roomid"), {
    position: "top-left",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: 0,
    theme: "light",
    transition: Bounce,
  });
}