import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const plugins: import('vite').PluginOption[] = []

  if (command === 'serve') {
    plugins.push(
      react({
        // @ts-expect-error - Babel options mismatch with local @vitejs/plugin-react types during build analysis
        babel: {
          plugins: [
            ['babel-plugin-react-compiler', {}],
          ],
        },
      })
    )
  } else {
    plugins.push(react())
  }

  return {
    plugins,
    // 💡 Add this build block explicitly to fix the Vercel 404 routing
    build: {
      outDir: 'dist',
    },
    server: {
      host: '0.0.0.0',
      port: 5173,
    }
  }
})