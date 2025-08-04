// src/pages/MeetingRoom.jsx
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const MeetingRoom = () => {
  const { id } = useParams();

  useEffect(() => {
    const domain = "meet.jit.si";
    const options = {
      roomName: `stratus-crm-meeting-${id}`,
      width: "100%",
      height: 600,
      parentNode: document.getElementById("jitsi-container"),
      userInfo: { displayName: "Stratus CRM User" }
    };
    new window.JitsiMeetExternalAPI(domain, options);
  }, [id]);

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Meeting Room</h2>
      <div id="jitsi-container" className="border rounded shadow-md" />
    </div>
  );
};

export default MeetingRoom;
