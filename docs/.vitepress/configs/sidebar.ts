import type { DefaultTheme } from 'vitepress';

const getComponentsSidebar = (): DefaultTheme.SidebarItem[] => [
    {
        text: '基础组件',
        items: [{ text: 'Input', link: '/components/basic/input' }],
    }
];

const getGuideSidebar = (): DefaultTheme.SidebarItem[] => [
    {
        text: 'list',
        items: [{ text: '快速上手', link: '/guide/index' },{ text: 'native api', link: '/guide/native' }],
    },
];

export const sidebar: DefaultTheme.Sidebar = {
    '/components/': getComponentsSidebar(),
    '/guide/': getGuideSidebar(),
};
