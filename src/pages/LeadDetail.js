import {
  Box,
  Heading,
  Text,
  VStack,
  Badge,
  Input,
  Button,
  Divider,
  Stack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useLeads } from "../contexts/LeadsContext";
import { useState } from "react";
import dayjs from "dayjs";

const LeadDetail = () => {
  const { id } = useParams();
  const { leads, addActivityToLead } = useLeads();
  const lead = leads.find((l) => String(l.id) === id);

  const [activityType, setActivityType] = useState("");
  const [activityDesc, setActivityDesc] = useState("");

  if (!lead) {
    return <Box p={4}>Lead not found.</Box>;
  }

  const handleAddActivity = () => {
    if (!activityType || !activityDesc) return;

    const newActivity = {
      id: Date.now(),
      type: activityType,
      description: activityDesc,
      date: dayjs().format("YYYY-MM-DD"),
    };

    addActivityToLead(lead.id, newActivity);
    setActivityType("");
    setActivityDesc("");
  };

  return (
    <Box p={6}>
      <Heading mb={4}>{lead.name}</Heading>
      <Text><strong>Business:</strong> {lead.businessName}</Text>
      <Text><strong>Email:</strong> {lead.email}</Text>
      <Text><strong>Phone:</strong> {lead.phone}</Text>
      <Text><strong>Status:</strong> <Badge colorScheme="green">{lead.status}</Badge></Text>
      <Text><strong>Lead Score:</strong> {lead.leadScore}</Text>
      <Divider my={6} />

      <Heading size="md" mb={2}>Activity Timeline</Heading>
      <VStack align="start" spacing={3}>
        {lead.activities && lead.activities.length > 0 ? (
          [...lead.activities].reverse().map((act) => (
            <Box
              key={act.id}
              p={3}
              borderWidth="1px"
              borderRadius="md"
              w="100%"
              shadow="sm"
            >
              <Stack direction="row" justify="space-between">
                <Badge colorScheme="blue">{act.type}</Badge>
                <Text fontSize="sm" color="gray.500">{act.date}</Text>
              </Stack>
              <Text mt={2}>{act.description}</Text>
            </Box>
          ))
        ) : (
          <Text>No activities yet.</Text>
        )}
      </VStack>

      <Divider my={6} />
      <Heading size="sm" mb={2}>Add New Activity</Heading>
      <VStack align="start" spacing={2}>
        <Input
          placeholder="Type (e.g., Call, Email, Meeting)"
          value={activityType}
          onChange={(e) => setActivityType(e.target.value)}
        />
        <Input
          placeholder="Description"
          value={activityDesc}
          onChange={(e) => setActivityDesc(e.target.value)}
        />
        <Button colorScheme="blue" onClick={handleAddActivity}>Add Activity</Button>
      </VStack>
    </Box>
  );
};

export default LeadDetail;
