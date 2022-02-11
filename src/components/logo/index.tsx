import React from 'react';
import { Image } from '@chakra-ui/react';
import logo from 'src/assets/logo.png'
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <Link to="/">
            <Image maxW={8} src={logo} />
        </Link>
    );
}

export default Logo;
