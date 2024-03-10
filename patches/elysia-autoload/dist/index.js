"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoload = void 0;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const elysia_1 = require("elysia");
const utils_1 = require("./utils");
const TYPES_OUTPUT_DEFAULT = "./routes-types.ts";
const TYPES_TYPENAME_DEFAULT = "Routes";
async function autoload({ pattern, dir, prefix, schema, types, } = {}) {
    const directoryPath = (0, utils_1.getPath)(dir || "./routes");
    if (!(0, node_fs_1.existsSync)(directoryPath))
        throw new Error(`Directory ${directoryPath} doesn't exists`);
    if (!(0, node_fs_1.statSync)(directoryPath).isDirectory())
        throw new Error(`${directoryPath} isn't a directory`);
    const app = new elysia_1.default({
        name: "elysia-autoload",
        seed: {
            pattern,
            dir,
            prefix,
            types,
        },
    });
    const glob = new Bun.Glob(pattern || "**/*.{ts,tsx,js,jsx,mjs,cjs}");
    const files = await Array.fromAsync(glob.scan({
        cwd: directoryPath,
    }));
    const paths = [];
    for await (const path of (0, utils_1.sortByNestedParams)(files)) {
        const fullPath = (0, node_path_1.join)(directoryPath, path);
        const file = await Promise.resolve(`${(0, node_path_1.join)(directoryPath, path)}`).then(s => require(s));
        if (!file.default)
            throw new Error(`${path} don't provide export default`);
        const url = (0, utils_1.transformToUrl)(path);
        const groupOptions = schema ? schema({ path, url }) : {};
        // Типы свойства "body" несовместимы.
        // Тип "string | TSchema | undefined" не может быть назначен для типа "TSchema | undefined".
        // Тип "string" не может быть назначен для типа "TSchema".ts(2345)
        // @ts-expect-error why....
        app.group(`${prefix ?? ""}${url.startsWith("/") ? "" : "/"}${url}`, groupOptions, file.default);
        if (types)
            paths.push(fullPath.replace(directoryPath, ""));
    }
    if (types) {
        const imports = paths.map((x, index) => `import type Route${index} from "${directoryPath + x.replace(".ts", "").replace(".tsx", "")}";`);
        for await (const outputPath of types === true || !types.output
            ? [TYPES_OUTPUT_DEFAULT]
            : Array.isArray(types.output)
                ? types.output
                : [types.output]) {
            await Bun.write((0, utils_1.getPath)(outputPath), [
                `import type { ElysiaWithBaseUrl } from "elysia-autoload";`,
                imports.join("\n"),
                "",
                types === true || !types.useExport ? "declare global {" : "",
                `    export type ${types === true || !types.typeName
                    ? TYPES_TYPENAME_DEFAULT
                    : types.typeName} = ${paths
                        .map((x, index) => `ElysiaWithBaseUrl<"${prefix ?? ""}${(0, utils_1.transformToUrl)(x) || "/"}", ReturnType<typeof Route${index}>>`)
                        .join("\n              & ")}`,
                types === true || !types.useExport ? "}" : "",
            ].join("\n"));
        }
    }
    return app;
}
exports.autoload = autoload;
__exportStar(require("./types"), exports);
