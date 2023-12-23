// pages/workshop.js
import { Navbar } from '@/components/Navbar';
import {
  Box, Container, Heading, Text, VStack, Divider, List, ListItem, UnorderedList
} from '@chakra-ui/react';
import Head from 'next/head';

export default function Workshop() {
  return (
    <Box bg="#0E0E10" color="white" w="100%">
      <Navbar />
      <Container maxW="container.lg" p={8}>
        <VStack spacing={8} align="start">
          <Heading as="h1" size="2xl">Good IRL Workshop Conducting Guide</Heading>
          <Box>
            <Heading as="h2" size="xl" color="#A8A0FF">Must Do</Heading>
            <UnorderedList spacing={3} mt={4}>
              <ListItem fontSize="1.4rem">
                <Text as="span" fontWeight="bold">Audience Arrangement: </Text>
                Ask the audience to sit in the front rows if seats are available instead of going all the way back (some people do that by default). This would ensure better photos and a more organized appearance. This also makes visibility and sound better from our presentation. Workshop hosts or assistants also have easier and faster times reaching out to people in the audience for questions, errors, installations etc.
              </ListItem>

              <ListItem fontSize="1.4rem">
                <Text as="span" fontWeight="bold">Presentation Slides: </Text>
                Design slides that are visually good with minimal text and more imagery, no one reads all the text in slides. If possible, add some humor and relatable references to make the audience engaged. Avoid including content that won't be covered, as this could create confusion, especially for beginners. For example, througout the workshop, try not to mention the word "Sealevel" if you are not gonna explain what that is.
              </ListItem>

              <ListItem fontSize="1.4rem">
                <Text as="span" fontWeight="bold">Technical Setup: </Text>
                Local installations are pain for audience. Especially because there are so some odd errors on Windows that are hard to debug for audience especially if you use other OS like Mac/Linux. To solve this, assuming WiFi is stable, utilize online IDEs like GitPo to streamline the TypeScript development process. Pre-prepare a workshop GitHub repository with all necessary code, sharing it via URL shorteners for easy access. This approach is more efficient than live coding, which can be slow and error-prone.
              </ListItem>

              <ListItem fontSize="1.4rem">
                <Text as="span" fontWeight="bold">Airdropping Devnet Solana: </Text>
                It is possible that if you ask the audience to airdrop themselves devnet SOL for any action, then they might get rate limited as their IP address and WiFi connection would be same. Hence, if possible, hoard bunch of Devnet SOL yourself and think of a creative way to airdrop their wallet addresses like 0.2 Devnet Solana each.
              </ListItem>

              <ListItem fontSize="1.4rem">
                <Text as="span" fontWeight="bold">Workshop Execution: </Text>
                Goal should never be for audience to understand code syntax. Never go line by line. Makes sure your goal is for them to <i>understand the code flow</i> and how its executing. They need to understand the logic, not synax. You should keep the assumption that for beginner workshops in colleges especially, even CS students don't know coding well.
              </ListItem>

              <ListItem fontSize="1.4rem">
                <Text as="span" fontWeight="bold">Engagement Strategies: </Text>
                Maintain high energy levels and regularly interact with the audience through questions. Whenever you ask a question, or tell the audience to call you for query/help, make sure to encourage them to raise hands. Generally people are hesitant to speak out themselves. Raising hand is a simple gesture which people often forget and you, as a host, can keep reminding the users to do that.
              </ListItem>

              <ListItem fontSize="1.4rem">
                <Text as="span" fontWeight="bold">For Further Workshops: </Text>
                Conclude the workshop with a feedback form, which should be at max 5 questions only, no one would like to fill long forms. And if possible, try to keep the responses anonymous, thats how you will get REAL feedback, not something sugarcoated. You can also offer incentives like pizzas to only those who show proof of filling feedback form.
              </ListItem>
            </UnorderedList>
          </Box>

          <Divider borderColor="#A8A0FF" />

          <Box>
            <Heading as="h2" size="xl" color="#A8A0FF">Good to Have</Heading>
            <UnorderedList spacing={3} mt={4}>
              <ListItem fontSize="1.4rem">
                <Text as="span" fontWeight="bold">Social Media Engagement: </Text>
                Encourage attendees to document the workshop on social media, tagging relevant handles like maybe @Solana or @SuperteamDAO or mention specific hashtags/keywords so that post workshop, you can filter out tweets to get a sense of how well the audience reacted on Twitter. Offer rewards for the best posts to further incentivize participation.
              </ListItem>
              <ListItem fontSize="1.4rem">
                <Text as="span" fontWeight="bold">Dynamic Presentation Elements: </Text>
                Start with an animated slide and include engaging media or videos when transitioning between different segments of the workshop. This approach keeps the audience engaged and prepared for upcoming sections. For example, if you're teaching TypeScript and are now about to transition to Rust, take a small 2 minute break, and during that transaction, maybe play one of those Solana hackathon videos, or some other fun related media.
              </ListItem>

              <ListItem fontSize="1.4rem">
                <Text as="span" fontWeight="bold">Interactive Activities: </Text>
                Create a quiz towards the end using platforms like Quizzizz, and offer rewards for participation. Consider adding hands-on activities like minting live NFTs to provide a fun and practical experience.
              </ListItem>

              <ListItem fontSize="1.4rem">
                <Text as="span" fontWeight="bold">Consideration for Beginners: </Text>
                Ensure that the workshop content is accessible and understandable to beginners. Have your content reviewed by a non-developer, if possible, for additional insights.
              </ListItem>

              <ListItem fontSize="1.4rem">
                <Text as="span" fontWeight="bold">Logistics Management: </Text>
                Pay attention to the timing of food deliveries and other logistical details to ensure a smooth experience if you have pizzas/drinks distribution. Set clear expectations at the beginning regarding the workshop's structure and the available prizes or incentives. Just so that audience does not have wrong expectations on who will get prizes and who will not.
              </ListItem>
            </UnorderedList>
          </Box>

          <Divider borderColor="#A8A0FF" />

          <Box>
            <Heading as="h2" size="xl" color="#A8A0FF">Photo Suggestions</Heading>
            <List spacing={3} mt={4}>
              <ListItem fontSize="1.4rem">Focus on capturing the audience's engagement during various activities, such as installations, quiz participation, and refreshment breaks.</ListItem>
              <ListItem fontSize="1.4rem">Record videos during interactive moments like Q&A sessions to add a dynamic element to post-event content.</ListItem>
              <ListItem fontSize="1.4rem">Consider taking photos from the speaker's perspective, capturing the full audience for a unique angle.</ListItem>
            </List>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
