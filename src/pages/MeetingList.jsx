// src/pages/MeetingList.jsx
import { Link } from "react-router-dom";

const MeetingList = ({ meetings }) => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Upcoming Meetings</h2>
      <ul className="space-y-4">
        {meetings.map(meeting => (
          <li key={meeting.id} className="border p-4 rounded">
            <h3 className="text-xl font-semibold">{meeting.title}</h3>
            <p>Time: {new Date(meeting.startTime).toLocaleString()}</p>
            <p>Participants: {meeting.participants.join(", ")}</p>
            <Link to={meeting.meetingLink} className="text-blue-500 underline">Join</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MeetingList;
