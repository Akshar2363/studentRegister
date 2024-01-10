import './App.scss';
import {RouterProvider, createBrowserRouter, Outlet} from "react-router-dom";
import { Home } from './pages/Home'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

function App() {

    const Layout = () => {
        return (
            <>
                <div className="min-h-[80vh] ">
                    <Navbar/>
                    <div className="">
                        <Outlet/>
                    </div>
                </div>
                <Footer/>
            </>
        );
    };

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <Layout/>),
            children: [
                {
                    path: "/",
                    element: <Home/>
                },
                {
                    path: "/login",
                    element: <Login/>
                },
                {
                    path: "/signup",
                    element: <Signup/>
                },
            ]
        },
        
        // {
        //     path: "/signup",
        //     element: <Signup/>
        // },
        // {
        //     path: "*",
        //     element: <NotFound/>
        // },
    ])

    return (
        <div className="App">
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;
