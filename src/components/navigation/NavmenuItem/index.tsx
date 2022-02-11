import React from 'react';
import { NavLink as Link, useMatch, useResolvedPath } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

interface INavmenuItemProps {
    to: string;
    title: string;
};

const NavmenuItem = ({ to, title }: INavmenuItemProps) => {
    const resolved = useResolvedPath(to);
    const match = useMatch({ path: resolved.pathname, end: true });

    return (
        <Box fontWeight={match ? 'bold' : 'normal'} bg={match ? 'brand.100' : 'none'} color={match ? 'brand.900' : 'none'} px={3} py={0.5} borderRadius={3}>
            <Link to={to}>{title}</Link>
        </Box>
    );
}

export default NavmenuItem;
