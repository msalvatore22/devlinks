import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { Link, useAuth } from "../hooks/useAuth";

interface MenuItem {
	platform: string;
	baseURL: string;
	iconPath: string;
}

const menuItems: MenuItem[] = [
	{
		platform: "Select a platform",
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

const DevLinkDynamicForm: React.FC<Props> = () => {
	const { user, updateLinks, deleteLink } = useAuth();
	const [devlinkInputs, setDevLinkInputs] = useState(user?.links as any[]);

	useEffect(() => {
		setDevLinkInputs(user?.links as any[]);
	}, [user?.links]);

	const handleDevLinkChange = (e: any) => {
		const updatedLinks = [...devlinkInputs];
		updatedLinks[e.target.dataset.idx][e.target.dataset.name] =
			e.target.value;

		setDevLinkInputs(updatedLinks);
	};

	const handleDevPlatformChange = (e: any) => {
		const updatedLinks = [...devlinkInputs];
		let url = "";
		for (let item of menuItems) {
			if (item.platform === e.target.value) {
				url = item.baseURL;
			}
		}
		updatedLinks[e.target.dataset.idx][e.target.dataset.name] =
			e.target.value;
		updatedLinks[e.target.dataset.idx]["url"] = url;
		setDevLinkInputs(updatedLinks);
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		setDevLinkInputs(devlinkInputs);
		updateLinks(devlinkInputs);
		alert("Updated links");
	};

	const handleRemoveLink = (e: any, link: Link) => {
		e.preventDefault();
		deleteLink(link);
	};

	return (
		<form onSubmit={handleSubmit}>
			{devlinkInputs?.map((val, idx) => {
				const platformId = `platform-${idx}`;
				const urlId = `url-${idx}`;
				return (
					<div
						key={idx}
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
								onClick={(e) => handleRemoveLink(e, val)}
								className="btn btn-ghost btn-sm text-gray font-light"
							>
								Remove
							</button>
						</div>
						<div className="form-control w-full">
							<label htmlFor="platform" className="label">
								<span className="label-text text-xs">Platform</span>
							</label>
							<select
								className="select select-bordered platform"
								id={platformId}
								data-idx={idx}
								data-name="platform"
								onChange={handleDevPlatformChange}
								value={val.platform}
							>
								{menuItems.map((item, index) => (
									<option key={index}>{item.platform}</option>
								))}
							</select>
							<label htmlFor="link" className="label">
								<span className="label-text text-xs">Link</span>
							</label>
							<input
								id={urlId}
								name={urlId}
								className="input input-bordered w-full"
								value={val.url}
								data-idx={idx}
								data-name="url"
								onChange={handleDevLinkChange}
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
