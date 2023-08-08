import { useAuth } from "../hooks/useAuth";

const AddLink = () => {
	const { addLink, user } = useAuth();
	const disabled = user?.links.length == 5

	const handleAddLink = async () => {
		try {
			const newLink = {
				url: "https://",
				platform: "custom",
				iconPath: "/logo-devlinks-small.svg",
				id: Date.now().toString(),
			};
			await addLink(newLink);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<h1 className="text-3xl font-bold">Customize your links</h1>
			<p className="text-gray mt-2">
				Add/edit/remove links below and then share all your profiles
				with the world!
			</p>
			<button
				onClick={handleAddLink}
				className="btn btn-outline btn-primary w-full mt-10"
				disabled={disabled}
			>
				+ Add new link
			</button>
		</div>
	);
};

export default AddLink;
