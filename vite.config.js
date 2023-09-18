import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import legacy from "@vitejs/plugin-legacy";
import svg from "vite-plugin-svgo";
import checker from "vite-plugin-checker";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        legacy({
            targets: ["defaults", "not IE 11"]
        }),
        svg(),
        checker({
            stylelint: {
                lintCommand: "stylelint ./src/**/*.{css,vue} --fix"
            },
            eslint: {
                // for example, lint .ts and .tsx
                lintCommand: 'eslint "./src/**/*.{js,vue,html}"',
                logLevel: 'error'
            }
        })
    ],
    server: {
        hmr: {
            overlay: false
        }
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src")
        }
    }
});
