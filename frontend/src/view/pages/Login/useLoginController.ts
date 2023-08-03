import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { authService } from '../../../app/services/authService';
import { useMutation } from '@tanstack/react-query';
import { SigninParams } from '../../../app/services/authService/signin';
import toast from 'react-hot-toast';
const schema = z.object({
	email: z.string().nonempty("E-mail is required").email("Invalid e-mail"),
	password: z.string().nonempty("Password is required").min(8, "Password must be at least 8 characters"),
});

type FormData = z.infer<typeof schema>;

export function useLoginController(){
	const {
		register,
		handleSubmit: hookFormHandleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const { mutateAsync, isLoading } = useMutation({
		mutationFn: async (data: SigninParams) => {
			return await authService.signin(data);
		},

	})

	const handleSubmit = hookFormHandleSubmit(async (data) => {
		try {
			const { accessToken } = await mutateAsync(data);
			console.log(accessToken);
		} catch (error) {
			toast.error("Error on login")
		}
	});
	return {
		register,
		handleSubmit,
		errors,
		isLoading
	}
}