import ilustration from '../../assets/illustration.png';
import { Logo } from '../components/Logo';
export function AuthLayout() {
	return (
		<div className="flex w-full h-full">
			<div className="w-1/2 h-full"></div>
			<div className="w-1/2 h-full relative flex justify-center items-center p-8">
				<img 
					src={ilustration} 
					alt="Ilustration" 
					className='object-cover w-full h-full max-w-[656px] max-h-[960px] select-none rounded-[32px]'/>
				<div className='max-w-[656px] bottom-8 bg-white p-10 absolute rounded-b-[32px] text-red-500'>
					<Logo/>
					<p className='text-gray-700 font-medium text-xl mt-6'>
						Gerencie suas finanças pessoais de uma forma simples com o fincheck, e o melhor, totalmente de graça!
					</p>
				</div>
			</div>
		</div>
		
	);
}
