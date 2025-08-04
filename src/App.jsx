// App.jsx
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScheduleMeeting from "./pages/ScheduleMeeting";
import MeetingList from "./pages/MeetingList";
import MeetingRoom from "./pages/MeetingRoom";

function App() {
  const [meetings, setMeetings] = useState([]);

  const addMeeting = (meeting) => {
    setMeetings(prev => [...prev, meeting]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/schedule" element={<ScheduleMeeting onCreate={addMeeting} />} />
        <Route path="/meetings" element={<MeetingList meetings={meetings} />} />
        <Route path="/meeting/:id" element={<MeetingRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
