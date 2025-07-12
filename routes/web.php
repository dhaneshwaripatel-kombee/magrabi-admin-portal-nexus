<?php

use Illuminate\Support\Facades\Route;

// Route::get('/{any}', function () {
//     return view('app');
// });

Route::get('/home', function () {
    return view('welcome'); // or your desired landing view
});
