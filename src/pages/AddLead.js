import { useState } from "react";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  useToast,
  Fade,
} from "@chakra-ui/react";
import { useLeads } from "../contexts/LeadsContext";

const AddLead = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [company, setCompany] = useState("");
  const [industry, setIndustry] = useState("");
  const [website, setWebsite] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("New");
  const [tags, setTags] = useState("");
  const [notes, setNotes] = useState("");
  const toast = useToast();
  const { addLead } = useLeads();

  const handleAddLead = () => {
    if (!name || !company) {
      toast({
        title: "Missing info.",
        description: "Please provide at least name and company.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const tagList = tags.split(",").map(tag => tag.trim()).filter(Boolean);

    const newLead = {
      name,
      email,
      phone,
      jobTitle,
      linkedin,
      company,
      industry,
      website,
      companySize,
      location,
      status,
      tags: tagList,
      notes,
      createdAt: new Date().toISOString(),
      id: Date.now().toString(),
    };

    addLead(newLead);

    toast({
      title: "Lead added.",
      description: `Name: ${name}, Company: ${company}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    // Reset form
    setName("");
    setEmail("");
    setPhone("");
    setJobTitle("");
    setLinkedin("");
    setCompany("");
    setIndustry("");
    setWebsite("");
    setCompanySize("");
    setLocation("");
    setStatus("New");
    setTags("");
    setNotes("");
  };

  return (
    <Fade in={true}>
      <Box>
        <Heading>Add New Lead</Heading>
        <VStack spacing={4} mt={4} align="stretch">
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
          </FormControl>
          <FormControl>
            <FormLabel>Phone</FormLabel>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter phone number" />
          </FormControl>
          <FormControl>
            <FormLabel>Job Title</FormLabel>
            <Input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="Enter job title" />
          </FormControl>
          <FormControl>
            <FormLabel>LinkedIn Profile</FormLabel>
            <Input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="LinkedIn URL" />
          </FormControl>
          <FormControl>
            <FormLabel>Company Name</FormLabel>
            <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Enter company name" />
          </FormControl>
          <FormControl>
            <FormLabel>Industry</FormLabel>
            <Input value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="Industry" />
          </FormControl>
          <FormControl>
            <FormLabel>Company Website</FormLabel>
            <Input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="Company website" />
          </FormControl>
          <FormControl>
            <FormLabel>Company Size</FormLabel>
            <Select value={companySize} onChange={(e) => setCompanySize(e.target.value)}>
              <option value="">Select size</option>
              <option value="1-10">1–10</option>
              <option value="11-50">11–50</option>
              <option value="51-200">51–200</option>
              <option value="201-500">201–500</option>
              <option value="500+">500+</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City, Country" />
          </FormControl>
          <FormControl>
            <FormLabel>Status</FormLabel>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Tags (comma separated)</FormLabel>
            <Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="e.g., Hot, Follow-up" />
          </FormControl>
          <FormControl>
            <FormLabel>Notes</FormLabel>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Additional notes" />
          </FormControl>
          <Button colorScheme="teal" onClick={handleAddLead}>Add Lead</Button>
        </VStack>
      </Box>
    </Fade>
  );
};

export default AddLead;
