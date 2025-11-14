import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { registerServiceWorker } from '@/utils/serviceWorker'
import { router } from '@/routers'
import "./global.css";


registerServiceWorker()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<div className="skeleton-loader">加载中...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode >
);