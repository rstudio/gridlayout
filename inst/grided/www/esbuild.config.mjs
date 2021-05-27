  
import esbuild from "esbuild";
import babel from "esbuild-plugin-babel";
// import readcontrol from "readcontrol";
import process from "process";
import globalsPlugin from "esbuild-plugin-globals";

let watch = process.argv.length >= 3 && process.argv[2] == "--watch";

let outdir = "dist/";
let opts = {
  entryPoints: ["index.ts"],
  bundle: true,
  watch: watch,
  plugins: [
    globalsPlugin({
      jquery: "window.jQuery",
      strftime: "window.strftime",
    }),
    babel(),
  ],
  target: "es5",
  sourcemap: true,
};

console.log("Building to dist/index.js");
await esbuild.build({
  ...opts,
  outfile: outdir + "index.js",
});

// console.log("Building shiny.min.js");
// await esbuild.build({
//   ...opts,
//   outfile: outdir + "shiny.min.js",
//   minify: true,
// });