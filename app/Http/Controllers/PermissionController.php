<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function index()
    {
        return Permission::all();
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|string|unique:permissions,name']);
        return Permission::create(['name' => $request->name]);
    }

    public function show($id)
    {
        return Permission::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $permission = Permission::findOrFail($id);
        $permission->update($request->only('name'));
        return $permission;
    }

    public function destroy($id)
    {
        Permission::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }
}
