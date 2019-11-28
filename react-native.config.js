const path = require('path');

const NODE_MODULES_PATH = path.join(__dirname, '/node_modules');

module.exports = {
    assets: ['./assets/fonts'], // stays the same
    dependencies: {
        'react-native-secure-key-store': {
            root: NODE_MODULES_PATH + '/react-native-secure-key-store',
        },
        'rn-fetch-blob': {
            root: NODE_MODULES_PATH + '/rn-fetch-blob',
        },
    },
};