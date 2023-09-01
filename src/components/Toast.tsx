import { toast } from "react-toastify";

export const showToastErrorMessage = (message: string) => {
	toast.error(message, {
		position: toast.POSITION.BOTTOM_CENTER,
		theme: "colored",
	});
};

export const showToastSucessMessage = (message: string) => {
	toast.success(message, {
		position: toast.POSITION.BOTTOM_CENTER,
		theme: "colored",
	});
};
