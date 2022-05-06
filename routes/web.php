<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SmartController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [SmartController::class, 'index'])->name('home');
Route::post('/getdata', [SmartController::class, 'sendData'])->name('getdata');
Route::post('/upload', [SmartController::class, 'save'])->name('upload');
Route::post('/delete', [SmartController::class, 'delete'])->name('delete');

