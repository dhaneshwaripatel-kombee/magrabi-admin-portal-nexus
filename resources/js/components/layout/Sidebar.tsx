import { Users, Store, Settings, Shield } from "lucide-react";

const menuItems = [
    {
        title: "Dashboard",
        icon: <LayoutDashboard className="h-5 w-5" />,
        href: "/admin/dashboard",
    },
    {
        title: "Appointments",
        icon: <Calendar className="h-5 w-5" />,
        href: "/admin/appointments",
    },
    {
        title: "User Management",
        icon: <Users className="h-5 w-5" />,
        href: "/admin/users",
    },
    {
        title: "Store Management",
        icon: <Store className="h-5 w-5" />,
        href: "/admin/stores",
    },
    {
        title: "Settings",
        icon: <Settings className="h-5 w-5" />,
        children: [
            {
                title: "Roles",
                icon: <Shield className="h-4 w-4" />,
                href: "/admin/settings/roles",
            },
            {
                title: "Permissions",
                icon: <Shield className="h-4 w-4" />,
                href: "/admin/settings/permissions",
            },
        ],
    },
];
