import { defineConfig, build } from "vite";
import { resolve } from "path";

let isSubBuild = false;

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                popup: resolve(__dirname, "src/popup.html"),
            },
            output: {
                entryFileNames: "[name].js"
            }
        },
        outDir: "dist",
        emptyOutDir: true
    },
    plugins: [
        {
            name: "build-content-background",
            async closeBundle() {
                if (isSubBuild) return;
                isSubBuild = true;

                for (const entry of ["content", "background"]) {
                    await build({
                        configFile: false,
                        build: {
                            lib: {
                                entry: resolve(__dirname, `src/${entry}.js`),
                                formats: ["iife"],
                                name: entry,
                                fileName: () => `${entry}.js`
                            },
                            outDir: resolve(__dirname, "dist"),
                            emptyOutDir: false,
                        },
                    });
                }

                isSubBuild = false;
            }
        }
    ]
});
