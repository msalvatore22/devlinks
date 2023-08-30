import React, { useEffect, useState } from "react";
import { Link, useAuth } from "../hooks/useAuth";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";


interface MenuItem {
	platform: string;
	baseURL: string;
	iconPath: string;
}

const menuItems: MenuItem[] = [
	{
		platform: "Custom",
		baseURL: "https://",
		iconPath: "",
	},
	{
		platform: "GitHub",
		baseURL: "https://www.github.com/",
		iconPath: "/icon-github.svg",
	},
	{
		platform: "Frontend Mentor",
		baseURL: "https://www.frontendmentor.io/",
		iconPath: "/icon-frontend-mentor.svg",
	},
	{
		platform: "Twitter",
		baseURL: "https://www.twitter.com/",
		iconPath: "/icon-twitter.svg",
	},
	{
		platform: "LinkedIn",
		baseURL: "https://www.linkedin.com/",
		iconPath: "/icon-linkedin.svg",
	},
	{
		platform: "Youtube",
		baseURL: "https://www.youtube.com/",
		iconPath: "/icon-youtube.svg",
	},
	{
		platform: "Facebook",
		baseURL: "https://www.facebook.com/",
		iconPath: "/icon-facebook.svg",
	},
	{
		platform: "Twitch",
		baseURL: "https://www.twitch.tv/",
		iconPath: "/icon-twitch.svg",
	},
	{
		platform: "Dev.to",
		baseURL: "https://www.dev.to/",
		iconPath: "/icon-devto.svg",
	},
	{
		platform: "Codewars",
		baseURL: "https://www.codewars.com/",
		iconPath: "/icon-codewars.svg",
	},
	{
		platform: "Codepen",
		baseURL: "https://www.codepen.io/",
		iconPath: "/icon-codepen.svg",
	},
	{
		platform: "freeCodeCamp",
		baseURL: "https://www.freecodecamp.org/",
		iconPath: "/icon-freecodecamp.svg",
	},
	{
		platform: "GitLab",
		baseURL: "https://www.gitlab.com/",
		iconPath: "/icon-gitlab.svg",
	},
	{
		platform: "Hashnode",
		baseURL: "https://www.hashnode.com/",
		iconPath: "/icon-github.svg",
	},
	{
		platform: "Stack Overflow",
		baseURL: "https://www.stackoverflow.com/",
		iconPath: "/icon-stack-overflow.svg",
	},
];

type Props = {
	link?: Link;
};

type FormValues = {
	devLinks: Link[]
}

const DevLinkDynamicForm: React.FC<Props> = () => {
	const { user, updateLinks } = useAuth();
	const [devlinkInputs, setDevLinkInputs] = useState(user?.links as any[]);

	useEffect(() => {
		setDevLinkInputs(user?.links as any[]);
	}, [user?.links]);

	const { register, control, formState: {errors}, handleSubmit, setValue } =
		useForm<FormValues>({
			defaultValues: {
				devLinks: devlinkInputs
			}
		});
	const { fields, remove } = useFieldArray({
		name: "devLinks",
		control
	});

	function getPlatformURL(e: any): string {
		let result = ""
		for (let item of menuItems) {
			if (item.platform === e.target.value) {
				result = item.baseURL
			}
		}
		return result
	}

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		console.log(data.devLinks)
		setDevLinkInputs(data.devLinks)
		updateLinks(data.devLinks)
		alert("Updated Links!")
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{fields.map((field, idx) => {
				return (
					<div
						key={field.id}
						className="flex flex-col bg-neutral w-full p-6 rounded-xl my-8"
					>
						<div className="flex justify-between">
							<div className="flex items-center space-between">
								<img
									src="/icon-drag-and-drop.svg"
									alt="drag and drop icon"
								></img>
								<h3 className="ml-2 font-bold text-gray">{`Link #${
									idx + 1
								}`}</h3>
							</div>

							<button
								onClick={() => remove(idx)}
								className="btn btn-ghost btn-sm text-gray font-light"
							>
								Remove
							</button>
						</div>
						<div className="form-control w-full">
							<label htmlFor="platform" className="label">
								<span className="label-text text-xs">
									Platform
								</span>
							</label>
							<select
								{...register(`devLinks.${idx}.platform`)}
								className="select select-bordered platform"
								id={field.id}
								name={`devLinks.${idx}.platform`}
								onChange={(e) =>
									setValue(
										`devLinks.${idx}.url`,
										getPlatformURL(e)
									)
								}
							>
								{menuItems.map((item, index) => (
									<option key={index}>{item.platform}</option>
								))}
							</select>
							<label htmlFor="link" className="label">
								<span className="label-text text-xs">Link</span>
							</label>
							<input
								{...register(`devLinks.${idx}.url`)}
								id={field.id}
								name={`devLinks.${idx}.url`}
								className="input input-bordered w-full"
							/>
						</div>
					</div>
				);
			})}
			<div className="divider"></div>
			<div className="flex justify-end w-full">
				<button type="submit" className="btn btn-primary">
					Save
				</button>
			</div>
		</form>
	);
};

export default DevLinkDynamicForm;
