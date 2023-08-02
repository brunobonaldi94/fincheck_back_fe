import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export function Register() {
	return (
		<>
			<header className="flex flex-col items-center gap-4 text-center">
				<h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">Entre em sua conta</h1>
				<p className="space-x-2">
					<span className="text-gray-700 tracking-[-0.5px]">Novo por aqui?</span>
					<Link to="/login" 
						className="font-medium text-teal-900 tracking-[-0.5px]">
						Fazer login
					</Link>
				</p>
			</header>
			<form className="mt-[60px] flex flex-col gap-4">
				<Input 
					type="text" 
					placeholder="Nome" 
					name="name"
					/>
				<Input 
					type="email" 
					placeholder="E-mail" 
					name="email"
					/>
				<Input 
					type="password" 
					placeholder="Senha" 
					name="password"
					autoComplete="on"
					/>
				<Button type="submit" >Criar Conta</Button>
			</form>
		</>
	)
}
