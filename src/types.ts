export type Caption = {
    time: string
    text: string
}

export type CaptionStyle = {
    fontFamily: string
    fontSize: number
    color: string
    position: 'top' | 'center' | 'bottom'
    background: boolean
}

export const defaultCaptionStyle: CaptionStyle = {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#ffffff',
    position: 'bottom',
    background: true,
}