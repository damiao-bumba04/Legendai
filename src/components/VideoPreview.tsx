import { useRef, useState, type SyntheticEvent } from 'react'
import { Film, Languages, Link2, MoreHorizontal, Play, RotateCcw, Subtitles, Upload } from 'lucide-react'
import type { CaptionStyle } from '../types'

type VideoPreviewProps = {
    hasVideo: boolean
    mediaUrl: string | null
    isAudio: boolean
    captionText: string
    captionStyle: CaptionStyle
    onSelectFile: () => void
    onToolAction: (action: 'translate' | 'burn-in' | 'share' | 'more') => void
    onMediaError: () => void
}

function formatTime(seconds: number) {
    if (!Number.isFinite(seconds)) return '00:00'
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0')
    const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, '0')
    return `${minutes}:${remainingSeconds}`
}

export default function VideoPreview({ hasVideo, mediaUrl, isAudio, captionText, captionStyle, onSelectFile, onToolAction, onMediaError }: VideoPreviewProps) {
    const [playing, setPlaying] = useState(false)
    const [captionsVisible, setCaptionsVisible] = useState(true)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(18)
    const videoRef = useRef<HTMLVideoElement>(null)
    const audioRef = useRef<HTMLAudioElement>(null)

    function getMediaElement() {
        return isAudio ? audioRef.current : videoRef.current
    }

    async function togglePlayback() {
        const media = getMediaElement()
        if (!media) {
            setPlaying((current) => !current)
            return
        }
        if (media.paused) {
            try {
                await media.play()
                setPlaying(true)
            } catch {
                setPlaying(false)
            }
        } else {
            media.pause()
            setPlaying(false)
        }
    }

    function resetPlayback() {
        const media = getMediaElement()
        if (media) {
            media.pause()
            media.currentTime = 0
        }
        setCurrentTime(0)
        setPlaying(false)
    }

    function updateTime(event: SyntheticEvent<HTMLMediaElement>) {
        setCurrentTime(event.currentTarget.currentTime)
        if (Number.isFinite(event.currentTarget.duration)) setDuration(event.currentTarget.duration)
    }

    function seekTo(value: number) {
        setCurrentTime(value)
        const media = getMediaElement()
        if (media) media.currentTime = value
    }

    return (
        <section className="min-w-0 rounded-2xl border border-[#e4e8ee] bg-white p-4 shadow-[0_2px_12px_rgba(23,34,55,0.03)] sm:p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 className="text-sm font-bold">Pré-visualização</h2>
                    <p className="mt-1 text-xs text-[#8a94a4]">
                        Veja como suas legendas aparecem no vídeo
                    </p>
                </div>
                <button onClick={resetPlayback} className="flex items-center gap-2 rounded-lg border border-[#e1e5eb] px-3 py-2 text-xs font-semibold text-[#657184] hover:bg-[#f7f8fa]">
                    <RotateCcw size={14} />
                    Reiniciar
                </button>
            </div>

            {hasVideo ? (
                <div className="relative aspect-video overflow-hidden rounded-xl bg-[#172131] shadow-inner">
                    {mediaUrl && !isAudio && <video ref={videoRef} src={mediaUrl} onError={onMediaError} onTimeUpdate={updateTime} onLoadedMetadata={updateTime} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} className="absolute inset-0 size-full object-contain" />}
                    {mediaUrl && isAudio && <audio ref={audioRef} src={mediaUrl} onError={onMediaError} onTimeUpdate={updateTime} onLoadedMetadata={updateTime} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />}
                    {!mediaUrl && <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_25%,rgba(83, 96,124,0.45), transparent_35%),linear-gradient(135deg,#243247,#121b29)]" />}
                    {!mediaUrl && <div className="absolute left-[16%] top-[20%] h-[55%] w-[28%] rounded-[50%] bg-[#55657c]/30 blur-2xl" />}
                    {!mediaUrl && <div className="absolute right-[12%] top-[12%] h-[70%] w-[30%] rounded-[50%] bg-[#6f82a4]/20 blur-3xl" />}
                    {isAudio && <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(135deg,#f5f3ff,#eaf5f2)]"><div className="flex h-24 items-center gap-1.5">{Array.from({ length: 28 }, (_, index) => <span key={index} className="w-1.5 rounded-full bg-[#6757e8]/70" style={{ height: `${18 + ((index * 17) % 70)}%` }} />)}</div></div>}
                    {captionsVisible && <div className={`absolute inset-x-4 text-center ${captionStyle.position === 'top' ? 'top-5' : captionStyle.position === 'center' ? 'top-1/2 -translate-y-1/2' : 'bottom-5 sm:bottom-8'}`}>
                        <span className="rounded-md px-3 py-1.5 font-semibold" style={{ backgroundColor: captionStyle.background ? 'rgba(0,0,0,0.65)' : 'transparent', color: captionStyle.color, fontSize: `${captionStyle.fontSize}px`, fontFamily: captionStyle.fontFamily }}>
                            {captionText}
                        </span>
                    </div>}
                    <button
                        onClick={togglePlayback}
                        className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#6757e8] shadow-lg transition-transform hover:scale-105"
                        aria-label={playing ? 'Pausar Vídeo' : 'Reproduzir vídeo'}
                    >
                        {playing ? (
                            <span className="flex gap-1">
                                <span className="h-4 w-1 rounded bg-[#6757e8]" />
                                <span className="h-4 w-1 rounded bg-[#6757e8]" />
                            </span>
                        ) : (
                            <Play size={20} fill="currentColor" />
                        )}
                    </button>
                    <span className="absolute bottom-3 right-3 rounded bg-black/45 px-1.5 py-0.5 font-mono text-[10px] text-white">
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                </div>
            ) : (
                <div className="flex aspect-video flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#dfe3eb] bg-[#fafbfc] p-6 text-center">
                    <div className="mb-3 flex size-14 items-center justify-center rounded-2xl bg-[#f0edff] text-[#6757e8]">
                        <Upload size={25} />
                    </div>
                    <h3 className="text-sm font-bold text-[#354052]">
                        Comece Adicionando um vídeo
                    </h3>
                    <p className="mt-1 max-w-xs text-xs leading-5 text-[#8a94a4]">
                        Envie um arquivo para gerar e editar suas legendas.
                    </p>
                    <button
                        onClick={onSelectFile}
                        className="mt-4 rounded-lg bg-[#6757e8] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#5747d5]"
                    >
                        Selecionar arquivo
                    </button>
                </div>
            )}

            {hasVideo && (
                <div className="mt-4 flex items-center gap-3">
                    <span className="font-mono text-[11px] text-[#8e98a7]">{formatTime(currentTime)}</span>
                    <input type="range" min="0" max={duration || 0} step="0.1" value={Math.min(currentTime, duration)} onChange={(event) => seekTo(Number(event.target.value))} aria-label="Posição da reprodução" className="h-1.5 flex-1 accent-[#6757e8]" />
                    <span className="font-mono text-[11px] text-[#8e98a7]">{formatTime(duration)}</span>
                </div>
            )}

            {hasVideo && (
                <div className="mt-5 grid grid-cols-3 gap-2 border-t border-[#edf0f4] pt-4 sm:grid-cols-6">
                    <button onClick={togglePlayback} className="flex flex-col items-center gap-1 rounded-lg py-2 text-[#6f7a8c] hover:bg-[#f5f6f9]">
                        <Play size={16} />
                        <span className="text-[10px]">Reproduzir</span>
                    </button>
                    <button onClick={() => setCaptionsVisible((visible) => !visible)} aria-pressed={captionsVisible} className="flex flex-col items-center gap-1 rounded-lg py-2 text-[#6f7a8c] hover:bg-[#f5f6f9]">
                        <Subtitles size={16} />
                        <span className="text-[10px]">Legendas</span>
                    </button>
                    <button onClick={() => onToolAction('translate')} className="flex flex-col items-center gap-1 rounded-lg py-2 text-[#6f7a8c] hover:bg-[#f5f6f9]">
                        <Languages size={16} />
                        <span className="text-[10px]">Traduzir</span>
                    </button>
                    <button onClick={() => onToolAction('burn-in')} className="hidden flex-col items-center gap-1 rounded-lg py-2 text-[#6f7a8c] hover:bg-[#f5f6f9] sm:flex">
                        <Film size={16} />
                        <span className="text-[10px]">Burn-in</span>
                    </button>
                    <button onClick={() => onToolAction('share')} className="hidden flex-col items-center gap-1 rounded-lg py-2 text-[#6f7a8c] hover:bg-[#f5f6f9] sm:flex">
                        <Link2 size={16} />
                        <span className="text-[10px]">Link</span>
                    </button>
                    <button onClick={() => onToolAction('more')} className="flex flex-col items-center gap-1 rounded-lg py-2 text-[#6f7a8c] hover:bg-[#f5f6f9]">
                        <MoreHorizontal size={16} />
                        <span className="text-[10px]">Mais</span>
                    </button>
                </div>
            )}
        </section>
    )
}