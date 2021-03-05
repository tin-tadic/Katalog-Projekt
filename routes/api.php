<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/projekti/fsre_rwa/2020/g11/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->get('/projekti/fsre_rwa/2020/g11/authenticated', function () {
    return true;
});

//login, register, and logout routes
Route::post('/projekti/fsre_rwa/2020/g11/register', 'App\Http\Controllers\RegisterController@register');
Route::post('/projekti/fsre_rwa/2020/g11/login', 'App\Http\Controllers\LoginController@login');
Route::post('/projekti/fsre_rwa/2020/g11/logout', 'App\Http\Controllers\LoginController@logout');

//Ticket routes
Route::post('/projekti/fsre_rwa/2020/g11/contact', 'App\Http\Controllers\ContactController@contact');
Route::get('/projekti/fsre_rwa/2020/g11/tickets', 'App\Http\Controllers\ContactController@getAllTickets');
Route::post('/projekti/fsre_rwa/2020/g11/tickets/{id}/process', 'App\Http\Controllers\ContactController@setTicketSolved');
Route::post('/projekti/fsre_rwa/2020/g11/tickets/{id}/trash', 'App\Http\Controllers\ContactController@setTicketTrashed');
Route::get('/projekti/fsre_rwa/2020/g11/ticket/{id}', 'App\Http\Controllers\ContactController@getTicketInfo');

//Profile routes
Route::get('/projekti/fsre_rwa/2020/g11/profile/{id}', 'App\Http\Controllers\ProfileController@display');
Route::post('/projekti/fsre_rwa/2020/g11/profile/{id}', 'App\Http\Controllers\ProfileController@saveEdit');
Route::post('/projekti/fsre_rwa/2020/g11/uploadAvatar/{id}', 'App\Http\Controllers\ProfileController@uploadAvatar');
Route::get('/projekti/fsre_rwa/2020/g11/subscribedArticles/{id}', 'App\Http\Controllers\ProfileController@getSubscribedArticles');
    //Admin routes
Route::post('/projekti/fsre_rwa/2020/g11/banUser/{id}', 'App\Http\Controllers\ProfileController@banUser');
Route::post('/projekti/fsre_rwa/2020/g11/unbanUser/{id}', 'App\Http\Controllers\ProfileController@unbanUser');
Route::post('/projekti/fsre_rwa/2020/g11/adminUser/{id}', 'App\Http\Controllers\ProfileController@adminUser');
Route::post('/projekti/fsre_rwa/2020/g11/unadminUser/{id}', 'App\Http\Controllers\ProfileController@unadminUser');

//Main page (article) routes
Route::get('/projekti/fsre_rwa/2020/g11/getArticles', 'App\Http\Controllers\ArticleController@getArticles');
Route::post('/projekti/fsre_rwa/2020/g11/addArticle', 'App\Http\Controllers\ArticleController@addArticle');
Route::get('/projekti/fsre_rwa/2020/g11/viewArticle/{id}', 'App\Http\Controllers\ArticleController@viewArticle');
Route::post('/projekti/fsre_rwa/2020/g11/editArticle/{id}', 'App\Http\Controllers\ArticleController@editArticle');
Route::get('/projekti/fsre_rwa/2020/g11/isSubscribed/{id}', 'App\Http\Controllers\ArticleController@isSubscribed');
Route::post('/projekti/fsre_rwa/2020/g11/subscribe/{id}', 'App\Http\Controllers\ArticleController@subscribe');
Route::post('/projekti/fsre_rwa/2020/g11/unsubscribe/{id}', 'App\Http\Controllers\ArticleController@unsubscribe');
Route::post('/projekti/fsre_rwa/2020/g11/deleteArticle/{id}', 'App\Http\Controllers\ArticleController@deleteArticle');