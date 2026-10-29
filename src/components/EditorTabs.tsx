import { Palette } from 'lucide-react'

export type EditorTab = 'editor' | 'style'

type EditorTabsProps = {
    activeTab: EditorTab
    onTabChange: (tab: EditorTab) => void
}

export default function EditorTabs({ activeTab, onTabChange }: EditorTabsProps) {
    return (
        <div className="mb-5 flex items-center gap-1 border-b border-[#e3e7ed]">
            <button
                onClick={() => onTabChange('editor')}
                className={`border-b-2 px-3 py-3 text-sm font-semibold ${activeTab === 'editor' ? 'border-[#6757e8] text-[#6757e8]' : 'border-transparent text-[#8791a0]'}`}
            >
                Editor
            </button>
            <button
                onClick={() => onTabChange('style')}
                className={`border-b-2 px-3 py-3 text-sm font-semibold ${activeTab === 'style' ? 'border-[#6757e8] text-[#6757e8]' : 'border-transparent text-[#8791a0]'}`}
            >
                <Palette className="mr-1.5 inline" size={15} />
                Estilo
            </button>
        </div>
    )
}