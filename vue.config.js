const {defineConfig} = require("@vue/cli-service");
// 引入插件
//耗时情况
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
//gzip压缩
const CompressionWebpackPlugin = require("compression-webpack-plugin");
//打包分析
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer");

const path = require("path");

function resolve(dir) {
    return path.join(__dirname, dir);
}

const {
    VUE_APP_PORT,
    VUE_APP_GZIP,
    VUE_APP_CONSOLE,
    VUE_APP_CDN,
    VUE_APP_ANALYSE,
} = process.env;
const {cdn, exclusions} = require("./cdn");
module.exports = defineConfig({
    //生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存,通过将这个选项设为 false 来关闭文件名哈希
    filenameHashing: false,
    //兼容ie
    // transpileDependencies: true,
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
        config.externals = VUE_APP_CDN === "true" ? exclusions : {};
        // 构建时开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
    },
    chainWebpack: (config) => {
        //使用gzip压缩
        if (VUE_APP_GZIP === "true") {
            console.info("使用了gzip压缩");
            config.plugin("compression").use(
                new CompressionWebpackPlugin({
                    // 压缩文件格式
                    filename: "[path][base].gz",
                    // 使用gzip压缩
                    algorithm: "gzip",
                    test: /\.js$|\.css$|\.html$/,
                    // 对超过10kb的文件gzip压缩,默认值是 0。
                    threshold: 10240,
                    // 压缩率小于1才会压缩
                    minRatio: 0.8,
                    // 是否删除原资源
                    deleteOriginalAssets: true,
                })
            );
        }
        //  注入cdn的变量到index.html中
        if (VUE_APP_CDN === "true") {
            config.plugin("html").tap((arg) => {
                console.info("使用了cdn", cdn);
                arg[0].cdn = cdn;
                return arg;
            });
        }
        // 构建包分析
        if (VUE_APP_ANALYSE === "true") {
            console.info("开启了分析");
            config
                .plugin("webpack-bundle-analyzer")
                .use(BundleAnalyzerPlugin.BundleAnalyzerPlugin)
                .end();
        }
        // 配置打包后删除console.log
        if (VUE_APP_CONSOLE === "false") {
            config.optimization.minimizer("terser").tap((args) => {
                args[0].terserOptions.compress.pure_funcs = ["console.log"];
                return args;
            });
        }
        //配置别名
        config.resolve.alias.set("@", resolve("src"));
        config.plugin("speed-measure-webpack-plugin").use(SpeedMeasurePlugin).end();
    },
});
