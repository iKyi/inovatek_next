import {
  Instagram,
  Facebook,
  LinkedIn,
  Twitter,
  WhatsApp,
  Phone,
  Email,
} from "@mui/icons-material";

export type IconSocialType =
  | "facebook"
  | "instagram"
  | "facebook"
  | "twitter"
  | "discord"
  | "whatsapp"
  | "phone"
  | "email";

const CommonIcon = (props: any) => {
  // *************** RENDER *************** //
  if (props.icon === "facebook") return <Facebook {...props} />;
  if (props.icon === "linkedin") return <LinkedIn {...props} />;
  if (props.icon === "instagram") return <Instagram {...props} />;
  if (props.icon === "twitter") return <Twitter {...props} />;
  if (props.icon === "whatsapp") return <WhatsApp {...props} />;
  if (props.icon === "phone") return <Phone {...props} />;
  if (props.icon === "email") return <Email {...props} />;
  return <Facebook />;
};

export default CommonIcon;
