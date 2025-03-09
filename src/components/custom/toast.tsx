import { ToastContainer } from 'react-toastify'
import { Bounce } from 'react-toastify'


export const ToastSetup = () => {
    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
        />
    )
}