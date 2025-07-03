import { createBrowserRouter } from "react-router-dom";
import Auth from "../Layout/Auth/Auth";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Dashboard/Home";
import Users from "../Pages/Dashboard/Users";
import Admin from "../Pages/Dashboard/Admin";
import AboutUs from "../Pages/Dashboard/AboutUs";
import PrivacyPolicy from "../Pages/Dashboard/PrivacyPolicy";

import ChangePassword from "../Pages/Auth/ChangePassword";
import Login from "../Pages/Auth/Login";
import Subscription from "../Pages/Dashboard/Subscription";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import VerifyOtp from "../Pages/Auth/VerifyOtp";
import ResetPassword from "../Pages/Auth/ResetPassword";
import NotFound from "../NotFound";
import Notifications from "../Pages/Dashboard/Notifications";
import AdminProfile from "../Pages/Dashboard/AdminProfile/AdminProfile";
import User from "../Pages/Dashboard/User";
import Blogs from "../Pages/Dashboard/Blogs";
import FAQ from "../Pages/Dashboard/FAQ";
import Press from "../Pages/Dashboard/Press";
import AffiliateProgram from "../Pages/Dashboard/AffliateProgram";
import Support from "../Pages/Dashboard/Support";
import SafetyTips from "../Pages/Dashboard/SafetyTips";
import CookiePolicy from "../Pages/Dashboard/CookiePolicy";

import Analytics from "../Pages/Dashboard/Analytics";
import Promotion from "../Pages/Dashboard/Promotion";

import UserProfile from "../Pages/Dashboard/AdminProfile/UserProfile";
import TermsAndCondition from "../Pages/Dashboard/TermsAndCondition";

import Vendors from "../Pages/Dashboard/Vendors";
import PrivateRoute from "./PrivateRoute";
import Banners from "../Pages/Dashboard/Banners";
import EditBanners from "../components/ui/Banners/EditBanners";
import AddBanners from "../components/ui/Banners/AddBanners";
import Categories from "../Pages/Dashboard/Categories";
import TermsAndConditions from "../Pages/PublicPages/TermsAndConditions";
import PublicPrivacy from "../Pages/PublicPages/PublicPrivacy";
import PaymentSuccess from "../components/ui/Public/PaymentSuccess";
import ObBoardSuccess from "../components/ui/Public/OnBoardSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <ProtectedRoute><Main /></ProtectedRoute> ,
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/analytics",
        element: <Analytics />,
      },
      {
        path: "/add-banner",
        element: <AddBanners />,
      },
      {
        path: "/banners",
        element: <Banners />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/update-banner/:id",
        element: <EditBanners />,
      },
      {
        path: "/user/profile/:id",
        element: <User />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/vendors",
        element: <Vendors />,
      },

      {
        path: "/promotion",
        element: <Promotion />,
      },
      {
        path: "/personal-information",
        element: <UserProfile />,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      },

      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/subscription",
        element: <Subscription />,
      },

      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-and-condition",
        element: <TermsAndCondition />,
      },
      // {
      //   path: "/edit-terms-and-conditions",
      //   element: <TermsAndCondition />,
      // },
      {
        path: "/press",
        element: <Press />,
      },
      {
        path: "/affiliate-program",
        element: <AffiliateProgram />,
      },
      {
        path: "/support",
        element: <Support />,
      },
      {
        path: "/safety-tips",
        element: <SafetyTips />,
      },
      {
        path: "/cookie-policy",
        element: <CookiePolicy />,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      },
      {
        path: "/faq",
        element: <FAQ />,
      },
      {
        path: "/profile",
        element: <AdminProfile />,
      },
      {
        path: "/notification",
        element: <Notifications />,
      },
    ],
  },
  {
    path: "/public/termsAndConditions",
    element: <TermsAndConditions />,
  },
  {
    path: "/public/privacyPolicy",
    element: <PublicPrivacy />,
  },
  {
    path: "/public/payment-success",
    element: <PaymentSuccess />,
  },
  {
    path: "/public/onboard-success",
    element: <ObBoardSuccess />,
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth",
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
