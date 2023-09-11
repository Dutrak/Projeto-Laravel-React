<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserStoreRequest extends FormRequest
{
    /**
     * Indicates whether validation should stop after the first rule failure.
     *
     */ protected $stopOnFirstFailure = true;

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        

        return [
            'name' => 'required ',
            'email' => 'required | email | unique:users',
            'password' => 'required ',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     */
    public function messages(): array{
        return[
            'name.required' => 'O campo nome é obrigatório',
            'email.required' => 'O campo email é obrigatório',
            'password.required' => 'O campo senha é obrigatório',
            'email.email' => 'O campo email deve ser um email válido',
            'email.unique' => 'O campo email já está em uso',
        ];
    }
}
