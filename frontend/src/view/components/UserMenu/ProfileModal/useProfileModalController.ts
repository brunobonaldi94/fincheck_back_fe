import { z } from "zod";
import { atLeastOneDefined } from "../../../../app/utils/atLeastOneDefined";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { UpdateUserParams } from "../../../../app/services/usersService/updateUser";
import { userService } from "../../../../app/services/usersService";
import { toast } from "react-hot-toast";
import { useAuth } from "../../../../app/hooks/useAuth";



export function useProfileModalController() {
	const { user: { name, email, signedIn }, updateUser} = useAuth();

	const schema = z.object({
		name: z.string().optional(),
		email: z.string().email('Email is Invalid').optional().or(z.literal(''))
	}).refine((user) => atLeastOneDefined(user), {
		message: "At least one field must be filled",
		path: ['email'],
	})
	.refine((user) => user.email !== email || user.name !== name,{
		message: "At least one field must be different",
		path: ['email'],
	})
type FormData = z.infer<typeof schema>;
	const {
		register,
		handleSubmit: hookFormHandleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: name,
			email: email,
		}
	})

	const { mutateAsync, isLoading } = useMutation({
		mutationFn: async (data: UpdateUserParams) => {
			return await userService.updateUser(data);
		}
	})

	const handleSubmit = hookFormHandleSubmit(async (data) => {
		try {
			const userResponse = await mutateAsync(data);
			updateUser({
				name: userResponse.name,
				email: userResponse.email,
				role: userResponse.role,
				signedIn: signedIn,
			});
			toast.success("User updated")
		}
		catch (error) {
			toast.error("Error on update user")
		}
	})

	return {
		register,
		handleSubmit,
		errors,
		isLoading,
	}
}
