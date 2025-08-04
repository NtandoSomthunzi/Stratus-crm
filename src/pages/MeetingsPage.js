import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  Textarea,
  FormLabel,
  VStack,
  HStack,
  Text,
  Heading,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from 'uuid';

const MeetingsPage = () => {
  const [meetings, setMeetings] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    notes: ""
  });

  const toast = useToast();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddMeeting = () => {
    if (!formData.title || !formData.date || !formData.time) {
      toast({
        title: "Missing Fields",
        description: "Please fill in title, date and time.",
        status: "warning",
        duration: 3000,
        isClosable: true
      });
      return;
    }

    const newMeeting = { id: uuidv4(), ...formData };
    setMeetings(prev => [...prev, newMeeting]);
    setFormData({ title: "", date: "", time: "", notes: "" });

    toast({
      title: "Meeting Added",
      description: "Your meeting has been scheduled.",
      status: "success",
      duration: 2000,
      isClosable: true
    });
  };

  const handleDelete = (id) => {
    setMeetings(prev => prev.filter(meeting => meeting.id !== id));
  };

  return (
    <Box p={6}>
      <Heading mb={4}>Meetings</Heading>

      <Box
        p={4}
        borderWidth="1px"
        borderRadius="md"
        bg="gray.50"
        mb={6}
        maxW="600px"
      >
        <Heading size="md" mb={4}>Schedule New Meeting</Heading>
        <VStack spacing={3} align="stretch">
          <Box>
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Meeting Title"
            />
          </Box>
          <HStack spacing={4}>
            <Box flex="1">
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </Box>
            <Box flex="1">
              <FormLabel>Time</FormLabel>
              <Input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
              />
            </Box>
          </HStack>
          <Box>
            <FormLabel>Notes</FormLabel>
            <Textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Meeting notes..."
            />
          </Box>
          <Button colorScheme="blue" onClick={handleAddMeeting}>
            Schedule Meeting
          </Button>
        </VStack>
      </Box>

      <Divider my={6} />

      <Box>
        <Heading size="md" mb={4}>Scheduled Meetings</Heading>
        {meetings.length === 0 ? (
          <Text>No meetings scheduled yet.</Text>
        ) : (
          <VStack spacing={4} align="stretch">
            {meetings.map(meeting => (
              <Box
                key={meeting.id}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                bg="white"
              >
                <Heading size="sm" mb={1}>{meeting.title}</Heading>
                <Text>Date: {meeting.date}</Text>
                <Text>Time: {meeting.time}</Text>
                {meeting.notes && <Text>Notes: {meeting.notes}</Text>}
                <Button
                  size="sm"
                  mt={3}
                  colorScheme="red"
                  onClick={() => handleDelete(meeting.id)}
                >
                  Delete
                </Button>
              </Box>
            ))}
          </VStack>
        )}
      </Box>
    </Box>
  );
};

export default MeetingsPage;
