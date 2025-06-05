import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import { Navigation } from '@/components/layout/Navigation'
import { Toaster } from '@/components/ui/toaster'
import { QueryProvider } from '@/providers/QueryProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AniStream - Your Anime Streaming Destination',
  description: 'Discover and watch your favorite anime series with high-quality streaming, personalized recommendations, and an amazing community.',
  keywords: 'anime, streaming, watch anime, manga, otaku, japanese animation',
  authors: [{ name: 'AniStream Team' }],
  openGraph: {
    title: 'AniStream - Your Anime Streaming Destination',
    description: 'Discover and watch your favorite anime series with high-quality streaming.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AniStream - Your Anime Streaming Destination',
    description: 'Discover and watch your favorite anime series with high-quality streaming.',
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        <QueryProvider>
          <AuthProvider>
            <div className="relative min-h-screen bg-background">
              {/* Background Effects */}
              <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20 pointer-events-none" />
              <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/20 to-slate-900/20 pointer-events-none" />
              
              {/* Main Content */}
              <div className="relative z-10">
                <Navigation />
                <main className="pt-16">
                  {children}
                </main>
                
                {/* Footer */}
                <footer className="border-t border-white/10 bg-background/50 backdrop-blur-sm mt-20">
                  <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-primary to-orange-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">A</span>
                          </div>
                          <span className="text-xl font-bold text-gradient">AniStream</span>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          Your ultimate destination for streaming the best anime content with premium quality and unlimited access.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-4">Browse</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li><a href="/trending" className="hover:text-primary transition-colors">Trending</a></li>
                          <li><a href="/recent" className="hover:text-primary transition-colors">New Releases</a></li>
                          <li><a href="/top-rated" className="hover:text-primary transition-colors">Top Rated</a></li>
                          <li><a href="/genres" className="hover:text-primary transition-colors">Genres</a></li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-4">Support</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li><a href="/help" className="hover:text-primary transition-colors">Help Center</a></li>
                          <li><a href="/contact" className="hover:text-primary transition-colors">Contact Us</a></li>
                          <li><a href="/feedback" className="hover:text-primary transition-colors">Feedback</a></li>
                          <li><a href="/status" className="hover:text-primary transition-colors">System Status</a></li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li><a href="/terms" className="hover:text-primary transition-colors">Terms of Service</a></li>
                          <li><a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                          <li><a href="/dmca" className="hover:text-primary transition-colors">DMCA</a></li>
                          <li><a href="/cookies" className="hover:text-primary transition-colors">Cookie Policy</a></li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-muted-foreground">
                      <p>&copy; 2025 AniStream. All rights reserved. Built with Next.js and Supabase.</p>
                    </div>
                  </div>
                </footer>
              </div>
            </div>
            <Toaster />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
