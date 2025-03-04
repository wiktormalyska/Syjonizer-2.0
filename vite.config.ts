import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const htmlFile = env.VITE_MODE === 'dev' ? 'index-dev.html' : 'index-prod.html';
    console.log(`Using HTML file: ${htmlFile}`);

    return {
        plugins: [
            react(),
            viteStaticCopy({
                targets: [
                    {
                        src: 'public/manifest.json',
                        dest: '.',
                    },
                ],
            }),
            tailwindcss(),
        ],
        build: {
            outDir: 'build',
            rollupOptions: {
                input: {
                    main: htmlFile,
                },
            },
        },
        server: {
            open: htmlFile,
        }
    };
});
