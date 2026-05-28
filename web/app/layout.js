import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import BottomNav from '@/components/BottomNav'

export const metadata = {
  title: 'PixelQuest',
  description: '學習解鎖你的圖片',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body className="bg-game-bg min-h-screen pb-20">
        <ThemeProvider>
          <main className="max-w-lg mx-auto px-4 pt-6">
            {children}
          </main>
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  )
}
