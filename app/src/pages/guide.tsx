// pages/workshop.js
import {
    Box, Container, Heading, Text, VStack, Divider, List, ListItem, UnorderedList
  } from '@chakra-ui/react';
  import Head from 'next/head';
  
  export default function Workshop() {
    return (
      <Box bg="gray.800" color="white">
        <Head>
          <title>Effective Workshop Planning and Execution</title>
          <meta name="description" content="Comprehensive guide to organizing and executing a successful workshop" />
        </Head>
  
        <Container maxW="container.md" p={8}>
          <VStack spacing={8} align="start">
            <Heading as="h1" size="2xl">Comprehensive Workshop Preparation and Execution Guide</Heading>
  
            <Box>
              <Heading as="h2" size="xl">Must Do</Heading>
              <UnorderedList spacing={3} mt={4}>
                <ListItem>
                  <Text as="span" fontWeight="bold">Audience Arrangement:</Text> 
                  Encourage the audience to sit in the front rows to ensure better photos and a more organized appearance. This adjustment enhances visibility, sound quality, and facilitates interaction with speakers during activities like installations.
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">Presentation Slides:</Text> 
                  Design slides that are visually captivating with minimal text and more imagery. Incorporate humor and relatable references to maintain interest. Avoid including content that won't be covered, as this could create confusion, especially for beginners.
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">Technical Setup:</Text> 
                  Address the challenges of local installations, particularly permission errors on Windows platforms. Utilize online IDEs like GitPod, if the WiFi is stable, to streamline the TypeScript development process. Pre-prepare a workshop GitHub repository with all necessary code, sharing it via URL shorteners for easy access. This approach is more efficient than live coding, which can be slow and error-prone.
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">Workshop Execution:</Text> 
                  Focus on imparting an understanding of code logic and execution flow, rather than delving into syntax specifics. This is vital for attendees who are new to programming. Regularly test all aspects of the workshop to minimize the occurrence of live technical errors. Also, consider efficient ways to distribute resources like devnet SOL, perhaps using a script for transferring to participants' wallet addresses.
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">Engagement Strategies:</Text> 
                  Maintain high energy levels and regularly interact with the audience through questions. Encourage participants to raise their hands for queries or issues, as this is more effective than passive invitations to speak. Conclude the workshop with a feedback form, offering incentives like pizzas for completion.
                </ListItem>
              </UnorderedList>
            </Box>
  
            <Divider borderColor="gray.600" />
  
            <Box>
              <Heading as="h2" size="xl">Good to Have</Heading>
              <UnorderedList spacing={3} mt={4}>
                <ListItem>
                  <Text as="span" fontWeight="bold">Social Media Engagement:</Text> 
                  Encourage attendees to document the workshop on social media, tagging relevant organizations or using specific hashtags. Offer rewards for the best posts to further incentivize participation.
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">Dynamic Presentation Elements:</Text> 
                  Start with an animated slide and include engaging media or videos when transitioning between different segments. This approach keeps the audience engaged and prepared for upcoming sections.
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">Interactive Activities:</Text> 
                  Incorporate a quiz towards the end using platforms like Quizzizz, and offer rewards for participation. Consider adding hands-on activities like minting live NFTs to provide a fun and practical experience.
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">Consideration for Beginners:</Text> 
                  Ensure that the workshop content is accessible and understandable to beginners. Have your content reviewed by a non-developer, if possible, for additional insights.
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">Logistics Management:</Text> 
                  Pay attention to the timing of food deliveries and other logistical details to ensure a smooth experience. Set clear expectations at the beginning regarding the workshop's structure and the available prizes or incentives.
                </ListItem>
              </UnorderedList>
            </Box>
  
            <Divider borderColor="gray.600" />
  
            <Box>
              <Heading as="h2" size="xl">Photo Suggestions</Heading>
              <List spacing={3} mt={4}>
                <ListItem>Focus on capturing the audience's engagement during various activities, such as installations, quiz participation, and refreshment breaks.</ListItem>
                <ListItem>Record videos during interactive moments like Q&A sessions to add a dynamic element to post-event content.</ListItem>
                <ListItem>Consider taking photos from the speaker's perspective, capturing the full audience for a unique angle.</ListItem>
              </List>
            </Box>
          </VStack>
        </Container>
      </Box>
    );
  }
  