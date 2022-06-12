import { Outlet } from "react-router-dom";
import './layout.css'
export function Layout(){
    return(
        <>
            <nav>
                <h1>Mina notes</h1>
            </nav>
            <main>
                <Outlet></Outlet>
            </main>
        </>
    )
}