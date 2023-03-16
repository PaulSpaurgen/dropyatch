import React, { useState, useEffect } from "react";
import Data from "../../Data";
import {
  Box,
  Flex,
  chakra,
  HStack,
  Input,
  useToast,
  Icon,
  Text,
  Heading,
} from "@chakra-ui/react";
import moment from "moment";
import { MdNetworkCell } from "react-icons/md";
import { AiTwotonePieChart } from "react-icons/ai";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js/auto";
import { Line } from "react-chartjs-2";

// AiTwotonePieChart
const options = {
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Graph for clicks & Impressions",
    },
  },
};
function Dashboard() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [chartData, setChartData] = useState({});
  const [dataToDisp, setDataToDisp] = useState({
    clicksCount: 0,
    totalImpressions: 0,
  });

  const toast = useToast();

  useEffect(() => {
    if (!startDate.length) {
      toast({ description: "please enter a start date", isClosable: true });
      return;
    }
    if (!endDate.length) {
      toast({ description: "please enter an end date", isClosable: true });
      return;
    }
    sortData();
  }, [startDate, endDate]);
  const sortData = () => {
    // console.log({Data})
    let filterStart = moment(startDate).format("MM/DD/YYYY");
    let filterEnd = moment(endDate).format("MM/DD/YYYY");
    let totalClicks = 0;
    let totalImpressions = 0;
    let labels = [];
    let values = [];
    let clicksValues = []
    Data.forEach((val) => {
      if (
        moment(val.date).isAfter(filterStart, "day") &&
        moment(filterEnd).isAfter(val.date, "day")
      ) {
        labels.push(val.date);
        values.push(val.impressions);
        clicksValues.push(val.clicks)
        totalImpressions += Number(val.impressions);
        totalClicks += Number(val.clicks);
      }
    });
    totalClicks = totalClicks.toFixed(2);
    totalImpressions = totalImpressions.toFixed(2);
    setDataToDisp({
      clicksCount: totalClicks,
      totalImpressions: totalImpressions,
    });
    console.log({labels,values})
    const data = {
      labels,
      datasets: [
        {
          label: "Impressions",
          data: values,
          borderColor: "lightgreen",
          backgroundColor: "lightgreen",
        },
        {
          label: "Clicks",
          data: clicksValues,
          borderColor: "lightblue",
          backgroundColor: "lightblue",
        },
      ],
    };
    setChartData(data);
  };
  return (
    <chakra.div w="100%">
      <HStack w="400px" mt="20px">
        <Input
          type="date"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
          }}
          size="sm"
        />
        <Input
          type="date"
          value={endDate}
          onChange={(e) => {
            setEndDate(e.target.value);
          }}
          size="sm"
        />
      </HStack>
      <Box pl="20px">
        <HStack mt="50px" gap="30px">
          <Box
            w="350px"
            h="120px"
            borderRadius="5px"
            boxShadow=" 0 1px 2px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.07), 0 4px 8px rgba(0,0,0,0.07), 0 8px 16px rgba(0,0,0,0.07), 0 16px 32px rgba(0,0,0,0.07), 0 32px 64px rgba(0,0,0,0.07)"
          >
            <HStack padding="20px" paddingBottom="10px">
              <Box padding="4px" borderRadius="50%" bg="violet">
                <Icon as={MdNetworkCell} w={6} h={4} color="white" />
              </Box>
              <Text fontSize="sm" fontWeight="bold">
                Total Clicks
              </Text>
            </HStack>
            <Text paddingLeft="20px" fontSize="3xl" fontWeight="bold">
              {dataToDisp.clicksCount}
            </Text>
          </Box>
          <Box
            w="350px"
            h="120px"
            borderRadius="5px"
            boxShadow=" 0 1px 2px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.07), 0 4px 8px rgba(0,0,0,0.07), 0 8px 16px rgba(0,0,0,0.07), 0 16px 32px rgba(0,0,0,0.07), 0 32px 64px rgba(0,0,0,0.07)"
          >
            <HStack padding="20px" paddingBottom="10px">
              <Box padding="4px" borderRadius="50%" bg="violet">
                <Icon as={AiTwotonePieChart} w={6} h={4} color="white" />
              </Box>

              <Text fontSize="sm" fontWeight="bold">
                Total Impression
              </Text>
            </HStack>
            <Text paddingLeft="20px" fontSize="3xl" fontWeight="bold">
              {dataToDisp.totalImpressions}
            </Text>
          </Box>
        </HStack>
      </Box>
      <Box  padding="20px" mt="30px" >
        <Heading fontSize="sm">Product Trends by Month</Heading>
        {!!Object.entries(chartData).length ? (
          <Box   w="800px" >
             <Line options={options} data={chartData} />
          </Box>
         
        ) : (
          <Flex w="500px" height="200px" alignItems="center" justifyContent="center">
            {" "}
            <Text fontWeight="bold" color="gray.300" > Please select a date range to view the charts</Text>{" "}
          </Flex>
        )}
      </Box>
    </chakra.div>
  );
}

export default Dashboard;
