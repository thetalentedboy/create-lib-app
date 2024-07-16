import type { HeadConfig } from 'vitepress';

export const head: HeadConfig[] = [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.png' }],
    [
        'meta',
        {
            name: 'keywords',
            content: 'hexwei',
        },
    ],
    [
        'meta',
        {
            name: 'description',
            content: 'SDK or lib starter',
        },
    ],
];
