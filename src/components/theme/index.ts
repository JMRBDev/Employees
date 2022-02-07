import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';
import { Dict } from '@chakra-ui/utils';

import global from './styles';

const theme: Dict<any> = {
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },

  colorMode: 'dark',

  styles: {
    global,
  },

  colors: {
    brand: {
      50: '#D6E8FF',
      100: '#ADD1FF',
      200: '#85BAFF',
      300: '#5CA3FF',
      400: '#338BFF',
      500: '#006FFF',
      600: '#0061E0',
      700: '#0050B8',
      800: '#003E8F',
      900: '#002C66',
    },
  },
};

export default extendTheme(theme, withDefaultColorScheme({ colorScheme: 'brand' }));