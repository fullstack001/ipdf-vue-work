import Vue from "vue";
import VueRouter from "vue-router";

import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";

import Root from "./Root";
import i18n, { loadLocaleMessagesAsync } from "@/i18n";
import {
  setDocumentDirectionPerLocale,
  setDocumentLang,
} from "@/util/i18n/document";

import AllFeatures from "@/pdf_pages/features/AllFeatures.vue";

Vue.use(VueRouter);

const { locale } = i18n;
// console.log(locale);

const routes = [
  {
    path: "/",
    redirect: locale,
  },
  {
    path: "/:locale",
    component: Root,
    children: [
      {
        path: "",
        component: AllFeatures,
        name: "allfertures",
      },

      {
        path: "/:locale/signup",
        component: () =>
          import(/* webpackChunkName: "login" */ "@/pages/SignUp.vue"),
        name: "signup",
      },
      // {
      //   path: "/:locale/login",
      //   component: () =>
      //     import(/* webpackChunkName: "login" */ "@/pages/Login.vue"),
      //   name: "login",
      // },
      {
        path: "/:locale/mergepdf",
        component: () =>
          import(
            /* webpackChunkName: "mergepdf" */ "@/pdf_pages/features/MergePdf.vue"
          ),
        name: "mergepdf",
      },
      // {
      //   path: "/:locale/rotatepdf",
      //   component: () =>
      //     import(
      //       /* webpackChunkName: "mergepdf" */ "@/pdf_pages/features/RotatePdf.vue"
      //     ),
      //   name: "rotatepdf",
      // },
      {
        path: "/:locale/download/:param",
        component: () =>
          import(/* webpackChunkName: "download" */ "@/pdf_pages/DownLoad.vue"),
        name: "download",
      },
      {
        path: "/:locale/splitpdf",
        component: () =>
          import(
            /* webpackChunkName: "splitpdf" */ "@/pdf_pages/features/SplitPdf.vue"
          ),
        name: "splitpdf",
      },
      {
        path: "/:locale/compresspdf",
        component: () =>
          import(
            /* webpackChunkName: "compresspdf" */ "@/pdf_pages/features/CompressPdf.vue"
          ),
        name: "compresspdf",
      },
      {
        path: "/:locale/deleted",
        component: () =>
          import(/* webpackChunkName: "deleted" */ "@/pdf_pages/Deleted.vue"),
        name: "deleted",
      },
      {
        path: "/:locale/wordtopdf",
        component: () =>
          import(
            /* webpackChunkName: "compresspdf" */ "@/pdf_pages/features/WordToPdf.vue"
          ),
        name: "wordtopdf",
      },
      {
        path: "/:locale/pdftoword",
        component: () =>
          import(
            /* webpackChunkName: "compresspdf" */ "@/pdf_pages/features/PdfToWord.vue"
          ),
        name: "pdftoword",
      },
      {
        path: "/:locale/editpdf",
        component: () =>
          import(
            /* webpackChunkName: "compresspdf" */ "@/pdf_pages/features/EditPdfFeature.vue"
          ),
        name: "editpdf",
      },
      {
        path: "/:locale/signpdf",
        component: () =>
          import(
            /* webpackChunkName: "compresspdf" */ "@/pdf_pages/features/SignPdf.vue"
          ),
        name: "signpdf",
      },
    ],
  },
  {
    path: "/profile",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "user",
        name: "User Profile",
        component: UserProfile,
      },
      {
        path: "table",
        name: "Table List",
        component: TableList,
      },
      {
        path: "typography",
        name: "Typography",
        component: Typography,
      },
      {
        path: "icons",
        name: "Icons",
        component: Icons,
      },
      {
        path: "maps",
        name: "Maps",
        meta: {
          hideFooter: true,
        },
        component: Maps,
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.params.locale === from.params.locale) {
    next();
    return;
  }
  // console.log(to.params.locale);
  const { locale } = to.params;
  // if (locale === "en") {
  //   // Redirect to the same route without the 'en' prefix
  //   const pathWithoutLocale = to.fullPath.replace(/^\/en/, "");
  //   next({ path: pathWithoutLocale });
  //   return;
  // }

  loadLocaleMessagesAsync(locale).then(() => {
    setDocumentLang(locale);

    setDocumentDirectionPerLocale(locale);
  });

  next();
});

export default router;
