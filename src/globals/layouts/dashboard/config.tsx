import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import CogIcon from "@heroicons/react/24/solid/CogIcon";
import ShoppingBagIcon from "@heroicons/react/24/solid/ShoppingBagIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import ContactsIcon from "@mui/icons-material/Contacts";
import HealingIcon from "@mui/icons-material/Healing";
import PunchClockIcon from "@mui/icons-material/PunchClock";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PaidIcon from "@mui/icons-material/Paid";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { SvgIcon } from "@mui/material";

export const SideNavLinks = () => {
  const itens: any[] = [];

  itens.push(
    {
      title: "Inicio",
      path: "/admin",
      icon: (
        <SvgIcon fontSize="small">
          <ChartBarIcon />
        </SvgIcon>
      ),
    },
    {
      title: "Clientes",
      path: "/admin/clients",
      icon: (
        <SvgIcon fontSize="small">
          <UsersIcon />
        </SvgIcon>
      ),
    },
    {
      title: "Produtos",
      path: "/admin/products",
      icon: (
        <SvgIcon fontSize="small">
          <HealingIcon />
        </SvgIcon>
      ),
    },
    {
      title: "Vendas",
      path: "/admin/payments",
      icon: (
        <SvgIcon fontSize="small">
          <PaidIcon />
        </SvgIcon>
      ),
    },
    {
      title: "Envios",
      path: "/admin/shippings",
      icon: (
        <SvgIcon fontSize="small">
          <LocalShippingIcon />
        </SvgIcon>
      ),
    },
    {
      title: "Caixa",
      path: "/admin/cashier",
      icon: (
        <SvgIcon fontSize="small">
          <PointOfSaleIcon />
        </SvgIcon>
      ),
    },
    {
      title: "Whatsapp Bot",
      path: "/admin/whatsapp",
      icon: (
        <SvgIcon fontSize="small">
          <WhatsAppIcon />
        </SvgIcon>
      ),
    },
    {
      title: "Conta",
      path: "/admin/account",
      icon: (
        <SvgIcon fontSize="small">
          <UserIcon />
        </SvgIcon>
      ),
    },
    {
      title: "Opções",
      path: "/admin/settings",
      icon: (
        <SvgIcon fontSize="small">
          <CogIcon />
        </SvgIcon>
      ),
    }
  );

  return itens;
};
