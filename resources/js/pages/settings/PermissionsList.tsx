import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash } from "lucide-react";

const PermissionsList = () => {
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Permissions Management</h1>
                <Button data-test-id="add-permission-button">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Permission
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Permission Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Roles</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>manage_users</TableCell>
                        <TableCell>Can manage users</TableCell>
                        <TableCell>Admin, Store Manager</TableCell>
                        <TableCell>
                            <div className="flex space-x-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    data-test-id="edit-permission-button"
                                >
                                    <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    data-test-id="delete-permission-button"
                                >
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default PermissionsList;
