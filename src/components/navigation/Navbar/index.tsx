import React from 'react';
import { HStack, Text, FormControl, Input, IconButton, Icon, Box, Container, Flex, useBreakpointValue, useColorModeValue, Menu, MenuButton, MenuList, MenuItem, Divider } from '@chakra-ui/react';
import { NavLink as Link } from 'react-router-dom';
import NavmenuItem from '../NavmenuItem';

const Navbar = () => {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const menuListBgColor = useColorModeValue('black.300', 'black.900');

    const menuItems = [
        {
            to: '/',
            title: 'Home',
        },
        {
            to: '/employee',
            title: 'Employee',
        },
    ];

    return (
        <Box
            as="nav"
            position="fixed"
            w="full"
            bg="blackAlpha.500"
            style={{ backdropFilter: 'blur(10px) contrast(100%)', WebkitBackdropFilter: 'blur(10px) contrast(100%)' }}
            zIndex={999}
        >
            <Flex
                as={Container}
                display="flex"
                p={2}
                maxW="container.md"
                align="center"
                justify="space-between"
            >
                <Flex align="center" mr={6} color="black.300">
                    <Text fontWeight="bold">Logo</Text>
                </Flex>

                <HStack display={{ base: 'none', md: 'flex' }} flexGrow={1} color="black.300">
                    {menuItems.map((item) => (
                        <NavmenuItem key={`nav-item-${item.title}`} to={item.to} title={item.title} />
                    ))}
                </HStack>

                <Flex align="right">
                    <Flex gridGap={2} display="inline-flex" >
                        {!isMobile && (
                            <FormControl as={HStack} w="auto">
                                <Input placeholder="Search employee" />
                                <IconButton aria-label="Search employee" icon={<Icon />} onClick={() => { }} />
                            </FormControl>
                        )}

                        {isMobile && (
                            <Box display={{ base: 'inline-block', md: 'none' }}>
                                <Menu>
                                    <MenuButton as={IconButton} icon={<Icon />} variant="outline" aria-label="Navigation menu" />
                                    <MenuList bgColor={menuListBgColor}>
                                        {menuItems.map((item) => (
                                            <Link to={item.to} key={`nav-item-${item.title}`}>
                                                <MenuItem>
                                                    {item.title}
                                                </MenuItem>
                                            </Link>
                                        ))}
                                        <Divider />
                                        <Box p={2}>
                                            <FormControl as={HStack} w="auto">
                                                <Input placeholder="Search employee" />
                                                <IconButton aria-label="Search employee" icon={<Icon />} onClick={() => { }} />
                                            </FormControl>
                                        </Box>
                                    </MenuList>
                                </Menu>
                            </Box>
                        )}
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    );
}

export default Navbar;