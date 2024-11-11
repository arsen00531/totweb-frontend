import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './index.css'

createRoot(document.getElementById('root')!).render(
    <App />
)
