import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
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

	const handleSubmit = hookFormHandleSubmit((data) => {
		console.log(data);
	});
	return {
		register,
		handleSubmit,
		errors,
	}
}
