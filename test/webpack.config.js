var WildcardsEntryWebpackPlugin = require('../index.js');

module.exports = {
    entry: WildcardsEntryWebpackPlugin.entry('./src/**/*.entry.js', {xxx: './src/a.js'}, "js_prefix"),
    output: {
        filename: 'dist/[name].js'
    },
    plugins:[
        new WildcardsEntryWebpackPlugin()
    ]
};


