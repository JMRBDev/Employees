const global = () => ({
    '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
    },

    'html, body, #root': {
        maxHeight: '100vh',
        width: '100%',
    }
});

export default global;