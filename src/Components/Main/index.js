import React from "react";
import { chakra, Box, Flex, Heading, VStack, Button,Text } from "@chakra-ui/react";
import Dashboard from "../Dashboard";

const buttonGroup = [
  {
    name: "Analytics",
    url: "",
  },
  {
    name: "Ecommerce",
    url: "",
  },
  {
    name: "Notes",
    url: "",
  },
  {
    name: "Calender",
    url: "",
  },
  {
    name: "Extras",
    url: "",
  },
];
export default function Main() {
  return (
    <chakra.div>
      <Flex w="100%" >
        <Box w="15%" bg="gray.100" h="100vh">
          <Heading color="violet"  padding="20px" textAlign="center">
            Dashboard
          </Heading>

          <VStack padding="20px" mt="30px" ml="40px" alignItems="flex-start" gap="16px">
            {
              buttonGroup.map((val,index)=>(
               <Text key={index} fontWeight="bold"  cursor="pointer">
                  {val.name}
               </Text>
              ))
            }
          </VStack>
        </Box>
        <Box padding="20px" height="100vh" w="85%">
          <Dashboard />

        </Box>
      </Flex>
    </chakra.div>
  );
}
