/**
 * @format
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2021-07-16 11:35:05
 * @LastEditTime: 2025-11-14 16:09:45
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description:
 * @FilePath: /AutoMatedTesting/src/routers/index.ts
 */

import { createBrowserRouter, createHashRouter } from "react-router";
import { routersLibrary } from "./configure.json";
import Home from "@/views/Home";

/* Layout */
// const Layout = () => import('@/layouts/RouterLayout.vue')
// const NotFoundComponent = () => import('@/views/state/404/index.vue')

/**
 * 写在views下的index.vue文件会自动匹配到路径,去隔壁configure.json配置下信息就能自动展示了
 */

const modules = import.meta.glob("../views/**/index.tsx");
// console.log(modules)
// const map = {}
for (const path in modules) {
  console.log(path);
  // modules[path]().then((mod) => {
  //   console.log(path, mod)

  // })
}
// console.log(map)
const routes = [
  { path: "/home", Component: Home },
  { index: true, path: "/", Component: Home },
  // { path: '/:pathMatch(.*)*', name: 'NotFound', Component: NotFoundComponent }
];

const filterRouters = (arr: any) => {
  const returnArray = [];
  arr.forEach((item: any) => {
    const { pathKey, name, children, path, hidden, meta } = item;
    const baseInfo = {
      path,
      name: name + pathKey,
      lazy: async () => {
        // load component and loader in parallel before rendering
        const mod = (await Promise.resolve(
          //路由懒加载(动态导入)
          // pathKey && modules[pathKey] ? modules[pathKey]() : Layout()
          modules[pathKey]()
        )) as any;
        // const [Component] = await Promise.all([
        //   import(`${pathKey}`),
        //   // import("./app-loader"),
        // ]);
        // 动态导入模块并取默认导出作为组件

        const Component = mod?.default ?? mod;
        return { Component };
      },
      // redirect: children ? "noRedirect" : "", // 项目自定义属性
      // alwaysShow: children ? true : false,   // 项目自定义属性
      meta: { ...item, ...meta },
      hidden: hidden ? true : false,
    };
    if (children) {
      //多层嵌套
      let childrenArr;
      if (children) {
        childrenArr = filterRouters(children);
      }
      // Component 将被渲染到 父组件 的 <router-view> 内部
      //  详见：https://router.vuejs.org/zh/guide/essentials/nested-routes.html#%E5%B5%8C%E5%A5%97%E8%B7%AF%E7%94%B1
      //  建议path以 / 开头，以使嵌套路径中的路径成为绝对路径
      //  详见：https://router.vuejs.org/zh/guide/essentials/redirect-and-alias.html
      returnArray.push({
        ...baseInfo,
        children: childrenArr,
      });
    } else {
      //叶子节点
      returnArray.push({
        ...baseInfo,
      });
    }
  });
  return returnArray;
};

const routerArr = filterRouters(routersLibrary);
console.log(routerArr);
routes.push(...routerArr);
export const router = createBrowserRouter(routes);
