const global = () => ({
    '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
    },

    'html, body, #root': {
        height: '100%',
        width: '100%',
    }
});

export default global;