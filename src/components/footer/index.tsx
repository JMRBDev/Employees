import { HStack, Icon, Link } from '@chakra-ui/react';
import React from 'react';
import { IoLogoGithub, IoLogoInstagram, IoLogoLinkedin, IoLogoTwitter } from 'react-icons/io5';
import { BiWorld } from 'react-icons/bi';
import Logo from 'src/components/logo';

const Footer = () => {
    return (
        <HStack justify="space-between">
            <Logo />
            <HStack>
                <Link isExternal href="https://www.jmrb.dev/" _hover={{ color: 'gray.400' }}>
                    <Icon boxSize={4} as={BiWorld} />
                </Link>
                <Link isExternal href="https://www.github.com/JMRBDev" _hover={{ color: 'gray.400' }}>
                    <Icon boxSize={4} as={IoLogoGithub} />
                </Link>
                <Link isExternal href="https://www.linkedin.com/in/jose-rosendo" _hover={{ color: 'gray.400' }}>
                    <Icon boxSize={4} as={IoLogoLinkedin} />
                </Link>
                <Link isExternal href="https://www.twitter.com/joserosendo99" _hover={{ color: 'gray.400' }}>
                    <Icon boxSize={4} as={IoLogoTwitter} />
                </Link>
                <Link isExternal href="https://www.instagram.com/joserosendo99" _hover={{ color: 'gray.400' }}>
                    <Icon boxSize={4} as={IoLogoInstagram} />
                </Link>
            </HStack>
        </HStack>
    );
}

export default Footer;
