import ApplicationLogo from '@/Components/ApplicationLogo';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-green-100">
            {/* Remove margin around logo */}
            <div className="mb-2">
                <ApplicationLogo className="w-40 h-auto max-w-full" />
            </div>

            {/* Remove large mt spacing from the form container */}
            <div className="w-full sm:max-w-md px-6 py-4 bg-white shadow-md overflow-hidden rounded-lg">
                {children}
            </div>
        </div>
    );
}
