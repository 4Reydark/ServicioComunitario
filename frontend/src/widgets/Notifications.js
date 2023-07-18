import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Success = ({ mensaje }) => {
    useEffect(() => {
            toast.error(mensaje.mensaje, {
                position: "bottom-left",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
    }, [mensaje]);

    return (
        <ToastContainer />
    );
};

export default Success;
