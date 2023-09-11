import { useEffect, useState } from "react";

export default function Lista() {

    const [users, setUsers] = useState([
        {
            id: 0,
            name: "",
            email: "",
            created_at: "",
            updated_at: ""
        }
    ])

    useEffect(() => {
        fetch("http://localhost:8000/api/users")
            .then((response) => response.json())
            .then((data) => {
                setUsers(data.data)
            })
    }, [])

    return (
        <div className="flex flex-col gap-10 items-center">
            <h1 className="text-3xl font-semibold text-[#FEF9F9] font-sans pt-28">Lista de Usuários</h1>
            <div className="flex flex-row gap-5 h-20 pt-3">
                <div className="flex flex-col gap-10 text-[#FEF9F9] text-md px-3">
                    <h2 className="text-purple-300 font-bold underline">Nome do Usuário</h2>
                    {users.map((user) => {
                        return (
                            <p>{user.name}</p>
                        )
                    })}
                </div>
                <div className="flex flex-col gap-10 text-[#FEF9F9] text-md h-16 px-3">
                    <h2 className="text-purple-300 font-bold underline">Email do Usuário</h2>
                    {users.map((user) => {
                        return (
                            <p>{user.email}</p>
                        )
                    })}
                </div>
                <div className="flex flex-col gap-10 text-[#FEF9F9] text-md h-16 px-3">
                    <h2 className="text-purple-300 font-bold underline">Data de Criação</h2>
                    {users.map((user) => {
                        return (
                            <p>{new Date(user.created_at).toLocaleDateString('pt-br')}</p>
                        )
                    })}
                </div>
                <div className="flex flex-col gap-10 text-[#FEF9F9] text-md h-16 px-3">
                    <h2 className="text-purple-300 font-bold underline">Data Edição</h2>
                    {users.map((user) => {
                        return (
                            <p>{new Date(user.updated_at).toLocaleDateString('pt-br')}</p>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}