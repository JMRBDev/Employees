import React from 'react';
import { Divider, FormControl, HStack, Icon, IconButton, Input, Text, Box, Link } from '@chakra-ui/react';

interface ILayoutProps {
    children: React.ReactNode;
};

const Layout = ({ children }: ILayoutProps) => {
    return (
        <Box width={{ base: "container.sm", lg: "container.md", xl: "container.xl" }} m="auto">
            <HStack justify="space-between" py={6}>
                <HStack spacing={8}>
                    <Text fontWeight="bold">Logo</Text>
                    <HStack>
                        <Link href="/">Home</Link>
                        <Link href="/employee">Employee</Link>
                    </HStack>
                </HStack>
                <FormControl as={HStack} width="auto">
                    <Input placeholder="Search employee" />
                    <IconButton aria-label="Search employee" icon={<Icon />} onClick={() => { }} />
                </FormControl>
            </HStack>
            <Divider position="absolute" left={0} />
            <Box mt={6}>
                {children}
            </Box>
        </Box>
    );
}

export default Layout;
