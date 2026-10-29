import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Check, ChevronDown, FileVideo, Link2, Upload } from 'lucide-react'
import AuthScreen from './components/AuthScreen'
import AppDialog from './components/AppDialog'
import Header from './components/Header'
import Aside from './components/Aside'
import ProjectHeading from './components/ProjectHeading'
import EditorTabs, { type EditorTab } from './components/EditorTabs'
import VideoPreview from './components/VideoPreview'
import CaptionEditor from './components/CaptionEditor'
import { defaultCaptionStyle, type Caption, type CaptionStyle } from './types'

const initialCaptions: Caption[] = [
    { time: '00:00:00,000 → 00:00:02,420', text: 'Você já imaginou criar legendas perfeitas' },
    { time: '00:00:02,420 → 00:00:05,180', text: 'para os seus vídeos em poucos minutos?' },
    { time: '00:00:05,180 → 00:00:08,640', text: 'Com o Caption Studio, isso é possível.' },
    { time: '00:00:08,640 → 00:00:11,200', text: 'Transcreva, edite e exporte com facilidade.' },
]

type MediaSource = {
    url: string
    name: string
    isAudio: boolean
    isLocal: boolean
}

type DialogKind = 'help' | 'options' | 'link' | 'settings' | 'upgrade' | 'templates' | 'translate' | 'burn-in' | 'share' | 'more' | null

function formatSrtTime(totalSeconds: number) {
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0')
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0')
    const seconds = (totalSeconds % 60).toString().padStart(2, '0')
    return `${hours}:${minutes}:${seconds},000`
}

const dialogTitles: Record<Exclude<DialogKind, null>, string> = {
    help: 'Ajuda',
    options: 'Opções do projecto',
    link: 'Importar por link',
    settings: 'Configurações',
    upgrade: 'Planos',
    templates: 'Modelos de legenda',
    translate: 'Traduzir legendas',
    'burn-in': 'Exportação Burn-in',
    share: 'Partilhar projecto',
    more: 'Mais ferramentas',
}

const sampleTranslations: Record<string, string[]> = {
    English: [
        'Have you ever imagined creating perfect subtitles',
        'for your videos in just a few minutes?',
        'With Caption Studio, it is possible.',
        'Transcribe, edit, and export with ease.',
    ],
    Espanhol: [
        '¿Alguna vez imaginaste crear subtítulos perfectos',
        'para tus vídeos en pocos minutos?',
        'Con Caption Studio, es posible.',
        'Transcribe, edita y exporta fácilmente.',
    ],
}

