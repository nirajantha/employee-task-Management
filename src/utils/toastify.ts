
import { ToastOptions, toast } from "react-toastify";
const showSuccess = (msg:string,options?:ToastOptions) => {
    toast.success(msg,{});
}


const showInfo = (msg:string) => {
    toast.info(msg);
}

const showWarning = (msg:string) => {
    toast.warning(msg);
}

const showError = (msg:string) => {
    toast.error(msg)
}

export const notify = {
    showSuccess,
    showInfo,
    showWarning,
    showError
}