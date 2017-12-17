const path = require('path');
const glob = require('glob');

let globBasedir;

/**
 *
 */
class WildcardsEntryWebpackPlugin {

    /**
     *
     * @param wildcards
     * @param staticEntries
     * @param namePrefix
     * @param globOptions
     * @returns {Function}
     */
    static entry(wildcards, staticEntries, namePrefix, globOptions) {
        if (!wildcards) {
            throw new Error('please give me a wildcards path by invok WildcardsEntryWebpackPlugin.entry!');
        }

        // Default globOptions
        globOptions = globOptions || {};

        //
        namePrefix = namePrefix ? namePrefix + '/' : '';

        let flagIndex = wildcards.indexOf('/*');
        if (-1 === flagIndex) {
            flagIndex = wildcards.lastIndexOf('/');
        }

        // get the basedir
        let basedir = wildcards.substring(0, flagIndex);
        let file = wildcards.substring(flagIndex + 1);

        basedir = path.resolve(process.cwd(), basedir);

        // Set the globBasedir to the normalized basedir
        globBasedir = basedir = path.normalize(basedir);

        // Return function
        return function () {

            // Glob the directories, pass globOptions aswell
            let foundFiles = glob.sync(path.resolve(basedir, file), globOptions);

            // globEntries
            let globEntries = {};

            // If there are files found
            if (foundFiles.length) {

                // Iterate through the found files
                foundFiles.forEach((entry) => {
                    let dirname = path.dirname(entry);
                    let extname = path.extname(entry);
                    let basename = path.basename(entry, extname);
                    let pathname = path.normalize(path.join(dirname, basename));

                    pathname = getEntryName(pathname, basedir, extname);

                    // Add it to the entries
                    globEntries[namePrefix + pathname] = entry;
                });

            }

            // If we have passed some seperate entries, add them
            if (staticEntries) {
                Object.assign(globEntries, staticEntries);
            }

            // Return
            return globEntries;
        }
    }


    // Webpack apply
    apply(compiler) {

        // Add the globBasedir to webpack
        compiler.plugin("after-compile", function (compilation, callback) {
            compilation.contextDependencies.push(globBasedir);
            callback();
        });
    }
}

/**
 *
 * @param pathname
 * @param basedir
 * @returns {*}
 */
function getEntryName(pathname, basedir) {
    let name;
    if (pathname.startsWith(basedir)) {
        name = pathname.substring(basedir.length + 1)
    }
    return name;
}

// Expose the plugin
module.exports = WildcardsEntryWebpackPlugin;