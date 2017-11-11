var WildcardsEntryWebpackPlugin = require('../index.js');

module.exports = {
    entry: WildcardsEntryWebpackPlugin.entry('./src/js/**/*.entry.js'),
    output: {
        filename: 'dist/[name].js'
    },
    plugins:[
        new WildcardsEntryWebpackPlugin()
    ]
};


