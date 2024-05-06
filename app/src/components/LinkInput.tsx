import { useEffect, useState } from 'react';
import { Box, Heading, Input, Button, IconButton, Tag, useToast, Flex } from '@chakra-ui/react';
import { EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { AiFillFilePpt } from "react-icons/ai";
import { FaMicrophoneLines, FaWpforms } from "react-icons/fa6";
import { FaMeetup } from 'react-icons/fa';

const LinkInput = ({ id, label, link, onUpdate, isEditing, setIsEditing }: any) => {
  const [currentLink, setCurrentLink] = useState(link);
  const toast = useToast();


  useEffect(() => {
    setCurrentLink(link)
  }, [link])
  const handleSave = async () => {
    try {
      const response = await fetch(`/api/updateWorkshop`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ presentation: label == "Presentation" ? currentLink : undefined, feedback: label == "Feedback Form" ? currentLink : undefined, meet: label == "Online Call Link" ? currentLink : undefined, workshopId: id }),
      });
      if (!response.ok) throw new Error('Network response was not ok');

      onUpdate(currentLink);
      setIsEditing(false);
      toast({ title: 'Link saved successfully', status: 'success', duration: 3000 });
    } catch (error) {
      toast({ title: 'Error saving link', status: 'error', duration: 3000 });
    }
  };

  return (
    <Flex alignItems="center" w="100%" justify="center">
      {isEditing ? (
        <>
          <Input
            style={{
              border: "1px solid #34394D",
              color: "white",
              height: "3rem",
              fontSize: "1.3rem"
            }}
            borderRadius="0.5rem"
            borderColor="lightgray"
            bg="transparent"
            placeholder={`Paste ${label} link here`}
            value={currentLink}
            onChange={(e) => setCurrentLink(e.target.value)}
            size="sm"
          />
          <IconButton
            aria-label="Save"
            icon={<CheckIcon />}
            onClick={handleSave}
            size="sm"
            colorScheme="green"
            ml={2}
          />
          <IconButton
            aria-label="Cancel"
            icon={<CloseIcon />}
            onClick={() => setIsEditing(false)}
            size="sm"
            colorScheme="red"
            ml={2}
          />
        </>
      ) : (
        <>
          {currentLink ? (
            <Flex align="center" justify="center" gap="2rem">
              <a href={currentLink} target="_blank" style={{ fontSize: "2.5rem", color: "#0087ff", textDecoration: "underline" }}>
                {label}
              </a>
              <IconButton
                aria-label="Edit"
                color="white"
                bg="blue.600"
                _hover={{ bg: "blue.400" }}
                icon={<EditIcon />}
                onClick={() => setIsEditing(true)}
                size="md"
              />
            </Flex>
          ) : (
            <Button
              fontSize="1.6rem"
              borderRadius="1.2rem"
              w="80%"
              height="4rem"
              colorScheme={label == "Presentation" ? "orange" : label == "Feedback Form" ? 'whatsapp' : 'telegram'}
              leftIcon={label == "Presentation" ? <AiFillFilePpt /> : label == "Feedback Form" ? <FaWpforms /> : <FaMicrophoneLines />}
              onClick={() => setIsEditing(true)}
            >
              {`Add ${label}`}
            </Button>
          )}
        </>
      )}
    </Flex>
  );
};

type Props = {
  workshop: any
}
const LinksComponent = ({ workshop }: Props) => {

  const [presentationLink, setPresentationLink] = useState(workshop.links && workshop.links.presentation ? workshop.links.presentation : '');
  const [feedbackLink, setFeedbackLink] = useState(workshop.links && workshop.links.feedback ? workshop.links.feedback : '');
  const [meetLink, setMeetLink] = useState(workshop.links && workshop.links.meet ? workshop.links.meet : '');
  const [isEditingPresentation, setIsEditingPresentation] = useState(false);
  const [isEditingFeedback, setIsEditingFeedback] = useState(false);
  const [isEditingMeet, setIsEditingMeet] = useState(false);
  const router = useRouter()


  useEffect(() => {
    setPresentationLink(workshop.links && workshop.links.presentation ? workshop.links.presentation : '')
    setFeedbackLink(workshop.links && workshop.links.feedback ? workshop.links.feedback : '')
    setMeetLink(workshop.links && workshop.links.meet ? workshop.links.meet : '')
  }, [workshop]);

  return (
    <Flex flexFlow="column" gap="1.5rem">
      <Heading color="#505161" >Links</Heading>
      <LinkInput
        id={router.query.id}
        label="Presentation"
        link={presentationLink}
        onUpdate={setPresentationLink}
        isEditing={isEditingPresentation}
        setIsEditing={setIsEditingPresentation}
      />
      <LinkInput
        id={router.query.id}
        label="Feedback Form"
        link={feedbackLink}
        onUpdate={setFeedbackLink}
        isEditing={isEditingFeedback}
        setIsEditing={setIsEditingFeedback}
      />

      <LinkInput
        id={router.query.id}
        label="Online Call Link"
        link={meetLink}
        onUpdate={setMeetLink}
        isEditing={isEditingMeet}
        setIsEditing={setIsEditingMeet}
      />
    </Flex>
  );
};

export default LinksComponent;
