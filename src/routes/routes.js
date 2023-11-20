import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";

import PdfEdit from "@/pdf_pages/PdfEdit.vue";
import AllFeatures from "@/pdf_pages/features/AllFeatures.vue";
import PdfMerge from "@/pdf_pages/features/PdfMerge.vue";

//test
import Test from '@/pdf_pages/features/Test.vue'

const routes = [
  {
    path: "/",
    component: PdfEdit,
    redirect: "/allfeatures",
    children: [
      {
        path: "allfeatures",
        component: AllFeatures,
        name: "allfeatures",
      },
      {
        path: "pdfmerge",
        component: PdfMerge,
        name: "pdfmerge",
      },

      {
        path: "test",
        component: Test,
        name: "test",
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

export default routes;
