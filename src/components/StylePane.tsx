import { AlignCenter, ChevronDown } from 'lucide-react'
import type { CaptionStyle } from '../types'

type StylePanelProps = {
    value: CaptionStyle
    onChange: (value: CaptionStyle) => void
    onReset: () => void
}

const colors = [
    { name: 'Branco', value: '#ffffff' },
    { name: 'Amarelo', value: '#ffe27a' },
    { name: 'Azul', value: '#8bb9ff' },
]

export default function StylePanel({ value, onChange, onReset }: StylePanelProps) {
    return (
        <div>
            <div className="mb-5">
                <h2 className="text-sm font-bold">Estilo das legendas</h2>
                <p className="mt-1 text-xs text-[#8a94a4]">Personalize a aparência no video</p>
            </div>
            <div className="flex flex-col gap-5">
                <div>
                    <label className="mb-2 block text-xs font-bold text-[#5e697a]">Fonte</label>
                    <div className="flex gap-2">
                        <label className="flex flex-1 items-center justify-between rounded-lg border border-[#e1e5eb] px-3 py-2.5 text-xs font-semibold">
                            <select aria-label="Fonte da legenda" value={value.fontFamily} onChange={(event) => onChange({ ...value, fontFamily: event.target.value })} className="w-full appearance-none bg-transparent outline-none">
                                <option>Inter</option>
                                <option>Arial</option>
                                <option>Georgia</option>
                                <option>monospace</option>
                            </select>
                            <ChevronDown size={14} />
                        </label>
                        <label className="flex items-center gap-1 rounded-lg border border-[#e1e5eb] px-2 text-xs font-bold">
                            <input aria-label="Tamanho da fonte" type="number" min="10" max="72" value={value.fontSize} onChange={(event) => onChange({ ...value, fontSize: Number(event.target.value) })} className="w-10 bg-transparent text-right outline-none" /> px
                        </label>
                    </div>
                </div>
                <div>
                    <label className="mb-2 block text-xs font-bold text-[#5e697a]">Cor do texto</label>
                    <div className="flex gap-2">
                        {colors.map((color) => (
                            <button key={color.value} onClick={() => onChange({ ...value, color: color.value })} className={`flex size-9 items-center justify-center rounded-lg border bg-white ${value.color === color.value ? 'border-2 border-[#6757e8]' : 'border-[#e1e5eb]'}`} aria-label={color.name} aria-pressed={value.color === color.value}>
                                <span className="size-5 rounded-full border border-[#d5dae2]" style={{ backgroundColor: color.value }} />
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="mb-2 block text-xs font-bold text-[#5e697a]">Posição</label>
                    <div className="grid grid-cols-3 gap-2">
                        <button onClick={() => onChange({ ...value, position: 'top' })} aria-pressed={value.position === 'top'} className={`rounded-lg border p-2 text-xs ${value.position === 'top' ? 'border-[#6757e8] bg-[#f0edff] font-bold text-[#6757e8]' : 'border-[#e1e5eb] text-[#6d7788]'}`}>
                            Topo
                        </button>
                        <button onClick={() => onChange({ ...value, position: 'center' })} aria-pressed={value.position === 'center'} className={`rounded-lg border p-2 text-xs ${value.position === 'center' ? 'border-[#6757e8] bg-[#f0edff] font-bold text-[#6757e8]' : 'border-[#e1e5eb] text-[#6d7788]'}`}>
                            <AlignCenter size={14} className="mx-auto mb-1" />
                            Centro
                        </button>
                        <button onClick={() => onChange({ ...value, position: 'bottom' })} aria-pressed={value.position === 'bottom'} className={`rounded-lg border p-2 text-xs ${value.position === 'bottom' ? 'border-[#6757e8] bg-[#f0edff] font-bold text-[#6757e8]' : 'border-[#e1e5eb] text-[#6d7788]'}`}>
                            Base
                        </button>
                    </div>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-[#f7f8fa] p-3">
                    <div>
                        <p className="text-xs font-bold">Fundo da legenda</p>
                        <p className="mt-0.5 text-[11px] text-[#8a94a4]">Adicionar barra semi-transparente</p>
                    </div>
                    <button role="switch" aria-checked={value.background} aria-label="Fundo da legenda" onClick={() => onChange({ ...value, background: !value.background })} className={`h-5 w-9 rounded-full p-0.5 transition-colors ${value.background ? 'bg-[#6757e8]' : 'bg-[#aab2bf]'}`}>
                        <span className={`block size-4 rounded-full bg-white shadow transition-transform ${value.background ? 'translate-x-4' : ''}`} />
                    </button>
                </div>
                <button onClick={onReset} className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#e1e5eb] py-2.5 text-xs font-bold text-[#687487] hover:bg-[#f7f8fa]">
                    Restaurar padrão
                </button>
            </div>
        </div>
    )
}