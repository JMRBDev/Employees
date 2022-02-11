import React from 'react';
import { HStack, IconButton, Icon, Box, Container, Flex, useBreakpointValue, useColorModeValue, Menu, MenuButton, MenuList, MenuItem, Divider } from '@chakra-ui/react';
import { NavLink as Link } from 'react-router-dom';
import NavmenuItem from 'src/components/navigation/NavmenuItem';
import Logo from 'src/components/logo';
import SearchBar from 'src/components/searchBar';

const Navbar = () => {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const menuListBgColor = useColorModeValue('black.300', 'black.900');

    const menuItems = [
        {
            to: '/',
            title: 'Home',
        },
        {
            to: '/new',
            title: 'New',
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
            <HStack
                as={Container}
                p={2}
                maxW="container.md"
                align="center"
                justify="space-between"
                gap={8}
            >
                <Flex align="center" color="black.300">
                    <Logo />
                </Flex>

                <HStack display={{ base: 'none', md: 'flex' }} flexGrow={1} color="black.300">
                    {menuItems.map((item) => (
                        <NavmenuItem key={`nav-item-${item.title}`} to={item.to} title={item.title} />
                    ))}
                </HStack>

                <Flex align="right">
                    <Flex gap={2} display="inline-flex">
                        {!isMobile && (
                            <SearchBar />
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
                                            <SearchBar />
                                        </Box>
                                    </MenuList>
                                </Menu>
                            </Box>
                        )}
                    </Flex>
                </Flex>
            </HStack>
        </Box>
    );
}

export default Navbar;
