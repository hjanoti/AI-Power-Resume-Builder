import { Mail, User2Icon, Lock, Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import toast from "react-hot-toast"
import api from "../configs/api";
import { login } from "../app/features/authSlice"
import Spinner from "../components/Spinner"
import getErrorMessage from "../utils/getErrorMessage"

const MIN_PASSWORD_LENGTH = 8;

const Login = () => {

    const query = new URLSearchParams(window.location.search);
    const urlState = query.get('state');
    const [state, setState] = useState(urlState === "register" ? "register" : "login")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const dispatch = useDispatch()

    const isRegister = state === "register";

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isSubmitting) return;

        // Catch a too-short password here rather than after a round trip.
        if (isRegister && formData.password.length < MIN_PASSWORD_LENGTH) {
            toast.error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
            return;
        }

        setIsSubmitting(true)
        try {
            const { data } = await api.post(`/api/users/${state}`, formData)
            localStorage.setItem('token', data.token);
            dispatch(login(data));
            toast.success(data.message)
        } catch (error) {
            toast.error(getErrorMessage(error, "Could not sign you in"))
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const switchMode = () => {
        setState(prev => prev === "login" ? "register" : "login");
        setFormData({ name: '', email: '', password: '' });
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl mx-8 px-8 bg-white">
                <h1 className="text-gray-900 text-3xl mt-10 font-medium">{isRegister ? "Sign up" : "Login"}</h1>
                <p className="text-gray-500 text-sm mt-2">
                    {isRegister ? "Create an account to get started" : "Please sign in to continue"}
                </p>

                {isRegister && (
                    <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 focus-within:border-green-500 transition-colors">
                        <User2Icon size={16} color="#6B7280"/>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            autoComplete="name"
                            className="w-full border-none outline-none ring-0 bg-transparent"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            required
                        />
                    </div>
                )}

                <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 focus-within:border-green-500 transition-colors">
                    <Mail size={16} color="#6B7280"/>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email id"
                        autoComplete="email"
                        className="w-full border-none outline-none ring-0 bg-transparent"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        required
                    />
                </div>

                <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 pr-4 gap-2 focus-within:border-green-500 transition-colors">
                    <Lock size={16} color="#6B7280"/>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        autoComplete={isRegister ? "new-password" : "current-password"}
                        minLength={isRegister ? MIN_PASSWORD_LENGTH : undefined}
                        className="w-full border-none outline-none ring-0 bg-transparent"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(prev => !prev)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="shrink-0 text-gray-400 transition-colors hover:text-gray-600"
                    >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                </div>

                {isRegister && (
                    <p className="mt-2 text-left text-xs text-gray-400 pl-6">
                        At least {MIN_PASSWORD_LENGTH} characters
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-6 flex w-full h-11 items-center justify-center gap-2 rounded-full text-white bg-green-500 hover:opacity-90 transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isSubmitting && <Spinner />}
                    {isSubmitting
                        ? (isRegister ? "Creating account..." : "Signing in...")
                        : (isRegister ? "Sign up" : "Login")}
                </button>

                <p className="text-gray-500 text-sm mt-4 mb-11">
                    {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
                    <button
                        type="button"
                        onClick={switchMode}
                        disabled={isSubmitting}
                        className="text-green-500 hover:underline disabled:opacity-50"
                    >
                        {isRegister ? "Login" : "Sign up"}
                    </button>
                </p>
            </form>
        </div>
    )
}

export default Login;
