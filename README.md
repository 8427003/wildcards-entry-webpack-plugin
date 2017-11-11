# wildcards-entry-webpack-plugin


# quick start

```
// webpack.config.js
module.exports = {
    entry: WildcardsEntryWebpackPlugin.entry('./src/js/**/*.entry.js'),
    output: {
        filename: 'dist/[name].js'
    },
    plugins:[
        new WildcardsEntryWebpackPlugin()
    ]
};
```

# how to use

// you have a tree , like this:
// ├── src
//     ├── a.js
//     ├── b.js
//     ├── c.js
//     └── js
//         └── index.js

## WildcardsEntryWebpackPlugin.entry(wildcards [,watchDir]);
### @wildcards:

eg 1:    @wildcards: "./src/**/*.js", we will wacth './src', and get name 'js/index'

eg 2:    @wildcards: "./src/js/**/*.js", we will wacth './src/js', and get name 'index'

### @watchDir (optional)

eg 3:    @wildcards: "./src/js/**/*.js", @watchDir: "./src", we will wacth './src', and get name 'js/index'

