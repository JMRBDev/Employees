import React from 'react';
import { Box, Flex, HStack, Icon, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { IoInformationCircle, IoWarning } from 'react-icons/io5';
import { MdError } from 'react-icons/md';

interface IAlertProps {
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    actionButton?: {
        icon: IconType,
        onClick: () => void;
    };
};

const Alert = ({ type, message, actionButton }: IAlertProps) => {
    const ALERT_TYPE_DETAILS = {
        success: { color: 'green.500', icon: IoMdCheckmarkCircle },
        error: { color: 'red.500', icon: MdError },
        warning: { color: 'yellow.500', icon: IoWarning },
        info: { color: 'blue.500', icon: IoInformationCircle },
    }

    return (
        <Flex w="full" justify="center" pb={8}>
            <Flex
                maxW={{ base: 'sm', md: 'md' }}
                w="full"
                bg="gray.700"
                shadow="md"
                rounded="lg"
                overflow="hidden"
            >
                <Flex justify="center" align="center" w={16} bg={ALERT_TYPE_DETAILS[type].color}>
                    <Icon as={ALERT_TYPE_DETAILS[type].icon} color="white" boxSize={6} />
                </Flex>

                <Box px={5} py={3} position="relative" w="full">
                    <Text
                        as="span"
                        color={ALERT_TYPE_DETAILS[type].color}
                        fontWeight="bold"
                    >
                        {type.slice(0, 1).toUpperCase() + type.slice(1)}
                    </Text>
                    <Text
                        color="gray.200"
                        fontSize="sm"
                        noOfLines={2}
                    >
                        {message}
                    </Text>
                    <HStack
                        position="absolute"
                        top={1}
                        right={1}
                        spacing={1}
                    >
                        {actionButton && (
                            <Icon
                                as={actionButton.icon}
                                onClick={actionButton.onClick}
                                cursor="pointer"
                                color="gray.500"
                            />
                        )}
                    </HStack>
                </Box>
            </Flex>
        </Flex>
    );
};

export default Alert;
