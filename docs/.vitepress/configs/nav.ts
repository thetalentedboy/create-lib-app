import type { DefaultTheme } from 'vitepress';

export const nav: DefaultTheme.NavItem[] = [
    { text: '指南', link: '/guide/', activeMatch: '^/guide/' },
    { text: '组件', link: '/components/', activeMatch: '^/components/' },
];
