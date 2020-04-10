export default {
  fontFamily: 'Roboto, sans-serif',
  palette: {
    type: 'dark',
    text: { secondary: 'rgba(255, 255, 255, 0.5)' },
    primary: { main: '#00bcd4' },
    secondary: { main: '#ff3d00' },
    header: { background: '#000000', text: '#ffffff' },
    navAlt: { background: '#14262c', backgroundHeader: '#2d4b5b' },
    navBottom: { background: '#0f181f' },
    background: {
      paper: '#303a3d',
      paperLight: '#265058',
      nav: '#1a1a1a',
      navLight: '#14262c',
    },
    action: { disabled: '#4f4f4f' },
    divider: 'rgba(255, 255, 255, 0.2)',
  },
  typography: {
    useNextVariants: true,
    body2: {
      fontSize: '0.8rem',
    },
    body1: {
      fontSize: '0.9rem',
    },
    h1: {
      margin: '0 0 10px 0',
      padding: 0,
      color: '#00bcd4',
      fontWeight: 400,
      fontSize: 22,
    },
    h2: {
      margin: '0 0 10px 0',
      padding: 0,
      color: '#ffffff',
      fontWeight: 400,
      fontSize: 15,
    },
    h3: {
      margin: '0 0 10px 0',
      padding: 0,
      color: '#00bcd4',
      fontWeight: 400,
      fontSize: 13,
    },
    h4: {
      margin: '0 0 10px 0',
      padding: 0,
      color: '#ffffff',
      fontWeight: 400,
      fontSize: 13,
    },
    h5: {
      color: '#ffffff',
      fontWeight: 400,
      fontSize: 13,
      textTransform: 'uppercase',
      marginTop: -4,
    },
    h6: {
      color: '#ffffff',
      fontWeight: 400,
      fontSize: 18,
    },
  },
};
