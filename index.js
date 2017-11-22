const path = require('path');
const glob = require('glob')

let changeFileName, globBasedir;

class WildcardsEntryWebpackPlugin {

    // make an entry name for every wildcards file;
    // ├── src
    //     ├── a.js
    //     ├── b.js
    //     ├── c.js
    //     └── js
    //         └── index.js
    //
    // eg 1:    @wildcards: "./src/**/*.js", we will wacth './src', and chunk name 'js/index'
    // eg 2:    @wildcards: "./src/js/**/*.js", we will wacth './src/js', and chunk name 'index'
    // eg 3:    @wildcards: "./src/js/**/*.js", @assignEntry: {xxx:'./src/a.js'} and chunk name {index:..., xxx...}
    //
    //
    //
    //@wildcards  string
    //@assignEntry object optional
    static entry(wildcards, assignEntry, namePrefix) {
        if (!wildcards) {
            throw new  Error('please give me a wildcards path by invok WildcardsEntryWebpackPlugin.entry!');
        }

        var namePrefix = namePrefix ? namePrefix + '/' : '';
        var basedir, file;
        let flagIndex = wildcards.indexOf('/*');
        if (-1 === flagIndex) {
            flagIndex = wildcards.lastIndexOf('/');
        }
        basedir = wildcards.substring(0, flagIndex);
        file = wildcards.substring(flagIndex + 1);

        basedir = path.resolve(__dirname, basedir);
        globBasedir = basedir = path.normalize(basedir);

        return function () {
            var files = glob.sync(path.resolve(basedir, file));
            var entries = {},
                entry, dirname, basename, pathname, extname;

            for (var i = 0; i < files.length; i++) {
                entry = files[i];
                dirname = path.dirname(entry);
                extname = path.extname(entry);
                basename = path.basename(entry, extname);
                pathname = path.normalize(path.join(dirname,  basename));
                pathname = getEntryName(pathname, basedir, extname);
                entries[namePrefix + pathname] = entry;
            }
            Object.assign(entries, assignEntry);
            return entries;
        }
    }


    apply(compiler) {
        compiler.plugin("after-compile", function (compilation, callback) {
            compilation.contextDependencies.push(globBasedir);
            callback();
        });
    }
}

function getEntryName (pathname, basedir, extname) {
    var name;
    if(pathname.startsWith(basedir)){
        name = pathname.substring(basedir.length + 1)
    }
    return name;
}

module.exports = WildcardsEntryWebpackPlugin;

