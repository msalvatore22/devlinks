import React, { useEffect, useState } from "react";
import { Link, useAuth } from "../hooks/useAuth";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import HowTo from "./HowTo";
import { MenuItems, MenuItem } from "../constants/MenuItems";
import { ToastContainer } from "react-toastify";
import { showToastErrorMessage, showToastSucessMessage } from "./Toast";

import { useRef } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import type { Identifier, XYCoord } from "dnd-core";
import { HTML5Backend } from "react-dnd-html5-backend";

type Props = {};

type FormValues = {
	devLinks: Link[];
};

interface DragItem {
	idx: number;
	id: string;
	type: string;
}
const ItemTypes = {
	INPUT: "input",
};

const DevLinkDynamicForm: React.FC<Props> = () => {
	const { user, updateLinks } = useAuth();
	const [devlinkInputs, setDevLinkInputs] = useState(user?.links as any[]);
	const disabled = user?.links.length == 5;

	// Set the list of inputs as user links
	useEffect(() => {
		setDevLinkInputs(user?.links as Link[]);
	}, [user?.links]);

	// React hook form set up
	const {
		register,
		control,
		formState: { errors },
		handleSubmit,
		setValue,
		getValues,
	} = useForm<FormValues>({
		defaultValues: {
			devLinks: devlinkInputs,
		},
	});
	const { fields, remove, append, move } = useFieldArray({
		name: "devLinks",
		control,
	});

	// Look up dropdown menu items from platform name
	function menuItemPlatformLookup(platform: string): MenuItem {
		let result = {} as MenuItem;
		for (let item of MenuItems) {
			if (item.platform === platform) {
				result = item;
			}
		}
		return result;
	}
	// make sure the current url the user types starts with the baseURL of the platform selected
	function validateURL(url: string, platform: string): boolean {
		const baseURL = menuItemPlatformLookup(platform)["baseURL"];
		return url.startsWith(baseURL);
	}

	// submit the form
	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		try {
			setDevLinkInputs(data.devLinks);
			updateLinks(data.devLinks);
			showToastSucessMessage("Succesfully updated links!");
		} catch (error: any) {
			showToastErrorMessage(error.message);
		}
	};

	const RenderFields: React.FC = () => {
		return fields.map((field, idx) => {
			// React Drag and Drop Set Up
			const moveInput = (dragIndex: number, hoverIndex: number) => {
				console.log(
					`Moving input dragIndex: ${dragIndex}, hoverIndex: ${hoverIndex}`
				);
				move(dragIndex, hoverIndex);
			};
			const ref = useRef<HTMLDivElement>(null);
			const id = field.id;

			const [{ handlerId }, drop] = useDrop<
				DragItem,
				void,
				{ handlerId: Identifier | null }
			>({
				accept: ItemTypes.INPUT,
				collect(monitor) {
					return {
						handlerId: monitor.getHandlerId(),
					};
				},
				hover(item: DragItem, monitor) {
					if (!ref.current) {
						return;
					}
					const dragIndex = item.idx;
					const hoverIndex = idx;
					// Don't replace items with themselves
					if (dragIndex === hoverIndex) {
						return;
					}

					// Determine rectangle on screen
					const hoverBoundingRect =
						ref.current?.getBoundingClientRect();

					// Get vertical middle
					const hoverMiddleY =
						(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

					// Determine mouse position
					const clientOffset = monitor.getClientOffset();

					// Get pixels to the top
					const hoverClientY =
						(clientOffset as XYCoord).y - hoverBoundingRect.top;

					// Only perform the move when the mouse has crossed half of the items height
					// When dragging downwards, only move when the cursor is below 50%
					// When dragging upwards, only move when the cursor is above 50%

					// Dragging downwards
					if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
						return;
					}

					// Dragging upwards
					if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
						return;
					}

					// Time to actually perform the action
					moveInput(dragIndex, hoverIndex);

					// Note: we're mutating the monitor item here!
					// Generally it's better to avoid mutations,
					// but it's good here for the sake of performance
					// to avoid expensive index searches.
					item.idx = hoverIndex;
				},
			});
			const [{ isDragging }, drag] = useDrag({
				type: ItemTypes.INPUT,
				item: () => {
					return { id, idx };
				},
				collect: (monitor: any) => ({
					isDragging: monitor.isDragging(),
				}),
			});
			const opacity = isDragging ? "opacity-0" : "opacity-100";
			drag(drop(ref));

			return (
				<div
					ref={ref}
					data-handler-id={handlerId}
					key={field.id}
					className={`flex flex-col bg-accent w-full p-6 rounded-xl my-8 ${opacity}`}
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
						<label
							htmlFor={`devLinks.${idx}.platform`}
							className="label"
						>
							<span className="label-text text-xs">Platform</span>
						</label>
						<div className="w-full relative">
							<select
								{...register(`devLinks.${idx}.platform`)}
								className="select select-bordered platform px-11 w-full"
								id={`devLinks.${idx}.platform`}
								name={`devLinks.${idx}.platform`}
								onChange={(e) => {
									let platformLookup = menuItemPlatformLookup(
										e.target.value
									);
									setValue(
										`devLinks.${idx}.url`,
										platformLookup["baseURL"]
									);
									setValue(
										`devLinks.${idx}.iconPath`,
										platformLookup["iconPath"]
									);
								}}
							>
								{MenuItems.map((item, index) => (
									<option key={index}>{item.platform}</option>
								))}
							</select>
							<img
								className="absolute bottom-4 left-4"
								src={field.iconPath}
								alt="platform icon"
							></img>
						</div>

						<div className="relative">
							<label
								htmlFor={`devLinks.${idx}.url`}
								className="label"
							>
								<span className="label-text text-xs">Link</span>
							</label>
							<input
								{...register(`devLinks.${idx}.url`, {
									required: "Can't be empty",
									validate: (v) =>
										validateURL(
											v,
											getValues(
												`devLinks.${idx}.platform`
											)
										) || "Please check the URL",
								})}
								id={`devLinks.${idx}.url`}
								name={`devLinks.${idx}.url`}
								className={
									errors.devLinks?.[idx]?.url?.message
										? "input input-bordered w-full px-11 input-error"
										: "input input-bordered w-full px-11 focus:border-primary"
								}
							/>
							<span className="text-error text-sm absolute right-4 bottom-3">
								{errors.devLinks?.[idx]?.url?.message}
							</span>
							<img
								className="absolute bottom-4 left-4"
								src="./icon-link.svg"
								alt="platform icon"
							></img>
						</div>
					</div>
				</div>
			);
		});
	};

	return (
		<div>
			<DndProvider backend={HTML5Backend}>
				<ToastContainer />
				<form onSubmit={handleSubmit(onSubmit)}>
					<div>
						<h1 className="text-3xl font-bold">
							Customize your links
						</h1>
						<p className="text-gray mt-2">
							Add/edit/remove links below and then share all your
							profiles with the world!
						</p>
						<button
							onClick={(e) => {
								e.preventDefault();
								append({
									url: "https://",
									platform: "Custom",
									iconPath: "/logo-devlinks-small.svg",
									id: Date.now().toString(),
								});
							}}
							className="btn btn-outline btn-primary w-full mt-10"
							disabled={disabled}
						>
							+ Add new link
						</button>
					</div>
					{fields.length === 0 ? <HowTo /> : <RenderFields />}

					<div className="divider"></div>
					<div className="flex justify-end w-full">
						<button
							type="submit"
							className="btn btn-primary btn-block sm:btn-wide"
						>
							Save
						</button>
					</div>
				</form>
			</DndProvider>
		</div>
	);
};

export default DevLinkDynamicForm;
