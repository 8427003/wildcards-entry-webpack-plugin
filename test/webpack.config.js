var WildcardsEntryWebpackPlugin = require('../index.js');

module.exports = {
    entry: WildcardsEntryWebpackPlugin.entry('./src/**/*.entry.js', {xxx: './src/a.js'}),
    output: {
        filename: 'dist/[name].js'
    },
    plugins:[
        new WildcardsEntryWebpackPlugin()
    ]
};


