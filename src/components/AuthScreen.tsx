import { useState, type FormEvent } from 'react'
import { Subtitles } from 'lucide-react'

type AuthScreenProps = {
    onAuthenticated: (user: { name: string; email: string }) => void
}

export default function AuthScreen({ onAuthenticated }: AuthScreenProps) {
    const [mode, setMode] = useState<'login' | 'signup'>('login')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmation, setConfirmation] = useState('')
    const [error, setError] = useState('')

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError('')

        if (mode === 'signup' && password !== confirmation) {
            setError('As palavras-passe não coincidem.')
            return
        }

        onAuthenticated({
            name: mode === 'signup' && name.trim() ? name.trim() : email.split('@')[0],
            email: email.trim(),
        })
    }

    function changeMode(nextMode: 'login' | 'signup') {
        setMode(nextMode)
        setError('')
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#f3f5f8] px-4 py-10">
            <section className="w-full max-w-md rounded-xl border border-[#e2e7ee] bg-white p-6 shadow-[0_16px_55px_rgba(27,39,56,0.08)] sm:p-9">
                <div className="mb-8 flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-[#6757e8] text-white">
                        <Subtitles size={21} />
                    </div>
                    <p className="text-lg font-bold">Legendai <span className="text-[#6757e8]">Studio</span></p>
                </div>

                <h1 className="text-2xl font-bold text-[#18212f]">
                    {mode === 'login' ? 'Entrar na sua conta' : 'Criar uma conta'}
                </h1>
                <p className="mt-2 text-sm text-[#778294]">
                    {mode === 'login' ? 'Aceda ao seu espaço de edição.' : 'Comece a organizar os seus projectos de legendagem.'}
                </p>

                <form className="mt-7 flex flex-col gap-4" onSubmit={handleSubmit}>
                    {mode === 'signup' && (
                        <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#465164]">
                            Nome
                            <input
                                required
                                autoComplete="name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                className="rounded-lg border border-[#dfe3e9] px-3 py-2.5 font-normal outline-none focus:border-[#6757e8] focus:ring-2 focus:ring-[#6757e8]/15"
                                placeholder="O seu nome"
                            />
                        </label>
                    )}
                    <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#465164]">
                        Email
                        <input
                            required
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="rounded-lg border border-[#dfe3e9] px-3 py-2.5 font-normal outline-none focus:border-[#6757e8] focus:ring-2 focus:ring-[#6757e8]/15"
                            placeholder="nome@exemplo.com"
                        />
                    </label>
                    <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#465164]">
                        Palavra-passe
                        <input
                            required
                            type="password"
                            minLength={8}
                            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="rounded-lg border border-[#dfe3e9] px-3 py-2.5 font-normal outline-none focus:border-[#6757e8] focus:ring-2 focus:ring-[#6757e8]/15"
                            placeholder="Pelo menos 8 caracteres"
                        />
                    </label>
                    {mode === 'signup' && (
                        <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#465164]">
                            Confirmar palavra-passe
                            <input
                                required
                                type="password"
                                minLength={8}
                                autoComplete="new-password"
                                value={confirmation}
                                onChange={(event) => setConfirmation(event.target.value)}
                                className="rounded-lg border border-[#dfe3e9] px-3 py-2.5 font-normal outline-none focus:border-[#6757e8] focus:ring-2 focus:ring-[#6757e8]/15"
                                placeholder="Repita a palavra-passe"
                            />
                        </label>
                    )}

                    {error && <p role="alert" className="text-sm font-medium text-red-600">{error}</p>}
                    <button className="mt-1 rounded-lg bg-[#6757e8] px-4 py-3 text-sm font-bold text-white hover:bg-[#5747d5]">
                        {mode === 'login' ? 'Entrar' : 'Criar conta'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-[#778294]">
                    {mode === 'login' ? 'Ainda não tem conta?' : 'Já tem uma conta?'}{' '}
                    <button
                        onClick={() => changeMode(mode === 'login' ? 'signup' : 'login')}
                        className="font-bold text-[#6757e8] hover:underline"
                    >
                        {mode === 'login' ? 'Criar conta' : 'Entrar'}
                    </button>
                </p>
                <p className="mt-5 border-t border-[#edf0f4] pt-4 text-center text-xs leading-5 text-[#929baa]">
                    Demonstração local: os dados não são enviados nem guardados num servidor.
                </p>
            </section>
        </main>
    )
}