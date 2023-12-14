import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Box, Text } from '@chakra-ui/react';
import { getTopUsers } from '@/util/program/getTopUsers';
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import { useAnchorWallet } from '@solana/wallet-adapter-react';

// Define the user type
type User = {
    publicKey: string;
    points: number;
    username: string;
};

type Props = {
    quizCode: number
}

const Leaderboard = ({ quizCode }: Props) => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const wallet = useAnchorWallet();

    useEffect(() => {
        const get = async () => {
            const fetchedUsers = await getTopUsers(
                wallet as NodeWallet,
                quizCode
            );

            if (fetchedUsers.error) return;
            const processedUsers = fetchedUsers.data.map((user: any) => ({
                publicKey: user.publicKey.toBase58().slice(0, 10), // Trimmed publicKey
                points: user.account.points.reduce((acc: number, val: number) => acc + val, 0), // Sum of points
                username: user.account.name
            })).sort((a: any, b: any) => b.points - a.points); // Sort users in descending order by points
            setUsers(processedUsers);
            setIsLoading(false);
        };

        get();
    }, [quizCode, wallet]);

    return (
        <Box maxW="80%" mx="auto" bg="gray.800" p={4} borderRadius="lg">
					<Text color="white" fontSize="2rem" fontWeight={600} mb="2rem">Quiz Over</Text>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <Table variant="simple" colorScheme="whiteAlpha">
                    <Thead>
                        <Tr>
                            <Th color="gray.300">Rank</Th>
                            <Th color="gray.300">Public Key</Th>
                            <Th color="gray.300">Username</Th>
                            <Th color="gray.300">Points</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {users.map((user, index) => (
                            <Tr key={index}>
                                <Td color="gray.100">{index + 1}</Td>
                                <Td color="gray.100">{user.publicKey}</Td>
                                <Td color="gray.100">{user.username}</Td>
                                <Td color="gray.100"> {user.points}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            )}
        </Box>
    );
};

export default Leaderboard;
