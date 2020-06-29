// https://umijs.org/config/
import { defineConfig, utils } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import webpackPlugin from './plugin.config';

const { winPath } = utils;

// preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION, REACT_APP_ENV, GA_KEY } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  analytics: GA_KEY ? { ga: GA_KEY } : false,
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/log',
      component: '../layouts/BlankLayout',
      routes: [
        {
          name: 'log',
          path: '/log',
          component: './log/index',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/project/manager',
            },
            {
              path: '/project',
              name: '项目',
              icon: 'AppstoreOutlined',
              routes: [
                {
                  path: '/project/manager',
                  name: '项目管理',
                  icon: 'SettingOutlined',
                  component: './project/manager/index',
                },

                {
                  path: '/project/template',
                  name: '模板管理',
                  icon: 'FontSizeOutlined',
                  component: './project/template/index',
                },
              ],
            },
            {
              path: '/build',
              name: '构建',
              icon: 'CiCircleOutlined',
              routes: [
                {
                  path: '/build/create',
                  name: '构建镜像',
                  icon: 'PlayCircleOutlined',
                  component: './build/create/index',
                },
                {
                  path: '/build/log',
                  name: '构建日志',
                  icon: 'PieChartOutlined',
                  component: './build/log/index',
                },
              ],
            },
            {
              path: '/deploy',
              name: '发布',
              icon: 'RocketOutlined',
              routes: [
                {
                  path: '/deploy/image',
                  name: '发布镜像',
                  icon: 'RadarChartOutlined',
                  component: './deploy/index',
                },
              ],
            },
            {
              path: '/resource',
              name: '资源',
              icon: 'CloudOutlined',
              routes: [
                {
                  path: '/resource/cloud',
                  name: '云主机',
                  icon: 'CloudServerOutlined',
                  component: './resource/cloud/index',
                },
              ],
            },
            {
              path: '/database/',
              name: '数据库',
              icon: 'DatabaseOutlined',
              routes: [
                {
                  name: '实例',
                  path: '/database/instance',
                  icon: 'CodepenOutlined',
                  component: './resource/database/instance/index',
                },
                {
                  name: '查询',
                  path: '/database/query',
                  icon: 'ConsoleSqlOutlined',
                  component: './resource/database/query/index',
                },
              ],
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  define: {
    REACT_APP_ENV: REACT_APP_ENV || false,
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoader: {
    javascriptEnabled: true,
  },
  cssLoader: {
    modules: {
      getLocalIdent: (
        context: {
          resourcePath: string;
        },
        _: string,
        localName: string,
      ) => {
        if (
          context.resourcePath.includes('node_modules') ||
          context.resourcePath.includes('ant.design.pro.less') ||
          context.resourcePath.includes('global.less')
        ) {
          return localName;
        }
        const match = context.resourcePath.match(/src(.*)/);
        if (match && match[1]) {
          const antdProPath = match[1].replace('.less', '');
          const arr = winPath(antdProPath)
            .split('/')
            .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
            .map((a: string) => a.toLowerCase());
          return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
        }
        return localName;
      },
    },
  },
  manifest: {
    basePath: '/',
  },
  proxy: proxy[REACT_APP_ENV || 'dev'],
  chainWebpack: webpackPlugin,
});
