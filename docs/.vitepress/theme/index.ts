import DefaultTheme from 'vitepress/theme';
import 'vitepress-theme-demoblock/dist/theme/styles/index.css';
import { useComponents } from './useComponents';
import './index.css';
import type { EnhanceAppContext } from 'vitepress/dist/client';
import type { Theme } from 'vitepress';

const myTheme: Theme = {
    ...DefaultTheme,
    enhanceApp(ctx: EnhanceAppContext) {
        useComponents(ctx.app);
    },
};
export default myTheme;
