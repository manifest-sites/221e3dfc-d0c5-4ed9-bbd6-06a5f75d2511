import { useState } from 'react'
import { Button, Card, Typography } from 'antd'
import manifestConfig from '../../../manifest.config.json'

const { Title, Text } = Typography

function LoginRequired() {
    const [isLoading, setIsLoading] = useState(false)
    const openGoogleLoginInPopup = window.location.href.includes('dev.madewithmanifest.com')

    const handleGoogleLogin = () => {
        setIsLoading(true)
        
        if (openGoogleLoginInPopup) {
            // Create the callback URL - use current URL structure to maintain path when in iframe
            const currentUrl = window.location.href
            const callbackUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/') + 1) + 'auth-callback.html'
            const authUrl = `https://db.madewithmanifest.com/auth/google?appId=${manifestConfig.appId}&redirectUrl=${encodeURIComponent(callbackUrl)}`
            
            const popup = window.open(
                authUrl,
                'googleLogin',
                'width=500,height=600,scrollbars=yes,resizable=yes,top=' + (window.screenY + 100) + ',left=' + (window.screenX + 100)
            )
            
            // Listen for messages from popup
            const handleMessage = (event) => {
                if (event.origin !== window.location.origin) return
                
                if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
                    // Authentication successful, refresh the page
                    window.location.reload()
                } else if (event.data.type === 'GOOGLE_AUTH_ERROR') {
                    // Handle authentication error
                    setIsLoading(false)
                    popup.close()
                    window.removeEventListener('message', handleMessage)
                }
            }
            
            window.addEventListener('message', handleMessage)
            
            // Fallback: if popup is closed manually, clean up listener
            const checkClosed = setInterval(() => {
                if (popup.closed) {
                    clearInterval(checkClosed)
                    window.removeEventListener('message', handleMessage)
                    setIsLoading(false)
                }
            }, 1000)
        } else {
            const currentUrl = encodeURIComponent(window.location.href)
            window.location.href = `https://db.madewithmanifest.com/auth/google?appId=${manifestConfig.appId}&redirectUrl=${currentUrl}`
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-sm">
                <Card className="shadow-lg border-0">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl text-white font-bold">🧮</span>
                        </div>
                        <Title level={2} className="!mb-2 text-gray-900">
                            Calculator App
                        </Title>
                        <Text className="text-gray-600">
                            Sign in to access your calculator
                        </Text>
                    </div>
                    
                    <Button 
                        type="primary" 
                        size="large" 
                        block 
                        onClick={handleGoogleLogin}
                        loading={isLoading}
                        className="!h-12 !bg-white !text-gray-700 !border-gray-300 hover:!bg-gray-50 hover:!border-gray-400 shadow-sm"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px'
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        {isLoading ? 'Signing in...' : 'Continue with Google'}
                    </Button>

                    <div className="mt-6 text-center">
                        <Text className="text-xs text-gray-500">
                            By signing in, you agree to our terms of service
                        </Text>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default LoginRequired