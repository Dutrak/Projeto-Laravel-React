import { Transition } from "@headlessui/react";
import "../App.css"
import { useEffect, useState } from "react";

export function SignUp() {

    const [user, setUser] = useState("")
    const [pass1, setPass1] = useState("")
    const [pass2, setPass2] = useState("")
    const [error, setError] = useState("")
    const [msg, setMsg] = useState("")
    const [email, setEmail] = useState("")

    // Function to clear error message after 5 seconds
    useEffect(() => {
        setTimeout(() => {
            setMsg("")
        }, 1500);
    }, [msg])

    // Função para lidar com a mudança dos inputs em tempo real
    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>, type: string) {
        switch (type) {
            case "user":
                setError("")
                setUser(e.target.value)
                if (e.target.value === "") {
                    setError("O usuário não pode ser vazio")
                }
                break;
            case "pass1":
                setError("")
                setPass1(e.target.value)
                if (e.target.value === "") {
                    setError("A senha não pode ser vazia")
                }
                break;
            case "pass2":
                setError("")
                setPass2(e.target.value)
                if (e.target.value === "") {
                    setError("A confirmação de senha não pode ser vazia")
                } else if (e.target.value !== pass1) {
                    setError("As senhas não coincidem")
                }
                break;
            case "email":
                setError("")
                setEmail(e.target.value)
                if (e.target.value === "") {
                    setError("O email não pode ser vazio")
                }
                break;
            default:
        }
    }

    // Função para lidar com o submit do formulário
    async function handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault()

        // Declaração de variáveis que serão utilizadas na requisição
        const data = {
            name: user,
            email: email,
            password: pass1
        }
        const headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
        const body = JSON.stringify(data)

        // Condição para verificar se os campos foram preenchidos corretamente
        if (user != "" && pass1 != "" && pass2 != "" && pass1 === pass2 && email != "") {

            // Requisição para a API feita no laravel
            fetch("http://127.0.0.1:8000/api/register", {
                method: "POST",
                headers: headers,
                body: body,
            }).then(res => res.json())
                .then(res => {
                    if (res.status === true) {
                        setMsg("Cadastro realizado com sucesso")
                        setTimeout(() => {
                            window.location.reload()
                        }, 1500)
                    } else {
                        setError(res.message)
                    }
                })

            // Limpa os campos do formulário
            setUser("")
            setPass1("")
            setPass2("")
            setEmail("")

            // Erro caso os campos não estejam preenchidos corretamente
        } else {
            setError("Preencha todos os campos corretamente")
        }
    }




    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <form className="flex flex-col items-center justify-center form pt-6 gap-8 px-8">
                <Transition
                    className="flex flex-col items-center justify-center"
                    appear={true}
                    show={true}
                    enter="transition-opacity ease-in-out duration-1000"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-out duration-1000"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <h1 className="text-white font-bold text-3xl pb-6">Cadastro</h1>

                    <p className="">
                        {msg !== "" ? <span className="text-green-500 font-bold">{msg}</span> : <span className="text-red-500 font-bold">{error}</span>}
                    </p>

                    <input
                        className="rounded-sm p-3 m-3 border-solid border-b-2 outline-none focus:border-sky-400
                        bg-transparent text-white font-bold text-base border-zinc-100"
                        type="text"
                        placeholder="Nome de Usuário"
                        value={user}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, "user")}
                    />
                    <input
                        className="rounded-sm p-3 m-3 border-solid border-b-2 outline-none focus:border-sky-400
                        bg-transparent text-white font-bold text-base border-zinc-100"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, "email")}
                    />
                    <input
                        className="rounded-sm p-3 m-3 border-solid border-b-2 outline-none focus:border-sky-400
                       bg-transparent text-white font-bold text-base border-zinc-100"
                        type="password"
                        placeholder="Senha"
                        value={pass1}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, "pass1")}
                    />
                    <input
                        className="rounded-sm p-3 m-3 border-solid border-b-2 outline-none focus:border-sky-400
                        bg-transparent text-white font-bold text-base border-zinc-100"
                        type="password"
                        placeholder="Confirmar Senha"
                        value={pass2}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, "pass2")}
                    />
                    <button
                        className="rounded-lg m-3 border-solid border-px outline-none focus:ring-2 hover:bg-opacity-50
                        bg-white text-[#3d3935] font-bold text-base w-40 h-10"
                        type="submit"
                        onClick={handleSubmit}>Cadastrar</button>
                </Transition>
            </form>
        </main>
    )
}