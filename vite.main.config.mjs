import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
    build: {
        "extraFiles": ["src/server/Application.jar"]
    }
});
