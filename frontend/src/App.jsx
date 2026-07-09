import Home from "./pages/Home"
import Header from "./components/Header"


export default function App() {
    return (
        <div className="min-h-screen bg-slate-50">
            <Header />
            <Home />
        </div>
    );
}