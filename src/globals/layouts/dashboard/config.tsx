import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import CogIcon from "@heroicons/react/24/solid/CogIcon";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import ConstructionIcon from "@mui/icons-material/Construction";
import StorefrontIcon from "@mui/icons-material/Storefront";
import EmailIcon from "@mui/icons-material/Email";
import { SvgIcon } from "@mui/material";

export const SideNavLinks = () => {
  const itens: any[] = [];

  itens.push(
    {
      title: "Dashboard",
      path: "/admin/enterprise",
      icon: (
        <SvgIcon fontSize="small">
          <ChartBarIcon />
        </SvgIcon>
      ),
    },
    {
      title: "Minha empresa",
      path: "/admin/enterprise/my-enterprise",
      icon: (
        <SvgIcon fontSize="small">
          <StorefrontIcon />
        </SvgIcon>
      ),
    },
    {
      title: "Serviços",
      path: "/admin/enterprise/services",
      icon: (
        <SvgIcon fontSize="small">
          <ConstructionIcon />
        </SvgIcon>
      ),
    },
    {
      title: "Mensagens",
      path: "/admin/enterprise/messages",
      icon: (
        <SvgIcon fontSize="small">
          <EmailIcon />
        </SvgIcon>
      ),
    },
    {
      title: "Assinaturas",
      path: "/admin/enterprise/signs",
      icon: (
        <SvgIcon fontSize="small">
          <WorkspacePremiumIcon />
        </SvgIcon>
      ),
    },
    {
      title: "Agenda",
      path: "/admin/enterprise/diary",
      icon: (
        <SvgIcon fontSize="small">
          <CalendarTodayIcon />
        </SvgIcon>
      ),
    },

    {
      title: "Configurações",
      path: "/admin/enterprise/settings",
      icon: (
        <SvgIcon fontSize="small">
          <CogIcon />
        </SvgIcon>
      ),
    }
  );

  return itens;
};
