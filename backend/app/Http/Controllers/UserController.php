<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Models\User;



class UserController extends Controller
{

    public function index()
    {
        return response()->json([
            'msg' => 'API - 1.0.0'
        ]);
    }

    public function createUsers(UserStoreRequest $request){
        
        $user = new User;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password= $request->password;
        $user->save();

        return response()->json([
            'msg' => 'Usuário criado com sucesso!',
            'status' => true,
            'data' => $user
        ], 201);

        
    }
    public function listUsers()
    {
        $users = new User;
        $users = $users->all();
        return response()->json([
            'msg' => 'Usuários listados com sucesso!',
            'status' => true,
            'data' => $users
        ], 200);
    }
}
