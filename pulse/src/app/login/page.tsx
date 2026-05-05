import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
      <div className="bg-white rounded-xl p-8 shadow text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Pulse 🚀</h1>
        <p className="text-gray-500 text-sm mb-6">התחבר כדי להמשיך</p>
        <LoginForm />
      </div>
    </main>
  );
}