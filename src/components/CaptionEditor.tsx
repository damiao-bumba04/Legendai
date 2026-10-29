import { Check, MoreHorizontal, Plus, Sparkles, WandSparkles, X } from 'lucide-react'
import StylePanel from './StylePane'
import type { EditorTab } from './EditorTabs'
import type { Caption, CaptionStyle } from '../types'

type CaptionEditorProps = {
    activeTab: EditorTab
    hasVideo: boolean
    captions: Caption[]
    activeCaption: number
    onSelectCaption: (index: number) => void
    onAddCaption: () => void
    onCaptionChange: (index: number, text: string) => void
    onDeleteCaption: (index: number) => void
    onTranslate: () => void
    onGenerate: () => void
    style: CaptionStyle
    onStyleChange: (style: CaptionStyle) => void
    onStyleReset: () => void
}

export default function CaptionEditor({
    activeTab,
    hasVideo,
    captions,
    activeCaption,
    onSelectCaption,
    onAddCaption,
    onCaptionChange,
    onDeleteCaption,
    onTranslate,
    onGenerate,
    style,
    onStyleChange,
    onStyleReset,
}: CaptionEditorProps) {
    return (
        <section className="min-w-0 rounded-2xl border border-[#e4e8ee] bg-white p-4 shadow-[0_2px_12px_rgba(23,34,55,)0.03] sm:p-5">
            {activeTab === 'editor' ? (
                <>
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h2 className="text-sm font-bold">Editor de Legendas</h2>
                            <p className="mt-1 text-xs text-[#8a94a4]">
                                {hasVideo ? `${captions.length} blocos · Português` : 'Nenhum vídeo importado'}
                            </p>
                        </div>
                        <button onClick={onGenerate} className="flex items-center gap-1.5 rounded-lg bg-[#f0edff] px-2.5 py-2 text-xs font-bold text-[#6757e8] hover:bg-[#e6e1ff]">
                            <Sparkles size={14} />
                            IA
                        </button>
                    </div>
                    <div className="mb-4 flex gap-2">
                        <button
                            onClick={onAddCaption}
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-dashed border-[#cdd3df] py-2.5 text-xs font-semibold text-[#748093] hover:border-[#6757e8] hover:text-[#6757e8]"
                        >
                            <Plus size={15} />
                            Adicionar bloco
                        </button>
                        <button onClick={onTranslate} className="flex items-center justify-center gap-2 rounded-lg border border-[#e1e5eb] px-3 py-2.5 text-xs font-semibold text-[#748093] hover:bg-[#f7f8fa]">
                            <WandSparkles size={14} />
                            Traduzir
                        </button>
                    </div>
                    <div className="flex flex-col gap-2.5">
                        {hasVideo && captions.length > 0 ? (
                            captions.map((caption, index) => (
                                <div
                                    key={caption.time}
                                    onFocus={() => onSelectCaption(index)}
                                    className={`group rounded-xl border p-3 text-left transition-colors ${activeCaption === index ? 'border-[#8c80ed] bg-[#faf9ff] ring-1 ring-[#8c80ed]' : 'border-[#e8ebf0] hover:border-[#c8c1f8]'}`}
                                >
                                    <div className="mb-2 flex items-center justify-between gap-2">
                                        <span className={`font-mono text-[10px] font-medium ${activeCaption === index ? 'text-[#6757e8]' : 'text-[#929baa]'}`}>
                                            {caption.time}
                                        </span>
                                        <div className="flex items-center gap-1">
                                            {activeCaption === index && <Check size={14} className="text-[#6757e8]" />}
                                            <button onClick={() => onDeleteCaption(index)} className="rounded p-1 text-[#929baa] hover:bg-white hover:text-red-600" aria-label="Apagar legenda">
                                                <X size={14} />
                                            </button>
                                            <MoreHorizontal size={15} className="text-[#adb4c0]" />
                                        </div>
                                    </div>
                                    <textarea
                                        value={caption.text}
                                        onFocus={() => onSelectCaption(index)}
                                        onChange={(event) => onCaptionChange(index, event.target.value)}
                                        rows={2}
                                        aria-label={`Texto da legenda ${index + 1}`}
                                        className={`w-full resize-y bg-transparent text-sm leading-5 outline-none ${activeCaption === index ? 'font-semibold text-[#303846]' : 'text-[#5e697a]'}`}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="rounded-xl border border-dashed border-[#e4e8ee] bg-[#fafbfc] px-4 py-8 text-center text-xs text-[#8a94a4]">
                                As legendas aparecerão aqui depois que você importar um video.
                            </div>
                        )}
                    </div>
                    <button onClick={onAddCaption} className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-[#e4e8ee] py-2.5 text-xs font-bold text-[#687487] hover:bg-[#f7f8fa]">
                        <Plus size={15} />
                        Adicionar Legenda
                    </button>
                </>
            ) : (
                <StylePanel value={style} onChange={onStyleChange} onReset={onStyleReset} />
            )}
        </section>
    )
}