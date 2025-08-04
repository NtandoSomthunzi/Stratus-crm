import { createContext, useContext, useState } from "react";

const MeetingsContext = createContext();

export const MeetingsProvider = ({ children }) => {
  const [meetings, setMeetings] = useState([]);

  const addMeeting = (meeting) => {
    setMeetings((prev) => [...prev, { ...meeting, id: Date.now() }]);
  };

  const deleteMeeting = (id) => {
    setMeetings((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <MeetingsContext.Provider value={{ meetings, addMeeting, deleteMeeting }}>
      {children}
    </MeetingsContext.Provider>
  );
};

export const useMeetings = () => useContext(MeetingsContext);
