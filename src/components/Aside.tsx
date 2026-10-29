import { Plus, Settings, FolderOpen, LayoutDashboard, Sparkles } from "lucide-react"


type AsideMobileNavProps = {
    mobileNav: boolean;
    activePage: 'projects' | 'templates';
    onNavigate: (page: 'projects' | 'templates') => void;
    onNewProject: () => void;
    onSettings: () => void;
    onUpgrade: () => void;
}

export default function Aside({ mobileNav, activePage, onNavigate, onNewProject, onSettings, onUpgrade }: AsideMobileNavProps) {
    return (
        <>
            <aside className={`${mobileNav ? 'flex' : 'hidden'} fixed inset-y-16 left-0 z-10 w-64 flex-col border-r border-[#e8ebf0] bg-white p-4 shadow-xl lg:static lg:flex lg:min-h-[calc(100vh-4rem)] lg:shadow-none`}>
                <button onClick={onNewProject} className="mb-6 flex items-center justify-center gap-2 rounded-xl bg-[#6757e8] px-4 py-3 text-sm font-semibold text-white shadow-[0_5px_14px_rgba(103,87,232,0.22)] hover:bg-[#5747d5]">
                    <Plus size={18} />
                    Novo Projecto
                </button>
                <nav className="flex flex-col gap-1" aria-label="Navegação Principal">
                    <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.13em] text-[#a2aab8]">
                        Menu Principal
                    </p>
                    <button onClick={() => onNavigate('projects')} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${activePage === 'projects' ? 'bg-[#f0edff] text-[#6757e8]' : 'text-[#6d7788] hover:bg-[#f6f7f9]'}`}>
                        <FolderOpen size={18} /> Projectos
                    </button>
                    <button onClick={() => onNavigate('templates')} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${activePage === 'templates' ? 'bg-[#f0edff] text-[#6757e8]' : 'text-[#6d7788] hover:bg-[#f6f7f9]'}`}>
                        <LayoutDashboard size={18} /> Modelos
                    </button>
                </nav>

                <div className="mt-auto flex flex-col gap-1 border-t border-[#edf0f4] pt-4">
                    <button onClick={onSettings} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#6d7788] hover:bg-[#f6f7f9]">
                        <Settings size={18} />
                        Configurações
                    </button>

                    <div className="mt-3 rounded-xl bg-[#f7f5ff] p-3.5">
                        <p className="text-xs font-semibold text-[#4d43a7]">
                            Plano Gratuito
                        </p>
                        <p className="mt-1 text-[11px] leading-4 text-[#8078bd]">
                            3 de 5 projectos usados este mês
                        </p>

                        <div className="mt-3 h-1.5 rounded-full bg-[#dfdcfa]">
                            <div className="h-full w-3/5 rounded-full bg-[#6757e8]" />
                        </div>

                        <button onClick={onUpgrade} className="mt-3 flex items-center gap-1 text-[11px] font-bold text-[#6757e8]">
                            <Sparkles size={13} /> Fazer Upgrade
                        </button>
                    </div>
                </div>
            </aside>
        </>
    )
}