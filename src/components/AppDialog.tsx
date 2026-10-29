import { useEffect, type ReactNode } from 'react'
import { X } from 'lucide-react'

type AppDialogProps = {
    title: string
    onClose: () => void
    children: ReactNode
}

export default function AppDialog({ title, onClose, children }: AppDialogProps) {
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') onClose()
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [onClose])

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#18212f]/45 p-4"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose()
            }}
        >
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="dialog-title"
                className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-[#e4e8ee] bg-white p-5 shadow-2xl sm:p-6"
            >
                <div className="mb-5 flex items-start justify-between gap-4">
                    <h2 id="dialog-title" className="text-lg font-bold text-[#18212f]">{title}</h2>
                    <button
                        onClick={onClose}
                        className="rounded-md p-1.5 text-[#697487] hover:bg-[#f1f4f8]"
                        aria-label="Fechar"
                    >
                        <X size={18} />
                    </button>
                </div>
                {children}
            </section>
        </div>
    )
}