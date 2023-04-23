import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 싱글 파일 컴포넌트에서 최상위 컴포넌트 앱을 가져옵니다.
const app = createApp(App)

app.use(router)

app.mount('#app')
