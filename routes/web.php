<?php

use Illuminate\Support\Facades\Route;

// Route::get('/{any}', function () {
//     return view('app');
// });

Route::get('/', function () {
    return response()->json(['status' => 'ok']);
});
