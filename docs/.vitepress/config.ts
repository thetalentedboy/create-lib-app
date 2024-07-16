import { defineConfig } from 'vitepress';

import { demoblockPlugin, demoblockVitePlugin } from 'vitepress-theme-demoblock';
import { head } from './configs/head';
import { sidebar } from './configs/sidebar';
import { nav } from './configs/nav';
import * as path from 'path';

export default defineConfig({
    title: 'xxx SDK',
    base: '/',
    description: 'SDK Document',
    head: head,
    lastUpdated: true,
    themeConfig: {
        // socialLinks: [{ icon: "github", link: "https://github.com" }],
        outline: 'deep',
        sidebar: sidebar,
        nav: nav,
        search: {
            provider: 'local',
        },
    },
    markdown: {
        config: (md) => {
            md.use(demoblockPlugin);
        },
    },
    vite: {
        plugins: [demoblockVitePlugin()],
        resolve: {
            alias: {
                sdk: path.resolve(__dirname, 'sdk.es.js'),
                'sdk.css': path.resolve(__dirname, 'sdk.css'),
            },
        },
    },
});
