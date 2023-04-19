import LayoutWrapper from "@/components/reusable/Layout/LayoutWrapper";
import { Box } from "@mui/material";
import { NextPage } from "next";

interface IContactPage {}
const ContactPage: NextPage<IContactPage> = () => {
  return <LayoutWrapper seo={{}}>Contact page</LayoutWrapper>;
};

export default ContactPage;
