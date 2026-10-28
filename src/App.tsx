import { useRef, useState } from 'react'
import { 
  AlignCenter,
  ArrowDownToLine,
  Check,
  ChevronDown,
  FileAudio,
  FileVideo,
  Film,
  FolderOpen,
  HelpCircle,
  Languages,
  LayoutDashboard,
  Link2,
  Menu,
  MoreHorizontal,
  Palette,
  Play,
  Plus,
  RotateCcw,
  Settings,
  Sparkles,
  Subtitles,
  Upload,
  WandSparkles,
  X,
 } from 'lucide-react'


 const captions = [
  { time: '00:00:00,000 → 00:00:02,420', text: 'Você já imaginou criar legendas perfeitas', active: true},
  { time: '00:00:02,420 → 00:00:05,180', text: 'para os seus vídeos em poucos minutos?', active: false },
  { time: '00:00:05,180 → 00:00:08,640', text: 'Com o Caption Studio, isso é possível.', active: false },
  { time: '00:00:08,640 → 00:00:11,200', text: 'Transcreva, edite e exporte com facilidade.', active: false },
 ]

function App() {
  const [mobileNav, setMobileNav] = useState(false)
  const [tab, setTab] = useState<'editor' | 'style'>('editor')
  const [hasVideo, setHasVideo] = useState(false)
  const [activeCaption, setActiveCaption] = useState(0)
  const [playing, setPlaying] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)


  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.[0]) setHasVideo(true)
  }
  return (
    <div className="min-h-screen bg-[#f7f8fa] text-[#18212f]">
      <header className="flex h-16 items-center justify-between border-b border-[#e8ebf0] bg-white px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button onClick={() => setMobileNav(!mobileNav)}
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
          <button className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#697487] hover:bg-[#f4f5f8] sm:flex">
            <HelpCircle size={17} />
            Ajuda
          </button>
          <div className="hidden h-5 w-px bg-[#e8ebf0] sm:block"/>
          <button className="flex size-9 items-center justify-center rounded-full bg-[#f1eefa] text-sm font-bold text-[#6757e8]" aria-label="Perfil">
            AS
          </button>
        </div>
      </header>


      <div className="flex">
        <aside className={`${mobileNav ? 'flex' : 'hidden'} fixed inset-y-16 left-0 z-10 w-64 flex-col border-r border-[#e8ebf0] bg-white p-4 shadow-xl lg:static lg:flex lg:min-h-[calc(100vh-4rem)] lg:shadow-none`}>
          <button className="mb-6 flex items-center justify-center gap-2 rounded-xl bg-[#6757e8] px-4 py-3 text-sm font-semibold text-white shadow-[0_5px_14px_rgba(103,87,232,0.22)] hover:bg-[#5747d5]">
            <Plus size={18}/>
            Novo Projecto
          </button>
          <nav className="flex flex-col gap-1" aria-label="Navegação Principal">
            <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.13em] text-[#a2aab8]">
              Menu Principal
            </p>
            {[['Projectos', FolderOpen], ['Modelos', LayoutDashboard]].map(([label, Icon], index) => <button key={label as string} 
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${index === 0 ? 'bg-[#f0edff] text-[#6757e8]' : 'text-[#6d7788] hover:bg-[#f6f7f9]'}`}><Icon size={18} /> {label as string}</button>)}
          </nav>

          <div className="mt-auto flex flex-col gap-1 border-t border-[#edf0f4] pt-4">
            <button className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#6d7788] hover:bg-[#f6f7f9]">
              <Settings size={18}/>
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
                <div className="h-full w-3/5 rounded-full bg-[#6757e8]"/>
              </div>

              <button className="mt-3 text-[11px] font-bold text-[#6757e8]">
                Fazer Upgrade →
              </button>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="mb-2 flex items-center gap-2 text-xs text-[#8993a3]">
                  <span>Projectos</span>
                  <span>/</span>
                  <span className="text-[#536073]">Novo Projecto</span>
                </div>
                <h1 className="text-2xl font-bold tracking-[-0.03em] sm:text-[28px]">
                  Novo Projecto
                </h1>
              </div>

              <div className="flex items-center gap-2">
                <span className="hidden items-center gap-1.5 text-xs text-[#778294] sm:flex">
                  <span className="size-2 rounded-full bg-[#42bd83]"/>
                  Salvo Automaticamente
                </span>
                <button className="flex items-center gap-2 rounded-lg border border-[#dfe3e9] bg-white px-3 py-2 text-sm font-semibold text-[#536073] shadow-sm hover:bg-[#f8f9fb]">
                  <MoreHorizontal size={17}/>
                  <span className="hidden sm:inline">Opções</span>
                </button>
                <button className="flex items-center gap-2 rounded-lg bg-[#6757e8] px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#5747d5]">
                  <ArrowDownToLine size={16} />
                  Exportar
                </button>
              </div>
            </div>

            <div className="mb-5 flex items-center gap-1 border-b border-[#e3e7ed]">
              <button onClick={() => setTab('editor')}
              className={`border-b-2 px-3 py-3 text-sm font-semibold ${tab === 'editor' ? 'border-[#6757e8] text-[#6757e8]' : 
                'border-transparent text-[#8791a0]'
              }`}>
                Editor
              </button>

              <button onClick={() => setTab('style')}
                className={`border-b-2 px-3 py-3 text-sm font-semibold ${tab === 'style' ? 'border-[#6757e8] text-[#6757e8]' :
                  'border-transparent text-[#8791a0]'
                }`}>
                <Palette className="mr-1.5 inline" size={15} />
                Estilo
              </button>
            </div>

            <div className="grid gap-5 xl:grid-cols-[minmax(0,1.25fr)_minmax(390px,0.9fr)]">
              <section className="min-w-0 rounded-2xl border border-[#e4e8ee] bg-white p-4 shadow-[0_2px_12px_rgba(23,34,55,0.03)] sm:p-5">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-bold">
                      Pré-visualização
                    </h2>
                    <p className="mt-1 text-xs text-[#8a94a4]">
                      Veja como suas legendas aparecem no vídeo
                    </p>
                  </div>
                  <button className="flex items-center gap-2 rounded-lg border border-[#e1e5eb] px-3 py-2 text-xs font-semibold text-[#657184] hover:bg-[#f7f8fa]">
                    <RotateCcw size={14} />
                    Reiniciar
                  </button>
                </div>
                {hasVideo ? 
                  <div className="relative aspect-video overflow-hidden rounded-xl bg-[#172131] shadow-inner">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_25%,rgba(83, 96,124,0.45), transparent_35%),linear-gradient(135deg,#243247,#121b29)]" />
                    <div className="absolute left-[16%] top-[20%] h-[55%] w-[28%] rounded-[50%] bg-[#55657c]/30 blur-2xl" />
                    <div className="absolute right-[12%] top-[12%] h-[70%] w-[30%] rounded-[50%] bg-[#6f82a4]/20 blur-3xl" />
                    <div className="absolute inset-x-4 bottom-5 text-center sm:bottom-8">
                        <span className="rounded-md bg-black/65 px-3 py-1.6 text-sm font-semibold text-white sm:text-base">
                          {
                            captions[activeCaption].text
                          }
                        </span>
                    </div>
                    <button onClick={() => setPlaying(!playing)} className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#6757e8] shadow-lg transition-transform hover:scale-105" aria-label={playing ? 'Pausar Vídeo' : 'Reproduzir vídeo'}>
                      {playing ? 
                        <span className="flex gap-1">
                          <span className="h-4 w-1 rounded bg-[#6757e8]"/>
                          <span className="h-4 w-1 rounded bg-[#6757e8]"/>
                        </span> : <Play size={20} fill='currentColor'/>
                      }
                    </button>
                    <span className="absolute bottom-3 right-3 rounded bg-black/45 px-1.5 py-0.5 font-mono text-[10px] text-white">
                      00:00:02 / 00:00:18
                    </span>
                  </div> : 
                  <div className="flex aspect-video flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#dfe3eb] bg-[#fafbfc] p-6 text-center">
                    <div className="mb-3 flex size-14 items-center justify-center rounded-2xl bg-[#f0edff] text-[#6757e8]">
                      <Upload size={25}/>
                    </div>
                    <h3 className="text-sm font-bold text-[#354052]">
                      Comece Adicionando um vídeo
                    </h3>
                    <p className="mt-1 max-w-xs text-xs leading-5 text-[#8a94a4]">
                      Envie um arquivo para gerar e editar suas legendas.
                    </p>
                    <button onClick={() => fileInputRef.current?.click()} className="mt-4 rounded-lg bg-[#6757e8] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#5747d5]">
                      Selecionar arquivo
                    </button>
                  </div>
                }

                {hasVideo && 
                  <div className="mt-4 flex items-center gap-3">
                    <span className='font-mono text-[11px] text-[#8e98a7]'>
                      00:00
                    </span>
                    <div className="relative h-1.5 flex-1 rounded-full bg-[#e7e9ee]">
                      <div className="h-full w-[13%] rounded-full bg-[#6757e8]"/>
                      <div className="absolute left-[13%] top-1/2 size-3 -translate-y-1/2 rounded-full border-2 border-white bg-[#6757e8] shadow"/>
                    </div>
                    <span className="font-mono text-[11px] text-[#8e98a7]">
                      00:18
                    </span>
                  </div>
                }

                {hasVideo && 
                  <div className="mt-5 grid grid-cols-3 gap-2 border-t border-[#edf0f4] pt-4 sm:grid-cols-6">
                    <button className="flex flex-col items-center gap-1 rounded-lg py-2 text-[#6f7a8c] hover:bg-[#f5f6f9]">
                      <Play size={16} />
                      <span className="text-[10px]">
                        Reproduzir
                      </span>
                    </button>
                    <button className="flex flex-col items-center gap-1 rounded-lg py-2 text-[#6f7a8c] hover:bg-[#f5f6f9]">
                      <Subtitles size={16} />
                      <span className="text-[10px]">
                        Legendas
                      </span>
                    </button>
                    <button className="flex flex-col items-center gap-1 rounded-lg py-2 text-[#6f7a8c] hover:bg-[#f5f6f9]">
                      <Languages size={16} />
                      <span className="text-[10px]">
                        Traduzir
                      </span>
                    </button>
                    <button className="hidden flex-col items-center gap-1 rounded-lg py-2 text-[#6f7a8c] hover:bg-[#f5f6f9] sm:flex">
                      <Film size={16} />
                      <span className="text-[10px]">
                        Burn-in
                      </span>
                    </button>
                    <button className="hidden flex-col items-center gap-1 rounded-lg py-2 text-[#6f7a8c] hover:bg-[#f5f6f9] sm:flex">
                      <Link2 size={16} />
                      <span className="text-[10px]">
                        Link
                      </span>
                    </button>
                    <button className="flex flex-col items-center gap-1 rounded-lg py-2 text-[#6f7a8c] hover:bg-[#f5f6f9]">
                      <MoreHorizontal size={16} />
                      <span className="text-[10px]">
                        Mais
                      </span>
                    </button>
                  </div>
                }
              </section>

              <section className="min-w-0 rounded-2xl border border-[#e4e8ee] bg-white p-4 shadow-[0_2px_12px_rgba(23,34,55,)0.03] sm:p-5">
                {tab === 'editor' ?
                  <>
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h2 className="text-sm font-bold">Editor de Legendas</h2>
                        <p className="mt-1 text-xs text-[#8a94a4]">
                          {hasVideo ?
                            '4 blocos · Português' : 'Nenhum vídeo importado'
                          }
                        </p>
                      </div>
                      <button className="flex items-center gap-1.5 rounded-lg bg-[#f0edff] px-2.5 py-2 text-xs font-bold text-[#6757e8] hover:bg-[#e6e1ff]">
                        <Sparkles size={14} />
                        IA
                      </button>
                    </div>
                    <div className="mb-4 flex gap-2">
                      <button onClick={() => setHasVideo(true)}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-dashed border-[#cdd3df] py-2.5 text-xs font-semibold text-[#748093] hover:border-[#6757e8] hover:text-[#6757e8]">
                        <Plus size={15} />
                        Adicionar bloco
                      </button>
                      <button className="flex items-center justify-center gap-2 rounded-lg border border-[#e1e5eb] px-3 py-2.5 text-xs font-semibold text-[#748093] hover:bg-[#f7f8fa]">
                        <WandSparkles size={14} />
                        Traduzir
                      </button>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      {hasVideo ? captions.map((caption, index) => 
                        <button key={caption.time} onClick={() => setActiveCaption(index)}
                          className={`group rounded-xl border p-3 text-left transition-colors ${activeCaption === index ? 'border-[#8c80ed] bg-[#faf9ff] ring-1 ring-[#8c80ed]' : 'border-[#e8ebf0] hover:border-[#c8c1f8]'}`}>
                          <div className="mb-2 flex items-center justify-between">
                            <span className={`font-mono text-[10px] font-medium ${activeCaption === index ? 'text-[#6757e8]' : 'text-[#929baa]'}`}>
                              {caption.time}
                            </span>
                            <MoreHorizontal size={15} className="text-[#adb4c0] opacity-0 group-hover:opacity-100"/>
                          </div>
                          <p className={`text-sm leading-5 ${activeCaption === index ? 'font-semibold text-[#303846]' : 'text-[#5e697a]'}`}>
                            {caption.text}
                          </p>
                        </button>) : <div className="rounded-xl border border-dashed border-[#e4e8ee] bg-[#fafbfc] px-4 py-8 text-center text-xs text-[#8a94a4]">
                          As legendas aparecerão aqui depois que você importar um video.
                        </div>
                      }
                    </div>
                    <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-[#e4e8ee] py-2.5 text-xs font-bold text-[#687487] hover:bg-[#f7f8fa]">
                      <Plus size={15} />
                      Adicionar Legenda
                    </button>
                  </> : <StylePanel />
                } 
              </section>
            </div>

            <section className="mt-5 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-[#e4e8ee] bg-white p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-[#fff4e9] text-[#eb9647]">
                    <Upload size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">Importar novo arquivo</h3>
                    <p className="text-xs text-[#8a94a4]">MP4, MKV, AVI, MP3 ou WAV</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <input ref={fileInputRef} onChange={handleFileChange} type="file" accept="video/*,audio/*"
                  className="hidden"/>
                  <button onClick={() => fileInputRef.current?.click()} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#f3f5f8] py-2.5 text-xs font-bold text-[#5e697a] hover:bg-[#e9ecf1">
                    <FileVideo size={15} />
                    Do Dispositivo
                  </button>
                  <button className="flex items-center justify-center gap-2 rounded-lg border border-[#e1e5eb] px-3 py-2.5 text-xs font-bold text-[#5e697a] hover:bg-[#f7f8fa]">
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
                <button className="flex w-full items-center justify-between rounded-lg border border-[#e1e5eb] px-3 py-2.5 text-left text-xs font-semibold text-[#536073]">
                  <span className="flex items-center gap-2">
                    Português
                  </span>
                  <ChevronDown size={15} />
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App




function StylePanel() {
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
            <button className="flex flex-1 items-center justify-between rounded-lg border border-[#e1e5eb] px-3 py-2.5 text-xs font-semibold">
              <span>Inter</span>
              <ChevronDown size={14} />
            </button>
            <button className="rounded-lg border border-[#e1e5eb] px-3 py-2.5 text-xs font-bold">
              16 px
            </button>
          </div>
        </div>
        <div>
          <label className="mb-2 block text-xs font-bold text-[#5e697a]">Cor do texto</label>
          <div className="flex gap-2">
            <button className="flex size-9 items-center justify-center rounded-lg border-2 border-[#6757e8] bg-white" aria-label="Branco">
              <span className="size-5 rounded-full border border-[#d5dae2] bg-white" />
            </button>
            <button className="flex size-9 items-center justify-center rounded-lg border border-[#e1e5eb] bg-white" aria-label="Amarelo">
              <span className="size-5 rounded-full bg-[#ffe27a]" />
            </button>
            <button className="flex size-9 items-center justify-center rounded-lg border border-[#e1e5eb] bg-white" aria-label="Azul">
              <span className="size-5 rounded-full bg-[#8bb9ff]" />
            </button>
          </div>
        </div>
        <div>
          <label className="mb-2 block text-xs font-bold text-[#5e697a]">Posição</label>
          <div className="grid grid-cols-3 gap-2">
            <button className="rounded-lg border border-[#e1e5eb] p-2 text-xs text-[#6d7788]">
              Topo
            </button>
            <button className="rounded-lg border border-[#6757e8] bg-[#f0edff] p-2 text-xs font-bold text-[#6757e8]">
              <AlignCenter size={14} className="mx-auto mb-1" />
              Centro
            </button>
            <button className="rounded-lg border border-[#e1e5eb] p-2 text-xs text-[#6d7788]">
              Base
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-[#f7f8fa] p-3">
          <div>
            <p className="text-xs font-bold">Fundo da legenda</p>
            <p className="mt-0.5 text-[11px] text-[#8a94a4]">Adicionar barra semi-transparente</p>
          </div>
          <div className="h-5 w-9 rounded-full bg-[#6757e8] p-0.5">
            <div className="ml-4 size-4 rounded-full bg-white shadow" />
          </div>
        </div>
        <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#e1e5eb] py-2.5 text-xs font-bold text-[#687487] hover:bg-[#f7f8fa]">
          Restaurar padrão
        </button>
      </div>
    </div>
  )
}