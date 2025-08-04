import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  SlideFade,
  Badge,
  Button,
  useColorModeValue,
  Select,
  Input,
  HStack,
  VStack,
  IconButton,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Link,
} from "@chakra-ui/react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useLeads } from "../contexts/LeadsContext";
import { useState, useMemo } from "react";
import { EditIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import dayjs from "dayjs";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement
);

const Dashboard = () => {
  const { leads, deleteLead, updateLead } = useLeads();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [statusFilter, setStatusFilter] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");

  const bg = useColorModeValue("brand.50", "gray.700");
  const borderColor = useColorModeValue("gray.100", "gray.600");
  const hoverBg = useColorModeValue("gray.100", "gray.600");

  const handleEditClick = (lead) => {
    setEditingId(lead.id);
    setEditForm({ ...lead });
  };

  const handleSave = () => {
    updateLead(editingId, editForm);
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const filteredLeads = leads.filter((lead) => {
    return (
      (statusFilter ? lead.status === statusFilter : true) &&
      (industryFilter ? lead.industry === industryFilter : true)
    );
  });

  const uniqueStatuses = Array.from(new Set(leads.map((l) => l.status)));
  const uniqueIndustries = Array.from(new Set(leads.map((l) => l.industry)));

  const totalLeads = leads.length;
  const hotLeads = leads.filter((l) => l.status.toLowerCase() === "hot").length;
  const coldLeads = leads.filter((l) => l.status.toLowerCase() === "cold").length;

  const statusCounts = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});

  const industryCounts = leads.reduce((acc, lead) => {
    acc[lead.industry] = (acc[lead.industry] || 0) + 1;
    return acc;
  }, {});

  const statusData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: ["#38A169", "#3182CE", "#DD6B20", "#E53E3E", "#805AD5"],
      },
    ],
  };

  const industryData = {
    labels: Object.keys(industryCounts),
    datasets: [
      {
        label: "Leads per Industry",
        data: Object.values(industryCounts),
        backgroundColor: "#3182CE",
      },
    ],
  };

  const lineData = useMemo(() => {
    const grouped = {};
    leads.forEach((lead) => {
      const date = dayjs(lead.createdAt).format("YYYY-MM");
      grouped[date] = (grouped[date] || 0) + 1;
    });
    const sortedDates = Object.keys(grouped).sort();
    return {
      labels: sortedDates,
      datasets: [
        {
          label: "Leads Added",
          data: sortedDates.map((date) => grouped[date]),
          borderColor: "#3182CE",
          backgroundColor: "rgba(49, 130, 206, 0.2)",
          tension: 0.3,
          fill: true,
        },
      ],
    };
  }, [leads]);

  return (
    <SlideFade in={true} offsetY="20px">
      <Box>
        <Heading mb={4}>Dashboard</Heading>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={6}>
          <Stat p={4} shadow="md" borderWidth="1px" borderRadius="md" bg={bg}>
            <StatLabel>Total Leads</StatLabel>
            <StatNumber>{totalLeads}</StatNumber>
          </Stat>
          <Stat p={4} shadow="md" borderWidth="1px" borderRadius="md" bg={bg}>
            <StatLabel>Hot Leads</StatLabel>
            <StatNumber>{hotLeads}</StatNumber>
          </Stat>
          <Stat p={4} shadow="md" borderWidth="1px" borderRadius="md" bg={bg}>
            <StatLabel>Cold Leads</StatLabel>
            <StatNumber>{coldLeads}</StatNumber>
          </Stat>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={6}>
          <Box p={4} shadow="md" borderWidth="1px" borderRadius="md" bg={bg}>
            <Heading size="md" mb={4}>Lead Status Distribution</Heading>
            <Pie data={statusData} />
          </Box>
          <Box p={4} shadow="md" borderWidth="1px" borderRadius="md" bg={bg}>
            <Heading size="md" mb={4}>Leads by Industry</Heading>
            <Bar data={industryData} />
          </Box>
          <Box p={4} shadow="md" borderWidth="1px" borderRadius="md" bg={bg}>
            <Heading size="md" mb={4}>Leads Over Time</Heading>
            <Line data={lineData} />
          </Box>
        </SimpleGrid>

        {/* Documents Page Button */}
        <Box mb={2}>
          <Button as={RouterLink} to="/documents" colorScheme="teal">
            Go to Documents
          </Button>
        </Box>

        {/* Meetings Page Button (new) */}
        <Box mb={4}>
          <Button as={RouterLink} to="/meetings" colorScheme="purple">
            Go to Meetings
          </Button>
        </Box>

        <HStack mb={4} spacing={4}>
          <Select
            placeholder="Filter by Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {uniqueStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>
          <Select
            placeholder="Filter by Industry"
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
          >
            {uniqueIndustries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </Select>
        </HStack>

        <Box
          borderRadius="md"
          overflow="auto"
          boxShadow="lg"
          bg={bg}
          border="1px"
          borderColor={borderColor}
        >
          <Table variant="simple" size="md">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Business</Th>
                <Th>Position</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Location</Th>
                <Th>Company Size</Th>
                <Th>Industry</Th>
                <Th>Notes</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredLeads.length ? (
                filteredLeads.map((lead) => (
                  <Tr
                    key={lead.id}
                    _hover={{ bg: hoverBg, transition: "background-color 0.3s" }}
                  >
                    {editingId === lead.id ? (
                      <>
                        <Td>
                          <Input
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          />
                        </Td>
                        <Td>
                          <Input
                            value={editForm.businessName}
                            onChange={(e) => setEditForm({ ...editForm, businessName: e.target.value })}
                          />
                        </Td>
                        <Td>
                          <Input
                            value={editForm.position}
                            onChange={(e) => setEditForm({ ...editForm, position: e.target.value })}
                          />
                        </Td>
                        <Td>
                          <Input
                            value={editForm.email}
                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                          />
                        </Td>
                        <Td>
                          <Input
                            value={editForm.phone}
                            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          />
                        </Td>
                        <Td>
                          <Input
                            value={editForm.location}
                            onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                          />
                        </Td>
                        <Td>
                          <Input
                            value={editForm.companySize}
                            onChange={(e) => setEditForm({ ...editForm, companySize: e.target.value })}
                          />
                        </Td>
                        <Td>
                          <Input
                            value={editForm.industry}
                            onChange={(e) => setEditForm({ ...editForm, industry: e.target.value })}
                          />
                        </Td>
                        <Td>
                          <Input
                            value={editForm.notes}
                            onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                          />
                        </Td>
                        <Td>
                          <Input
                            value={editForm.status}
                            onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                          />
                        </Td>
                        <Td>
                          <VStack spacing={1}>
                            <IconButton
                              icon={<CheckIcon />}
                              size="sm"
                              colorScheme="green"
                              onClick={handleSave}
                              aria-label="Save"
                            />
                            <IconButton
                              icon={<CloseIcon />}
                              size="sm"
                              onClick={handleCancel}
                              aria-label="Cancel"
                            />
                          </VStack>
                        </Td>
                      </>
                    ) : (
                      <>
                        <Td>
                          <Link as={RouterLink} to={`/lead/${lead.id}`} color="blue.500">
                            {lead.name}
                          </Link>
                        </Td>
                        <Td>{lead.businessName}</Td>
                        <Td>{lead.position}</Td>
                        <Td>{lead.email}</Td>
                        <Td>{lead.phone}</Td>
                        <Td>{lead.location}</Td>
                        <Td>{lead.companySize}</Td>
                        <Td>{lead.industry}</Td>
                        <Td>{lead.notes}</Td>
                        <Td>
                          <Badge colorScheme="green">{lead.status}</Badge>
                        </Td>
                        <Td>
                          <VStack spacing={1}>
                            <IconButton
                              icon={<EditIcon />}
                              size="sm"
                              colorScheme="blue"
                              onClick={() => handleEditClick(lead)}
                              aria-label="Edit"
                            />
                            <Button
                              size="xs"
                              colorScheme="red"
                              onClick={() => deleteLead(lead.id)}
                            >
                              Delete
                            </Button>
                          </VStack>
                        </Td>
                      </>
                    )}
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={11} textAlign="center">
                    No leads found.
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </SlideFade>
  );
};

export default Dashboard;
