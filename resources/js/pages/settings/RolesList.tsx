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

const RolesList = () => {
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Roles Management</h1>
                <Button data-test-id="add-role-button">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Role
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Role Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Users</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>Admin</TableCell>
                        <TableCell>Full system access</TableCell>
                        <TableCell>5</TableCell>
                        <TableCell>
                            <div className="flex space-x-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    data-test-id="edit-role-button"
                                >
                                    <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    data-test-id="delete-role-button"
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

export default RolesList;
