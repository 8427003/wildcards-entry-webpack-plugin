# wildcards-entry-webpack-plugin


# quick start

### npm install wildcards-entry-webpack-plugin --save-dev

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

# How to use




```
// if you have a tree , like this:
.
├── dist
│   └── js
│       └── index.js
├── src
│   ├── a.js
│   └── js
│       └── index.js
└── webpack.config.js
```
## WildcardsEntryWebpackPlugin.entry(wildcards [,watchDir]);
### @wildcards:

eg 1:    @wildcards: "./src/**/*.js", we will wacth './src', and get name 'js/index'

eg 2:    @wildcards: "./src/js/**/*.js", we will wacth './src/js', and get name 'index'

### @watchDir (optional)

eg 3:    @wildcards: "./src/js/**/*.js", @watchDir: "./src", we will wacth './src', and get name 'js/index'

#### in watch mode, you can add a entry file in watched dir, wepack will get a new entry as your wildcards.

# Dependency
webpack 3

# principle
### 1.dynamic enry
```
//webpack.config.js
{
    enry: function(){}
}
```
### 2.watch dir webpack plugin

```
    apply(compiler) {
        compiler.plugin("after-compile", function (compilation, callback) {
            compilation.contextDependencies.push(YOUR_WATCH_DIR);
            callback();
        });
    }
```



### reference

https://github.com/webpack/webpack/issues/370

https://github.com/webpack/webpack/issues/5407

