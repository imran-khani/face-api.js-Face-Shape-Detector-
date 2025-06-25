import React from 'react'

const Loading = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center space-y-8">
        
        {/* Main Loading Animation */}
        <div className="relative">
          {/* Outer Ring */}
          <div className="w-24 h-24 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform -translate-x-3 -translate-y-3"></div>
          </div>
          
          {/* Inner Ring */}
          <div className="absolute inset-2 w-16 h-16 border-3 border-purple-200 dark:border-purple-800 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}>
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transform translate-x-2 translate-y-2"></div>
          </div>
          
          {/* Center Face Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
              <svg 
                className="w-5 h-5 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Loading Text with Animation */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Face Shape Detector
          </h2>
          
          {/* Animated Loading Text */}
          <div className="flex items-center justify-center space-x-1">
            <span className="text-lg text-muted-foreground">Loading</span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
          
          {/* Progress Indicator */}
          <div className="w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse"></div>
          </div>
          
          <p className="text-sm text-muted-foreground max-w-xs">
            Preparing AI-powered face analysis tools...
          </p>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200/20 dark:bg-blue-800/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-200/20 dark:bg-purple-800/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-pink-200/20 dark:bg-pink-800/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
    </div>
  )
}

export default Loading