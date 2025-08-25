import { memo, type JSX } from "react";

/**
 * Full-screen animated loading screen for grocery delivery admin dashboard.
 */
const FullScreenLoader = (): JSX.Element => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900/20 transition-colors duration-300">
      {/* Background Pattern - Shopping Grid */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.3),rgba(255,255,255,0))]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(34,197,94,0.1)_50%,transparent_75%)] bg-[length:40px_40px] animate-pulse"></div>
      </div>

      {/* Main Loading Container */}
      <div className="relative flex flex-col items-center space-y-8">
        {/* Animated Shopping Cart with Delivery Theme */}
        <div className="relative">
          {/* Delivery truck path - rotating ring */}
          <div className="w-28 h-28 rounded-full border-4 border-transparent bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 animate-spin shadow-2xl">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900/20 m-1"></div>
          </div>

          {/* Central Shopping Cart Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg flex items-center justify-center animate-pulse">
              {/* Shopping Cart SVG */}
              <svg
                className="w-8 h-8 text-white animate-bounce"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.44C5.04 14.29 5 14.63 5 15c0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25L7.6 14h7.15c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </div>
          </div>

          {/* Floating Grocery Items */}
          <div
            className="absolute -top-3 -left-3 w-4 h-4 bg-red-400 rounded-full animate-bounce flex items-center justify-center text-xs"
            style={{ animationDelay: "0s" }}
          >
            🍎
          </div>
          <div
            className="absolute -top-3 -right-3 w-4 h-4 bg-orange-400 rounded-full animate-bounce flex items-center justify-center text-xs"
            style={{ animationDelay: "0.5s" }}
          >
            🥕
          </div>
          <div
            className="absolute -bottom-3 -left-3 w-4 h-4 bg-yellow-400 rounded-full animate-bounce flex items-center justify-center text-xs"
            style={{ animationDelay: "1s" }}
          >
            🍌
          </div>
          <div
            className="absolute -bottom-3 -right-3 w-4 h-4 bg-purple-400 rounded-full animate-bounce flex items-center justify-center text-xs"
            style={{ animationDelay: "1.5s" }}
          >
            🍇
          </div>

          {/* Delivery truck animation */}
          <div className="absolute -right-12 top-1/2 transform -translate-y-1/2">
            <div
              className="text-2xl animate-bounce"
              style={{ animationDelay: "0.3s" }}
            >
              🚚
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-700 via-emerald-600 to-green-700 dark:from-green-300 dark:via-emerald-200 dark:to-green-300 bg-clip-text text-transparent animate-pulse">
            Loading...
          </h2>

          {/* Animated dots with grocery theme colors */}
          <div className="flex justify-center space-x-1">
            <div
              className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-green-600 rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>

        {/* Progress Bar with Delivery Theme */}
        <div className="w-80 space-y-3">
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
            <div className="h-full bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 rounded-full animate-[delivery_3s_ease-in-out_infinite] shadow-sm"></div>
          </div>

          {/* Delivery status indicators */}
          <div className="flex justify-between text-xs text-green-600 dark:text-green-400 font-medium">
            <span className="flex items-center space-x-1 animate-pulse">
              <span>📦</span>
              <span>Preparing</span>
            </span>
            <span
              className="flex items-center space-x-1 animate-pulse"
              style={{ animationDelay: "1s" }}
            >
              <span>🚚</span>
              <span>Loading</span>
            </span>
            <span
              className="flex items-center space-x-1 animate-pulse"
              style={{ animationDelay: "2s" }}
            >
              <span>✅</span>
              <span>Ready</span>
            </span>
          </div>
        </div>
      </div>

      {/* Ambient glow effects with grocery theme colors */}
      <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1.5s" }}
      ></div>
      <div
        className="absolute top-1/3 right-1/3 w-32 h-32 bg-green-400/20 rounded-full blur-2xl animate-pulse"
        style={{ animationDelay: "3s" }}
      ></div>

      {/* Floating grocery icons background */}
      <div
        className="absolute top-20 left-20 text-4xl opacity-10 animate-bounce"
        style={{ animationDelay: "2s" }}
      >
        🥬
      </div>
      <div
        className="absolute top-32 right-32 text-3xl opacity-10 animate-bounce"
        style={{ animationDelay: "4s" }}
      >
        🍞
      </div>
      <div
        className="absolute bottom-32 left-32 text-3xl opacity-10 animate-bounce"
        style={{ animationDelay: "6s" }}
      >
        🥛
      </div>
      <div
        className="absolute bottom-20 right-20 text-4xl opacity-10 animate-bounce"
        style={{ animationDelay: "8s" }}
      >
        🧀
      </div>

      <style>{`
        @keyframes delivery {
          0% { 
            transform: scaleX(0) translateX(-100%);
            box-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
          }
          25% { 
            transform: scaleX(0.3) translateX(-50%);
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.7);
          }
          50% { 
            transform: scaleX(0.6) translateX(0%);
            box-shadow: 0 0 30px rgba(34, 197, 94, 0.9);
          }
          75% { 
            transform: scaleX(0.8) translateX(50%);
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.7);
          }
          100% { 
            transform: scaleX(1) translateX(100%);
            box-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
          }
        }
      `}</style>
    </div>
  );
};

export default memo(FullScreenLoader);
