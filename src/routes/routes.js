import Vue from "vue";
import VueRouter from "vue-router";
import VueMeta from "vue-meta";

import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import Admin from "@/pages/admin/Admin.vue";

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

const children = (hasLocale = true) => [
  {
    path: "",
    component: AllFeatures,
    name: hasLocale ? "en_allFeatures" : "allFeature",
  },

  {
    path: (hasLocale ? "/:locale" : "") + "/signup",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/pages/SignUp.vue"),
    name: hasLocale ? "en_signup" : "signup",
  },
  {
    path: (hasLocale ? "/:locale" : "") + "/login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/pages/Login.vue"),
    name: hasLocale ? "en_login" : "login",
  },
  {
    path: (hasLocale ? "/:locale" : "") + `/blog/:title`,
    component: () =>
      import(
        /* webpackChunkName: "mergepdf" */ "@/pdf_pages/features/BlogDetail.vue"
      ),
    name: hasLocale ? "en_blogDetail" : "blogDetail",
  },
  {
    path: (hasLocale ? "/:locale" : "") + `/blog`,
    component: () =>
      import(/* webpackChunkName: "mergepdf" */ "@/pdf_pages/Blog.vue"),
    name: hasLocale ? "en_blog" : "blog",
  },
  {
    path: (hasLocale ? "/:locale" : "") + "/mergepdf",
    component: () =>
      import(
        /* webpackChunkName: "mergepdf" */ "@/pdf_pages/features/MergePdf.vue"
      ),
    name: hasLocale ? "en_mergepdf" : "mergepdf",
  },
  {
    path: (hasLocale ? "/:locale" : "") + "/rotatepdf",
    component: () =>
      import(
        /* webpackChunkName: "mergepdf" */ "@/pdf_pages/features/RotatePdf.vue"
      ),
    name: hasLocale ? "en_rotatepdf" : "rotatepdf",
  },
  {
    path: (hasLocale ? "/:locale" : "") + "/download/:param",
    component: () =>
      import(/* webpackChunkName: "download" */ "@/pdf_pages/DownLoad.vue"),
    name: hasLocale ? "en_download" : "download",
  },
  {
    path: (hasLocale ? "/:locale" : "") + "/splitpdf",
    component: () =>
      import(
        /* webpackChunkName: "splitpdf" */ "@/pdf_pages/features/SplitPdf.vue"
      ),
    name: hasLocale ? "en_splitpdf" : "splitpdf",
  },
  {
    path: (hasLocale ? "/:locale" : "") + "/compresspdf",
    component: () =>
      import(
        /* webpackChunkName: "compresspdf" */ "@/pdf_pages/features/CompressPdf.vue"
      ),
    name: hasLocale ? "en_compresspdf" : "compresspdf",
  },
  {
    path: (hasLocale ? "/:locale" : "") + "/deleted",
    component: () =>
      import(/* webpackChunkName: "deleted" */ "@/pdf_pages/Deleted.vue"),
    name: hasLocale ? "en_deleted" : "deleted",
  },
  {
    path: (hasLocale ? "/:locale" : "") + "/wordtopdf",
    component: () =>
      import(
        /* webpackChunkName: "compresspdf" */ "@/pdf_pages/features/WordToPdf.vue"
      ),
    name: hasLocale ? "en_wordtopdf" : "wordtopd",
  },
  {
    path: (hasLocale ? "/:locale" : "") + "/pdftoword",
    component: () =>
      import(
        /* webpackChunkName: "compresspdf" */ "@/pdf_pages/features/PdfToWord.vue"
      ),
    name: hasLocale ? "en_pdftoword" : "pdftoword",
  },
  {
    path: (hasLocale ? "/:locale" : "") + "/editpdf",
    component: () =>
      import(
        /* webpackChunkName: "compresspdf" */ "@/pdf_pages/features/EditPdfFeature.vue"
      ),
    name: hasLocale ? "en_editpdf" : "editpdf",
  },
  {
    path: (hasLocale ? "/:locale" : "") + "/signpdf",
    component: () =>
      import(
        /* webpackChunkName: "compresspdf" */ "@/pdf_pages/features/SignPdf.vue"
      ),
    name: hasLocale ? "en_signpdf" : "signpdf",
  },
];

const routes = [
  locale === "en"
    ? { path: "/", component: AllFeatures }
    : {
        path: "/",
        redirect: locale,
      },
  {
    path: "/:locale([a-zA-Z]{2}|[a-zA-Z]{2}_[a-zA-Z]{1})",
    beforeEnter: (to, from, next) => {
      if (to.params.locale.length === 2 || to.params.locale.length === 4) {
        next();
      } else {
        next(false);
      }
    },
    component: Root,
    children: [...children(true)],
  },
  ...children(false),
  {
    path: "/admin_dashboard",
    component: Admin,
    redirect: "admin_dashboard/liveview",
    children: [
      {
        path: "liveview",
        name: "liveview",
        component: () =>
          import(
            /* webpackChunkName: "compresspdf" */ "@/pages/admin/LiveView.vue"
          ),
      },
      {
        path: "files",
        name: "files",
        component: () =>
          import(
            /* webpackChunkName: "compresspdf" */ "@/pages/admin/Files.vue"
          ),
      },
      {
        path: "blogcontent",
        name: "blogcontent",
        component: () =>
          import(
            /* webpackChunkName: "compresspdf" */ "@/pages/admin/BlogContent.vue"
          ),
      },
      {
        path: "blogediter",
        name: "blogediter",
        component: () =>
          import(
            /* webpackChunkName: "compresspdf" */ "@/pages/admin/BlogEditer.vue"
          ),
      },
      {
        path: "serverstatus",
        name: "serverstatus",
        component: () =>
          import(
            /* webpackChunkName: "compresspdf" */ "@/pages/admin/ServerStatus.vue"
          ),
      },
      {
        path: "changepassword",
        name: "changepassword",
        component: () =>
          import(
            /* webpackChunkName: "compresspdf" */ "@/pages/admin/ChangePassword.vue"
          ),
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
Vue.use(VueMeta);
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
  let { locale } = to.params;

  // if (locale === "en") {
  //   // Redirect to the same route without the 'en' prefix
  //   const pathWithoutLocale = to.fullPath.replace(/^\/en/, "");
  //   next({ path: pathWithoutLocale });
  //   return;
  // }

  if (locale == undefined) locale = "en";

  loadLocaleMessagesAsync(locale).then(() => {
    setDocumentLang(locale);

    setDocumentDirectionPerLocale(locale);
  });

  next();
});

export default router;
