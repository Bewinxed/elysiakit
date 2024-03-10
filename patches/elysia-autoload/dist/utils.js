"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortByNestedParams = exports.transformToUrl = exports.getPath = void 0;
const node_path_1 = require("node:path");
function getPath(dir) {
    if ((0, node_path_1.isAbsolute)(dir))
        return dir;
    if ((0, node_path_1.isAbsolute)(process.argv[1]))
        return (0, node_path_1.join)(process.argv[1], "..", dir);
    return (0, node_path_1.join)(process.cwd(), process.argv[1], "..", dir);
}
exports.getPath = getPath;
// Inspired by https://github.com/wobsoriano/elysia-autoroutes/blob/main/src/utils/transformPathToUrl.ts#L4C31-L4C31
function transformToUrl(path) {
    const replacements = [
        // Clean the url extensions
        { regex: /\.(ts|tsx|js|jsx|mjs|cjs)$/u, replacement: "" },
        // Handle wild card based routes - users/[...id]/profile.ts -> users/*/profile
        { regex: /\[\.\.\..*\]/gu, replacement: "*" },
        // Handle generic square bracket based routes - users/[id]/index.ts -> users/:id
        {
            regex: /\[(.*?)\]/gu,
            replacement: (_, match) => `:${match}`,
        },
        // Handle the case when multiple parameters are present in one file
        // users / [id] - [name].ts to users /: id -:name and users / [id] - [name] / [age].ts to users /: id -: name /: age
        { regex: /\]-\[/gu, replacement: "-:" },
        { regex: /\]\//gu, replacement: "/" },
        { regex: /\[/gu, replacement: "" },
        { regex: /\]/gu, replacement: "" },
        // remove index from end of path
        { regex: /\/?index$/, replacement: "" },
    ];
    let url = path;
    for (const { regex, replacement } of replacements) {
        url = url.replace(regex, replacement);
    }
    return url.length ? url : "/";
}
exports.transformToUrl = transformToUrl;
function getParamsCount(path) {
    return path.match(/\[(.*?)\]/gu)?.length || 0;
}
// Is it necessary?..
// Sorts by the smallest parameters
function sortByNestedParams(routes) {
    return routes.sort((a, b) => getParamsCount(a) - getParamsCount(b));
}
exports.sortByNestedParams = sortByNestedParams;
