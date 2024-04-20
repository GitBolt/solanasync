import { Box, Button, Flex, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text, Textarea, VStack } from "@chakra-ui/react";
import { FaArrowCircleRight } from "react-icons/fa";
import DateTimePicker from "react-datetime-picker";

type Props = {
  setDetails: React.Dispatch<React.SetStateAction<{}>>,
  details: any,
  handleCreateWorkshop: () => any
}

export const CreateWorkshop = ({ setDetails, details, handleCreateWorkshop }: Props) => {
  return (
    <VStack padding="2rem" spacing="1rem" w="35rem" height="auto" textAlign="center" bg="#13131A" boxShadow="0px 3.59px 31.9px 0px rgba(0, 0, 0, 0.50)" border="1px solid #191A2B" borderRadius="1rem">
      <Text fontSize="1.8rem" color="white" fontWeight="500">
        New Workshop
      </Text>

      <Box w="100%">
        <Text fontSize="1.2rem" color="#838DE9" fontWeight="500"  textAlign="start">Title</Text>
        <Input
          onChange={(e) => setDetails({ ...details, title: e.target.value })}
          variant="flushed"
          color="white"
          fontSize="1rem"
          placeholder="Title"
          borderColor="#414664"
        />
      </Box>

      <Box w="100%">
        <Text fontSize="1.2rem" color="#838DE9" fontWeight="500"  textAlign="start">Location</Text>
        <Input
          onChange={(e) => setDetails({ ...details, location: e.target.value })}
          variant="flushed"
          color="white"
          fontSize="1rem"
          placeholder="Title"
          borderColor="#414664"
        />
      </Box>

      <Box w="100%">
        <Text fontSize="1.2rem" color="#838DE9" fontWeight="500"  textAlign="start">Start</Text>
        <DateTimePicker className="picker" calendarClassName="calender" onChange={(e) => setDetails({ ...details, start: e })} value={details.start} />
      </Box>

      <Box w="100%">
        <Text fontSize="1.2rem" color="#838DE9" fontWeight="500"  textAlign="start">End</Text>
        <DateTimePicker className="picker" calendarClassName="calender" onChange={(e) => setDetails({ ...details, end: e })} value={details.end} />
      </Box>

      <Box w="100%">
        <Text fontSize="1.2rem" color="#838DE9" fontWeight="500"  textAlign="start">Description</Text>
        <Textarea
          onChange={(e) => setDetails({ ...details, description: e.target.value })}
          variant="flushed"
          color="white"
          fontSize="1rem"
          placeholder="This is an educational workshop"
          borderColor="#414664"
        />
      </Box>

      <Box w="100%">
        <Text fontSize="1.2rem" color="#838DE9" fontWeight="500"  textAlign="start">Capacity</Text>

        <Flex>
          <NumberInput min={1} max={500} maxW='100px' mr='2rem' value={details.capacity}
            onChange={(e) => setDetails({ ...details, capacity: e })}
          >
            <NumberInputField color="white" />
            <NumberInputStepper >
              <NumberIncrementStepper color="white" />
              <NumberDecrementStepper color="white" />
            </NumberInputStepper>
          </NumberInput>
          <Slider
            max={500}
            min={1}
            flex='1'
            focusThumbOnChange={false}
            value={details.capacity}
            onChange={(e) => setDetails({ ...details, capacity: e })}

          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb fontSize='sm' fontWeight={700} boxSize='2rem' children={details.capacity} />
          </Slider>
        </Flex>

      </Box>

      <Button
        background="#5F54D8"
        color="white"
        borderRadius="1rem"
        fontSize="1.2rem"
        height="3rem"
        w="100%"
        mt="1.5rem"
        rightIcon={<FaArrowCircleRight />}
        onClick={handleCreateWorkshop}
        _hover={{ background: "#9A91FF" }}
      >
        Add Workshop
      </Button>
    </VStack>
  );
}
