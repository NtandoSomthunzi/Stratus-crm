import {
  Badge,
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Progress,
  SimpleGrid,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import { useMemo, useState, useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const seedPositions = [
  { symbol: "ES", side: "Long", quantity: 2, avg: 5231.25, price: 5242.5, strategy: "NY Open Reversal" },
  { symbol: "NQ", side: "Short", quantity: 1, avg: 18211.0, price: 18174.25, strategy: "Breakout Fade" },
  { symbol: "CL", side: "Long", quantity: 3, avg: 78.64, price: 79.1, strategy: "VWAP Continuation" },
  { symbol: "GC", side: "Short", quantity: 1, avg: 2349.2, price: 2342.8, strategy: "Session Range" },
];

const tickValues = { ES: 50, NQ: 20, CL: 1000, GC: 100 };

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const Dashboard = () => {
  const [positions, setPositions] = useState(seedPositions);
  const [equitySeries, setEquitySeries] = useState([120200, 120450, 120180, 120930, 121340, 121120, 121860]);

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const mutedText = useColorModeValue("gray.600", "gray.400");

  useEffect(() => {
    const interval = setInterval(() => {
      setPositions((prev) =>
        prev.map((position) => {
          const drift = (Math.random() - 0.48) * (position.symbol === "CL" ? 0.2 : 8);
          return {
            ...position,
            price: Number((position.price + drift).toFixed(2)),
          };
        })
      );

      setEquitySeries((prev) => {
        const last = prev[prev.length - 1] ?? 121000;
        const next = Number((last + (Math.random() - 0.45) * 460).toFixed(0));
        return [...prev.slice(-11), next];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const tradeMetrics = useMemo(() => {
    const rows = positions.map((position) => {
      const multiplier = tickValues[position.symbol] ?? 1;
      const direction = position.side === "Long" ? 1 : -1;
      const pnl = (position.price - position.avg) * position.quantity * direction * multiplier;
      return { ...position, pnl };
    });

    const openPnl = rows.reduce((sum, row) => sum + row.pnl, 0);
    const riskUsed = rows.reduce((sum, row) => sum + Math.abs(row.quantity * row.avg), 0);

    return {
      rows,
      openPnl,
      riskUsed,
      winRate: 64,
      tradesToday: 11,
      avgR: 1.42,
      realizedPnl: 2870,
    };
  }, [positions]);

  const exposureData = {
    labels: tradeMetrics.rows.map((row) => row.symbol),
    datasets: [
      {
        label: "Notional Exposure",
        data: tradeMetrics.rows.map((row) => Math.abs(row.quantity * row.price)),
        backgroundColor: ["#3182ce", "#805ad5", "#2f855a", "#d69e2e"],
      },
    ],
  };

  const sideMixData = {
    labels: ["Long", "Short"],
    datasets: [
      {
        data: [
          tradeMetrics.rows.filter((row) => row.side === "Long").length,
          tradeMetrics.rows.filter((row) => row.side === "Short").length,
        ],
        backgroundColor: ["#38a169", "#e53e3e"],
      },
    ],
  };

  const equityCurveData = {
    labels: equitySeries.map((_, index) => `T-${equitySeries.length - index - 1}`),
    datasets: [
      {
        label: "Equity",
        data: equitySeries,
        borderColor: "#2b6cb0",
        backgroundColor: "rgba(49,130,206,0.15)",
        fill: true,
        tension: 0.35,
      },
    ],
  };

  return (
    <VStack align="stretch" spacing={6}>
      <Box>
        <Heading size="lg">Live Trading Dashboard</Heading>
        <Text color={mutedText}>A holistic, real-time view of performance, exposure, and strategy behavior.</Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={4}>
        <Stat bg={cardBg} borderWidth="1px" borderColor={borderColor} borderRadius="xl" p={4}>
          <StatLabel>Open P/L</StatLabel>
          <StatNumber color={tradeMetrics.openPnl >= 0 ? "green.400" : "red.400"}>{formatCurrency(tradeMetrics.openPnl)}</StatNumber>
          <StatHelpText>Updates every 2 seconds</StatHelpText>
        </Stat>
        <Stat bg={cardBg} borderWidth="1px" borderColor={borderColor} borderRadius="xl" p={4}>
          <StatLabel>Realized P/L (Today)</StatLabel>
          <StatNumber>{formatCurrency(tradeMetrics.realizedPnl)}</StatNumber>
          <StatHelpText>{tradeMetrics.tradesToday} trades closed</StatHelpText>
        </Stat>
        <Stat bg={cardBg} borderWidth="1px" borderColor={borderColor} borderRadius="xl" p={4}>
          <StatLabel>Win Rate</StatLabel>
          <StatNumber>{tradeMetrics.winRate}%</StatNumber>
          <Progress mt={2} colorScheme="green" borderRadius="full" value={tradeMetrics.winRate} />
        </Stat>
        <Stat bg={cardBg} borderWidth="1px" borderColor={borderColor} borderRadius="xl" p={4}>
          <StatLabel>Average R Multiple</StatLabel>
          <StatNumber>{tradeMetrics.avgR.toFixed(2)}R</StatNumber>
          <StatHelpText>Risk deployed: {formatCurrency(tradeMetrics.riskUsed)}</StatHelpText>
        </Stat>
      </SimpleGrid>

      <Grid templateColumns={{ base: "1fr", xl: "2fr 1fr" }} gap={4}>
        <GridItem bg={cardBg} borderWidth="1px" borderColor={borderColor} borderRadius="xl" p={4}>
          <Heading size="sm" mb={4}>Open Positions</Heading>
          <Table size="sm" variant="simple">
            <Thead>
              <Tr>
                <Th>Symbol</Th>
                <Th>Side</Th>
                <Th isNumeric>Qty</Th>
                <Th isNumeric>Avg</Th>
                <Th isNumeric>Mark</Th>
                <Th>Strategy</Th>
                <Th isNumeric>Open P/L</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tradeMetrics.rows.map((row) => (
                <Tr key={row.symbol}>
                  <Td fontWeight="bold">{row.symbol}</Td>
                  <Td>
                    <Badge colorScheme={row.side === "Long" ? "green" : "red"}>{row.side}</Badge>
                  </Td>
                  <Td isNumeric>{row.quantity}</Td>
                  <Td isNumeric>{row.avg.toFixed(2)}</Td>
                  <Td isNumeric>{row.price.toFixed(2)}</Td>
                  <Td>{row.strategy}</Td>
                  <Td isNumeric color={row.pnl >= 0 ? "green.400" : "red.400"}>{formatCurrency(row.pnl)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </GridItem>

        <GridItem>
          <VStack spacing={4} align="stretch">
            <Box bg={cardBg} borderWidth="1px" borderColor={borderColor} borderRadius="xl" p={4}>
              <Heading size="sm" mb={4}>Long vs Short Mix</Heading>
              <Doughnut data={sideMixData} />
            </Box>
            <Box bg={cardBg} borderWidth="1px" borderColor={borderColor} borderRadius="xl" p={4}>
              <Heading size="sm" mb={4}>Exposure by Symbol</Heading>
              <Bar data={exposureData} options={{ plugins: { legend: { display: false } } }} />
            </Box>
          </VStack>
        </GridItem>
      </Grid>

      <Box bg={cardBg} borderWidth="1px" borderColor={borderColor} borderRadius="xl" p={4}>
        <Flex justify="space-between" align="center" mb={4}>
          <Heading size="sm">Intraday Equity Curve</Heading>
          <HStack spacing={2} color={mutedText}>
            <Text fontSize="sm">Status:</Text>
            <Badge colorScheme="green">LIVE</Badge>
          </HStack>
        </Flex>
        <Line data={equityCurveData} />
      </Box>
    </VStack>
  );
};

export default Dashboard;
