import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useLoginController } from "./useLoginController";
import { ButtonGoogle } from "../../components/ButtonGoogle";

export function Login() {
	const {
			handleSubmit,
			register,
			errors,
			isLoading,
			signinWithGoogle,
	} = useLoginController();
	return (
		<>
			<header className="flex flex-col items-center gap-4 text-center">
				<h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">Entre em sua conta</h1>
				<p className="space-x-2">
					<span className="text-gray-700 tracking-[-0.5px]">Novo por aqui?</span>
					<Link to="/register"
						className="font-medium text-teal-900 tracking-[-0.5px]">
						Crie uma conta
					</Link>
				</p>
			</header>
			<form onSubmit={handleSubmit}
				className="mt-[60px] flex flex-col gap-4">
				<Input
					type="email"
					placeholder="E-mail"
					error={errors.email?.message}
					{...register('email')}
					/>
				<Input
					type="password"
					placeholder="Password"
					autoComplete="on"
					error={errors.password?.message}
					{...register('password')}
					/>
				<Button isLoading={isLoading} type="submit" >Entrar</Button>
				<ButtonGoogle
					onClick={signinWithGoogle}
					isLoading={isLoading}
					type="button"
					className="bg-[#4285F4] hover:bg-[#6da4ff] ">
						Entrar com Google
					</ButtonGoogle>
			</form>
		</>
	)
}
