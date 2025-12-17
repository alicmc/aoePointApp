import './App.css';
import { HashRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';


function App() {

    return (
        <>
            <HashRouter>
                <Routes>
                    <Route path = "/" element = {<Login/>} />

                    <Route path = "/home" element = {<Home/>} />
                </Routes>
            </HashRouter>
        </>
    )
}

export default App;