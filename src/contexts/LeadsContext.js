import { createContext, useContext, useState } from "react";

const LeadsContext = createContext();

const initialLeads = [
  {
    id: 1,
    name: "John Doe",
    businessName: "Acme Inc",
    position: "CEO",
    email: "john@acme.com",
    phone: "1234567890",
    location: "New York",
    companySize: "50-100",
    industry: "Technology",
    notes: "Interested in our new product.",
    status: "Hot",
    leadScore: 85,
    createdAt: "2025-07-01",
    activities: [
      {
        id: 1,
        type: "Call",
        description: "Introductory call scheduled",
        date: "2025-07-01",
      },
      {
        id: 2,
        type: "Email",
        description: "Sent proposal and follow-up email",
        date: "2025-07-03",
      },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    businessName: "Beta LLC",
    position: "Marketing Director",
    email: "jane@beta.com",
    phone: "9876543210",
    location: "San Francisco",
    companySize: "10-50",
    industry: "Finance",
    notes: "Requested case studies.",
    status: "Cold",
    leadScore: 40,
    createdAt: "2025-07-05",
    activities: [],
  },
];

export const LeadsProvider = ({ children }) => {
  const [leads, setLeads] = useState(initialLeads);

  const addLead = (lead) => {
    setLeads((prev) => [
      ...prev,
      {
        ...lead,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        activities: [],
      },
    ]);
  };

  const updateLead = (id, updatedData) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) => (lead.id === id ? { ...lead, ...updatedData } : lead))
    );
  };

  const deleteLead = (id) => {
    setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== id));
  };

  const addActivityToLead = (leadId, activity) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === leadId
          ? { ...lead, activities: [...(lead.activities || []), activity] }
          : lead
      )
    );
  };

  return (
    <LeadsContext.Provider
      value={{
        leads,
        setLeads,
        addLead,           // ✅ Added this
        updateLead,
        deleteLead,
        addActivityToLead,
      }}
    >
      {children}
    </LeadsContext.Provider>
  );
};

export const useLeads = () => useContext(LeadsContext);
