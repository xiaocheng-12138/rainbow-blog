const {defineConfig} = require("@vue/cli-service");
// 引入插件
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

// import config from "./package.json";

function replace(str) {
    return str.replace("^", "");
}

const path = require("path");

function resolve(dir) {
    return path.join(__dirname, dir);
}

const {VUE_APP_PORT, VUE_APP_CONSOLE, VUE_APP_GZIP, VUE_APP_CND} =
    process.env;
//cdn链接
const cdn = {
    css: [`https://cdn.bootcdn.net/ajax/libs/element-plus/2.2.28/index.css`],
    js: [
        "https://cdn.bootcdn.net/ajax/libs/vue/3.2.13/vue.global.js",
        "https://cdn.bootcdn.net/ajax/libs/vue-router/4.0.3/vue-router.global.js",
        "https://cdn.bootcdn.net/ajax/libs/vuex/4.0.0/vuex.global.js",
        "https://cdn.bootcdn.net/ajax/libs/axios/1.2.2/axios.js",
        "https://cdn.bootcdn.net/ajax/libs/element-plus/2.2.28/index.full.js",
    ],
};

let objExternals = {
    vue: "Vue",
    axios: "axios",
    vuex: "Vuex",
    "vue-router": "VueRouter",
    "element-plus": "ElementPlus",
};
module.exports = defineConfig({
    //生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存,通过将这个选项设为 false 来关闭文件名哈希
    filenameHashing: false,

    transpileDependencies: true,
    // 默认'/'，部署应用包时的基本 URL
    publicPath: "/",
    // 相对于outputDir的静态资源(js、css、img、fonts)目录
    assetsDir: "static",
    // 是否使用包含运行时编译器的 Vue 构建版本
    runtimeCompiler: true,
    // 生产环境的 source map
    productionSourceMap: false,
    devServer: {
        // 是否自动打开浏览器访问此项目
        open: false,
        //热更新
        hot: true,
        host: "127.0.0.1",
        port: VUE_APP_PORT,
    },
    configureWebpack: (config) => {
        // 构建时开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
        if (VUE_APP_GZIP) {
            productionGzip &&
            config.plugins.push(
                new CompressionWebpackPlugin({
                    test: new RegExp("\\.('js|css')$"),
                    threshold: 8192,
                    minRatio: 0.8,
                })
            );
        }
        //移除console
        if (!VUE_APP_CONSOLE) {
            // 去掉注释
            config.plugins.push(
                new UglifyJsPlugin({
                    uglifyOptions: {
                        output: {
                            comments: true,
                        },
                        compress: {
                            warnings: true,
                            drop_console: true,
                            drop_debugger: true,
                            pure_funcs: ["console.log"],
                        },
                    },
                })
            );
            // 使用cdn
            if (VUE_APP_CND) {
                config.plugins("html").tap((args) => {
                    console.log("使用了cdn", cdn);
                    args[0].cdn = cdn;
                    return args;
                });
            }
        }
    },
    configureWebpack: {
        externals: VUE_APP_CND ? objExternals : {},
    },
    chainWebpack: (config) => {
        //  注入cdn的变量到index.html中
        if (VUE_APP_CND) {
            config.plugin("html").tap((arg) => {
                arg[0].cdn = cdn;
                return arg;
            });
        }
        //配置别名
        config.resolve.alias.set("@", resolve("src"));
        config.plugin("speed-measure-webpack-plugin").use(SpeedMeasurePlugin).end();
    },
});
