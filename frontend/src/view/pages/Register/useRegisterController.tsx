import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { authService } from '../../../app/services/authService';
const schema = z.object({
	name: z.string().nonempty("Name is required"),
	email: z.string().nonempty("E-mail is required").email("Invalid e-mail"),
	password: z.string().nonempty("Password is required").min(8, "Password must be at least 8 characters"),
});

import { useMutation } from '@tanstack/react-query';
import { SignupParams } from '../../../app/services/authService/signup';
import { toast } from 'react-hot-toast';

type FormData = z.infer<typeof schema>;

export function useRegisterController(){
	const {
		register,
		handleSubmit: hookFormHandleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const {  isLoading, mutateAsync } = useMutation({
		mutationFn: async (data: SignupParams) => {
			return authService.signup(data)
		},

	});

	const handleSubmit = hookFormHandleSubmit(async (data) => {
		try {
			const { accessToken } = await mutateAsync(data);
			console.log(accessToken);
		} catch (error) {
			toast.error("Error on register")
		}
	});
	return {
		register,
		handleSubmit,
		errors,
		isLoading,
	}
}
