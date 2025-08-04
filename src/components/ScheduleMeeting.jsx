// src/pages/ScheduleMeeting.jsx
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const ScheduleMeeting = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [participants, setParticipants] = useState("");
  const [startTime, setStartTime] = useState("");
  const navigate = useNavigate();

  const handleSchedule = () => {
    const id = uuidv4();
    const meeting = {
      id,
      title,
      participants: participants.split(","),
      startTime,
      meetingLink: `/meeting/${id}`,
    };
    onCreate(meeting);
    navigate(`/meetings`);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Schedule a Meeting</h2>
      <input type="text" placeholder="Meeting Title" value={title} onChange={e => setTitle(e.target.value)} className="mb-2 w-full p-2 border" />
      <input type="text" placeholder="Participants (comma separated)" value={participants} onChange={e => setParticipants(e.target.value)} className="mb-2 w-full p-2 border" />
      <input type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)} className="mb-4 w-full p-2 border" />
      <button onClick={handleSchedule} className="bg-blue-600 text-white px-4 py-2 rounded">Schedule</button>
    </div>
  );
};

export default ScheduleMeeting;