function App() {
    const [user, setUser] = useState<{ name: string; email: string } | null>(null)
    const [mobileNav, setMobileNav] = useState(false)
    const [tab, setTab] = useState<EditorTab>('editor')
    const [activePage, setActivePage] = useState<'projects' | 'templates'>('projects')
    const [projectName, setProjectName] = useState('Novo Projecto')
    const [captions, setCaptions] = useState<Caption[]>(initialCaptions)
    const [activeCaption, setActiveCaption] = useState(0)
    const [showCaptions, setShowCaptions] = useState(false)
    const [captionStyle, setCaptionStyle] = useState<CaptionStyle>(defaultCaptionStyle)
    const [media, setMedia] = useState<MediaSource | null>(null)
    const [sourceLanguage, setSourceLanguage] = useState('Português')
    const [targetLanguage, setTargetLanguage] = useState('English')
    const [dialog, setDialog] = useState<DialogKind>(null)
    const [dialogError, setDialogError] = useState('')
    const [notice, setNotice] = useState('')
    const [renameValue, setRenameValue] = useState(projectName)
    const [linkValue, setLinkValue] = useState('')
    const [plan, setPlan] = useState('Gratuito')
    const [showTips, setShowTips] = useState(true)
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!media?.isLocal) return
        const objectUrl = media.url
        return () => URL.revokeObjectURL(objectUrl)
    }, [media])

    useEffect(() => {
        if (!notice) return
        const timeout = window.setTimeout(() => setNotice(''), 3500)
        return () => window.clearTimeout(timeout)
    }, [notice])

    function notify(message: string) {
        setNotice(message)
    }

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0]
        if (!file) return
        setMedia({
            url: URL.createObjectURL(file),
            name: file.name,
            isAudio: file.type.startsWith('audio/'),
            isLocal: true,
        })
        setShowCaptions(true)
        setActiveCaption(0)
        notify(`Ficheiro carregado: ${file.name}`)
        event.target.value = ''
    }

    function handleLinkSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setDialogError('')
        try {
            const url = new URL(linkValue)
            if (!['http:', 'https:'].includes(url.protocol)) throw new Error('URL inválido')
            const isAudio = /\.(mp3|wav|ogg|m4a|aac)(\?|$)/i.test(url.pathname + url.search)
            setMedia({
                url: url.toString(),
                name: url.pathname.split('/').pop() || url.hostname,
                isAudio,
                isLocal: false,
            })
            setShowCaptions(true)
            setActiveCaption(0)
            setDialog(null)
            setLinkValue('')
            notify('Link adicionado. A reprodução depende de o endereço permitir acesso direto ao ficheiro.')
        } catch {
            setDialogError('Introduza um URL válido, começando por http:// ou https://.')
        }
    }

    function handleExport() {
        const content = captions
            .map((caption, index) => `${index + 1}\n${caption.time.replace(' → ', ' --> ')}\n${caption.text}`)
            .join('\n\n')
        const url = URL.createObjectURL(new Blob([content], { type: 'text/plain;charset=utf-8' }))
        const link = document.createElement('a')
        link.href = url
        link.download = `${projectName.trim().replace(/\s+/g, '-') || 'legendas'}.srt`
        link.click()
        window.setTimeout(() => URL.revokeObjectURL(url), 1000)
        setDialog(null)
        notify('Ficheiro SRT exportado.')
    }

    function handleAddCaption() {
        const start = captions.length * 3
        const end = start + 3
        const caption: Caption = {
            time: `${formatSrtTime(start)} → ${formatSrtTime(end)}`,
            text: 'Escreva o texto da nova legenda',
        }
        setCaptions((current) => [...current, caption])
        setActiveCaption(captions.length)
        setShowCaptions(true)
    }

    function handleDeleteCaption(index: number) {
        const updated = captions.filter((_, itemIndex) => itemIndex !== index)
        setCaptions(updated)
        setActiveCaption((current) => Math.max(0, Math.min(current > index ? current - 1 : current, updated.length - 1)))
        if (updated.length === 0 && !media) setShowCaptions(false)
    }

    function handleNewProject() {
        setProjectName('Novo Projecto')
        setCaptions(initialCaptions)
        setActiveCaption(0)
        setShowCaptions(false)
        setMedia(null)
        setCaptionStyle(defaultCaptionStyle)
        setTab('editor')
        setActivePage('projects')
        setMobileNav(false)
        setDialog(null)
        notify('Novo projecto criado.')
    }

    function handleGenerateDemo() {
        const start = captions.length * 3
        setCaptions((current) => [...current, {
            time: `${formatSrtTime(start)} → ${formatSrtTime(start + 3)}`,
            text: 'Nova legenda de demonstração gerada localmente.',
        }])
        setActiveCaption(captions.length)
        setShowCaptions(true)
        notify('Legenda de demonstração criada. A geração real por IA requer um serviço externo.')
    }

    function handleTranslate() {
        const translations = sampleTranslations[targetLanguage]
        if (!translations) return
        setCaptions((current) => current.map((caption) => {
            const sampleIndex = initialCaptions.findIndex((sample) => sample.text === caption.text)
            return sampleIndex < 0 ? caption : { ...caption, text: translations[sampleIndex] }
        }))
        setSourceLanguage(targetLanguage)
        setDialog(null)
        notify('Traduções locais aplicadas às frases de exemplo. Texto personalizado foi mantido.')
    }

    async function handleShare() {
        try {
            await navigator.clipboard.writeText(window.location.href)
            setDialog(null)
            notify('Endereço da aplicação copiado.')
        } catch {
            setDialog('share')
        }
    }

    function openOptions() {
        setRenameValue(projectName)
        setDialog('options')
    }

    if (!user) return <AuthScreen onAuthenticated={setUser} />

    return (
        <div className="min-h-screen bg-[#f7f8fa] text-[#18212f]">
            <Header
                onToggleMenu={() => setMobileNav((open) => !open)}
                onHelp={() => setDialog('help')}
                onLogout={() => { setUser(null); notify('Sessão terminada.') }}
                userName={user.name}
            />

            <div className="flex">
                <Aside
                    mobileNav={mobileNav}
                    activePage={activePage}
                    onNavigate={(page) => {
                        setActivePage(page)
                        setMobileNav(false)
                        if (page === 'templates') setDialog('templates')
                        else {
                            setDialog(null)
                            notify('Está a visualizar o projecto atual.')
                        }
                    }}
                    onNewProject={handleNewProject}
                    onSettings={() => setDialog('settings')}
                    onUpgrade={() => setDialog('upgrade')}
                />

                <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
                    <div className="mx-auto max-w-360">
                        <ProjectHeading projectName={projectName} onOptions={openOptions} onExport={handleExport} />
                        <EditorTabs activeTab={tab} onTabChange={setTab} />

                        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.25fr)_minmax(390px,0.9fr)]">
                            <VideoPreview
                                hasVideo={Boolean(media)}
                                mediaUrl={media?.url ?? null}
                                isAudio={media?.isAudio ?? false}
                                captionText={captions[activeCaption]?.text ?? ''}
                                captionStyle={captionStyle}
                                onSelectFile={() => fileInputRef.current?.click()}
                                onToolAction={(action) => {
                                    if (action === 'translate') setDialog('translate')
                                    else setDialog(action === 'burn-in' ? 'burn-in' : action === 'share' ? 'share' : 'more')
                                }}
                                onMediaError={() => notify('Não foi possível reproduzir esta mídia. Verifique o formato ou o acesso ao link.')}
                            />
                            <CaptionEditor
                                activeTab={tab}
                                hasVideo={Boolean(media) || showCaptions}
                                captions={captions}
                                activeCaption={activeCaption}
                                onSelectCaption={setActiveCaption}
                                onAddCaption={handleAddCaption}
                                onCaptionChange={(index, text) => setCaptions((current) => current.map((caption, itemIndex) => itemIndex === index ? { ...caption, text } : caption))}
                                onDeleteCaption={handleDeleteCaption}
                                onTranslate={() => setDialog('translate')}
                                onGenerate={handleGenerateDemo}
                                style={captionStyle}
                                onStyleChange={setCaptionStyle}
                                onStyleReset={() => { setCaptionStyle(defaultCaptionStyle); notify('Estilo restaurado.') }}
                            />
                        </div>

                        <section className="mt-5 grid gap-5 md:grid-cols-2">
                            <div className="rounded-2xl border border-[#e4e8ee] bg-white p-5">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex size-9 items-center justify-center rounded-lg bg-[#fff4e9] text-[#eb9647]">
                                        <Upload size={18} />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-sm font-bold">Importar novo arquivo</h3>
                                        <p className="truncate text-xs text-[#8a94a4]">{media?.name ?? 'MP4, MKV, AVI, MP3 ou WAV'}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <input ref={fileInputRef} onChange={handleFileChange} type="file" accept="video/*,audio/*" className="hidden" />
                                    <button onClick={() => fileInputRef.current?.click()} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#f3f5f8] py-2.5 text-xs font-bold text-[#5e697a] hover:bg-[#e9ecf1]">
                                        <FileVideo size={15} />
                                        Do dispositivo
                                    </button>
                                    <button onClick={() => { setDialogError(''); setDialog('link') }} className="flex items-center justify-center gap-2 rounded-lg border border-[#e1e5eb] px-3 py-2.5 text-xs font-bold text-[#5e697a] hover:bg-[#f7f8fa]">
                                        <Link2 size={15} />
                                        Link
                                    </button>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-[#e4e8ee] bg-white p-5">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex size-9 items-center justify-center rounded-lg bg-[#eaf8f3] text-[#39ae79]">
                                        <Check size={18} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold">Idioma original</h3>
                                        <p className="text-xs text-[#8a94a4]">Detectado automaticamente</p>
                                    </div>
                                </div>
                                <label className="flex w-full items-center justify-between rounded-lg border border-[#e1e5eb] px-3 py-2.5 text-left text-xs font-semibold text-[#536073]">
                                    <select value={sourceLanguage} onChange={(event) => setSourceLanguage(event.target.value)} aria-label="Idioma original" className="w-full appearance-none bg-transparent outline-none">
                                        <option>Português</option>
                                        <option>English</option>
                                        <option>Espanhol</option>
                                        <option>Francês</option>
                                    </select>
                                    <ChevronDown size={15} />
                                </label>
                            </div>
                        </section>
                    </div>
                </main>
            </div>

            {dialog && (
                <AppDialog title={dialogTitles[dialog]} onClose={() => setDialog(null)}>
                    {dialog === 'help' && (
                        <div className="space-y-4 text-sm leading-6 text-[#657184]">
                            <p>Importe um ficheiro ou um URL direto, edite o texto das legendas e selecione uma para a pré-visualização.</p>
                            <p>As ações de IA e processamento de vídeo são demonstrações locais; não existe servidor ligado.</p>
                            <button onClick={() => setDialog(null)} className="rounded-lg bg-[#6757e8] px-4 py-2 font-semibold text-white">Entendi</button>
                        </div>
                    )}

                    {dialog === 'options' && (
                        <form onSubmit={(event) => { event.preventDefault(); setProjectName(renameValue.trim() || 'Sem título'); setDialog(null); notify('Nome do projecto atualizado.') }} className="space-y-4">
                            <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#465164]">Nome do projecto<input value={renameValue} onChange={(event) => setRenameValue(event.target.value)} className="rounded-lg border border-[#dfe3e9] px-3 py-2.5 font-normal" /></label>
                            <div className="flex flex-wrap justify-between gap-2">
                                <button type="button" onClick={handleNewProject} className="rounded-lg border border-[#dfe3e9] px-3 py-2 text-sm font-semibold text-[#536073]">Reiniciar projecto</button>
                                <button className="rounded-lg bg-[#6757e8] px-4 py-2 text-sm font-semibold text-white">Guardar nome</button>
                            </div>
                        </form>
                    )}

                    {dialog === 'link' && (
                        <form onSubmit={handleLinkSubmit} className="space-y-4">
                            <p className="text-sm leading-5 text-[#778294]">Cole um link direto para um ficheiro de áudio ou vídeo. Páginas de plataformas de vídeo não são fontes de mídia diretas.</p>
                            <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#465164]">URL<input autoFocus type="url" required value={linkValue} onChange={(event) => setLinkValue(event.target.value)} placeholder="https://exemplo.com/video.mp4" className="rounded-lg border border-[#dfe3e9] px-3 py-2.5 font-normal" /></label>
                            {dialogError && <p role="alert" className="text-sm text-red-600">{dialogError}</p>}
                            <button className="rounded-lg bg-[#6757e8] px-4 py-2.5 text-sm font-semibold text-white">Adicionar mídia</button>
                        </form>
                    )}

                    {dialog === 'settings' && (
                        <div className="space-y-5">
                            <label className="flex items-center justify-between gap-4 text-sm text-[#536073]">Mostrar notificações de ajuda<button role="switch" aria-checked={showTips} onClick={() => setShowTips((value) => { const next = !value; notify(next ? 'Notificações de ajuda ativadas.' : 'Notificações de ajuda desativadas.'); return next })} className={`h-5 w-9 rounded-full p-0.5 ${showTips ? 'bg-[#6757e8]' : 'bg-[#aab2bf]'}`}><span className={`block size-4 rounded-full bg-white transition-transform ${showTips ? 'translate-x-4' : ''}`} /></button></label>
                            <p className="text-xs leading-5 text-[#929baa]">As preferências ficam apenas nesta sessão de demonstração.</p>
                            <button onClick={() => setDialog(null)} className="rounded-lg bg-[#6757e8] px-4 py-2 text-sm font-semibold text-white">Concluir</button>
                        </div>
                    )}

                    {dialog === 'upgrade' && (
                        <div className="space-y-3">
                            <p className="text-sm text-[#778294]">Plano atual: {plan}. A seleção é demonstrativa e não inicia pagamentos.</p>
                            {['Gratuito', 'Studio'].map((option) => <button key={option} onClick={() => { setPlan(option); setDialog(null); notify(`Plano ${option} selecionado para esta sessão.`) }} className={`flex w-full items-center justify-between rounded-lg border p-3 text-left text-sm font-semibold ${plan === option ? 'border-[#6757e8] bg-[#f7f5ff] text-[#6757e8]' : 'border-[#e1e5eb] text-[#536073]'}`}>{option}<span>{option === 'Gratuito' ? '5 projectos' : 'Projectos ilimitados'}</span></button>)}
                        </div>
                    )}

                    {dialog === 'templates' && (
                        <div className="grid gap-3 sm:grid-cols-3">
                            {[
                                { name: 'Clássico', style: defaultCaptionStyle },
                                { name: 'Impacto', style: { ...defaultCaptionStyle, fontFamily: 'Arial', fontSize: 24, color: '#ffe27a', background: true } },
                                { name: 'Minimalista', style: { ...defaultCaptionStyle, fontFamily: 'Georgia', fontSize: 18, color: '#ffffff', background: false } },
                            ].map((template) => <button key={template.name} onClick={() => { setCaptionStyle(template.style); setTab('style'); setDialog(null); notify(`Modelo ${template.name} aplicado.`) }} className="rounded-lg border border-[#e1e5eb] p-4 text-left hover:border-[#6757e8]"><span className="mb-3 block rounded bg-[#172131] p-3 text-center font-bold" style={{ color: template.style.color, fontFamily: template.style.fontFamily, fontSize: `${Math.min(template.style.fontSize, 20)}px` }}>Aa</span><span className="text-sm font-semibold">{template.name}</span></button>)}
                        </div>
                    )}

                    {dialog === 'translate' && (
                        <form onSubmit={(event) => { event.preventDefault(); handleTranslate() }} className="space-y-4">
                            <p className="text-sm leading-5 text-[#778294]">A demonstração inclui traduções locais para as frases de exemplo. Texto personalizado requer um serviço de tradução.</p>
                            <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#465164]">Idioma de destino<select value={targetLanguage} onChange={(event) => setTargetLanguage(event.target.value)} className="rounded-lg border border-[#dfe3e9] bg-white px-3 py-2.5"><option>English</option><option>Espanhol</option></select></label>
                            <button className="rounded-lg bg-[#6757e8] px-4 py-2.5 text-sm font-semibold text-white">Aplicar tradução de demonstração</button>
                        </form>
                    )}

                    {dialog === 'burn-in' && (
                        <div className="space-y-4 text-sm leading-5 text-[#778294]">
                            <p>Incorporar legendas no vídeo requer processamento de mídia, ainda não ligado neste protótipo.</p>
                            <button onClick={handleExport} className="rounded-lg bg-[#6757e8] px-4 py-2.5 font-semibold text-white">Exportar legendas SRT</button>
                        </div>
                    )}

                    {dialog === 'share' && (
                        <div className="space-y-4">
                            <p className="text-sm text-[#778294]">Copie o endereço desta demonstração para partilhar a página.</p>
                            <input readOnly value={window.location.href} onFocus={(event) => event.target.select()} className="w-full rounded-lg border border-[#dfe3e9] px-3 py-2.5 text-sm text-[#536073]" />
                            <button onClick={handleShare} className="rounded-lg bg-[#6757e8] px-4 py-2.5 text-sm font-semibold text-white">Copiar endereço</button>
                        </div>
                    )}

                    {dialog === 'more' && (
                        <div className="space-y-3">
                            <button onClick={handleExport} className="w-full rounded-lg border border-[#e1e5eb] px-4 py-3 text-left text-sm font-semibold text-[#536073] hover:bg-[#f7f8fa]">Exportar ficheiro SRT</button>
                            <button onClick={() => setDialog('share')} className="w-full rounded-lg border border-[#e1e5eb] px-4 py-3 text-left text-sm font-semibold text-[#536073] hover:bg-[#f7f8fa]">Copiar link da aplicação</button>
                        </div>
                    )}
                </AppDialog>
            )}

            {notice && <div role="status" className="fixed bottom-4 right-4 z-60 flex max-w-sm items-center gap-3 rounded-lg bg-[#18212f] px-4 py-3 text-sm font-medium text-white shadow-xl"><span>{notice}</span><button onClick={() => setNotice('')} aria-label="Fechar notificação" className="text-white/75 hover:text-white">×</button></div>}
        </div>
    )
}

export default App