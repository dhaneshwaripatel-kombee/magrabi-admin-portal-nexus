<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_auth_histories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('store_id')->default(0)->comment('Store table id or Super Administrator id(0)');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->ipAddress('ip_address');
            $table->string('type');
            $table->timestamps();
            $table->softDeletes();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->unsignedBigInteger('deleted_by')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_auth_histories');
    }
};
