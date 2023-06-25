import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Box,
  Text,
  Heading,
  Link,
} from "@chakra-ui/react";

const Story = () => {
  var [count, setCount] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${count}`
    )
      .then((resp) => resp.json())
      .then((data) => setData((prevData) => [...prevData, ...data.hits]))
      .catch((err) => console.log(err));
  }, [count]);

  setInterval(() => {
    setCount((count += 1));

    console.log(count);
  }, 10000);

  return (
    <Box>
      {data.length > 0 && (
        <>
          {data.map((ele) => (
            <Box>
              <Card
                style={{ boxShadow: "0px 0px 5px 2px rgba(0, 0, 0, 0.1)" }}
                pl={"20px"}
              >
                <CardHeader>
                  <Heading size="xs" color={"Blue"}>
                    {" "}
                    Title:{ele.title}
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Link href={ele.url}>URL</Link>
                </CardBody>
                <CardFooter>
                  <Text>Created At : {ele.created_at_i}</Text>
                </CardFooter>
                <Text color={"red"}>Author : {ele.author}</Text>
              </Card>
            </Box>
          ))}
        </>
      )}
    </Box>
  );
};

export default Story;
