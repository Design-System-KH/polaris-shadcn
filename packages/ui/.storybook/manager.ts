import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Polaris shadcn',
    brandUrl: './?path=/story/playground--details-page',
    colorPrimary: '#303030',
    colorSecondary: '#005bd3',
    appBg: '#f1f1f1',
    appContentBg: '#ffffff',
    appBorderColor: '#e3e3e3',
    appBorderRadius: 8,
    fontBase:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    textColor: '#303030',
    textInverseColor: '#ffffff',
    barBg: '#ffffff',
    barTextColor: '#616161',
    barSelectedColor: '#005bd3',
  }),
});
