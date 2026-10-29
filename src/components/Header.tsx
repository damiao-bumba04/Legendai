import { useState } from 'react'
import { HelpCircle, LogOut, Menu, Subtitles } from 'lucide-react'

type HeaderProps = {
    onToggleMenu: () => void;
    onHelp: () => void;
    onLogout: () => void;
    userName: string;
}



export default function Header({ onToggleMenu, onHelp, onLogout, userName }: HeaderProps) {
    const [profileOpen, setProfileOpen] = useState(false)
    return (
        <>
            <header className="flex h-16 items-center justify-between border-b border-[#e8ebf0] bg-white px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <button onClick={onToggleMenu}
                        className="rounded-lg p-2 hover:bg-[#f1f4f8] lg:hidden" aria-label="Abrir menu">
                        <Menu size={20} />
                    </button>
                    <div className="flex items-center gap-2.5">
                        <div className="flex size-9 items-center justify-center rounded-xl bg-[#6757e8] text-white shadow-sm">
                            <Subtitles size={20} />
                        </div>
                        <span className="text-[17px] font-bold tracking-[-0.02em]">
                            Legendai <span className="text-[#6757e8]">Studio</span>
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                    <button onClick={onHelp} className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#697487] hover:bg-[#f4f5f8] sm:flex">
                        <HelpCircle size={17} />
                        Ajuda
                    </button>
                    <div className="hidden h-5 w-px bg-[#e8ebf0] sm:block" />
                    <div className="relative">
                        <button
                            onClick={() => setProfileOpen((open) => !open)}
                            className="flex size-9 items-center justify-center rounded-full bg-[#f1eefa] text-sm font-bold uppercase text-[#6757e8]"
                            aria-label="Abrir perfil"
                            aria-expanded={profileOpen}
                        >
                            {userName.slice(0, 2)}
                        </button>
                        {profileOpen && (
                            <div className="absolute right-0 top-11 z-30 w-56 rounded-lg border border-[#e4e8ee] bg-white p-2 shadow-xl">
                                <p className="truncate px-3 py-2 text-xs text-[#778294]">Sessão local: {userName}</p>
                                <button
                                    onClick={() => { setProfileOpen(false); onLogout() }}
                                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium text-[#536073] hover:bg-[#f4f5f8]"
                                >
                                    <LogOut size={16} />
                                    Terminar sessão
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>
        </>
    )
}