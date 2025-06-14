
import React, { useState } from 'react';
import { LayoutDashboard, Calendar, Users, Store, Settings, Shield, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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

interface SidebarProps {
    isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

    const toggleSubmenu = (title: string) => {
        setOpenSubmenu(openSubmenu === title ? null : title);
    };

    return (
        <div className={`fixed left-0 top-0 h-full bg-white/95 backdrop-blur-xl border-r border-gray-200/50 shadow-xl transition-all duration-300 ${
            isOpen ? 'w-72' : 'w-0 overflow-hidden'
        }`}>
            <div className="p-6 space-y-6">
                {/* Logo Section */}
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-lg">M</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Magrabi
                        </h1>
                        <p className="text-xs text-gray-500">Admin Portal</p>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="space-y-2">
                    {menuItems.map((item) => (
                        <div key={item.title}>
                            {item.children ? (
                                <Collapsible 
                                    open={openSubmenu === item.title} 
                                    onOpenChange={() => toggleSubmenu(item.title)}
                                >
                                    <CollapsibleTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-between p-3 h-auto font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all duration-200"
                                        >
                                            <div className="flex items-center space-x-3">
                                                {item.icon}
                                                <span>{item.title}</span>
                                            </div>
                                            {openSubmenu === item.title ? (
                                                <ChevronDown className="h-4 w-4" />
                                            ) : (
                                                <ChevronRight className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="space-y-1 mt-1 ml-6">
                                        {item.children.map((child) => (
                                            <a
                                                key={child.title}
                                                href={child.href}
                                                className="flex items-center space-x-3 p-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-all duration-200 group"
                                            >
                                                {child.icon}
                                                <span>{child.title}</span>
                                            </a>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            ) : (
                                <a
                                    href={item.href}
                                    className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all duration-200 group font-medium"
                                >
                                    {item.icon}
                                    <span>{item.title}</span>
                                </a>
                            )}
                        </div>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
