import { ArrowDownToLine, MoreHorizontal } from 'lucide-react'

type ProjectHeadingProps = {
    projectName: string
    onOptions: () => void
    onExport: () => void
}

export default function ProjectHeading({ projectName, onOptions, onExport }: ProjectHeadingProps) {
    return (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
                <div className="mb-2 flex items-center gap-2 text-xs text-[#8993a3]">
                    <span>Projectos</span>
                    <span>/</span>
                    <span className="text-[#536073]">{projectName}</span>
                </div>
                <h1 className="text-2xl font-bold tracking-[-0.03em] sm:text-[28px]">
                    {projectName}
                </h1>
            </div>

            <div className="flex items-center gap-2">
                <span className="hidden items-center gap-1.5 text-xs text-[#778294] sm:flex">
                    <span className="size-2 rounded-full bg-[#42bd83]" />
                    Sessão local
                </span>
                <button onClick={onOptions} className="flex items-center gap-2 rounded-lg border border-[#dfe3e9] bg-white px-3 py-2 text-sm font-semibold text-[#536073] shadow-sm hover:bg-[#f8f9fb]">
                    <MoreHorizontal size={17} />
                    <span className="hidden sm:inline">Opções</span>
                </button>
                <button onClick={onExport} className="flex items-center gap-2 rounded-lg bg-[#6757e8] px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#5747d5]">
                    <ArrowDownToLine size={16} />
                    Exportar
                </button>
            </div>
        </div>
    )
}