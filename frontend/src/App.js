import './App.scss';
import {RouterProvider, createBrowserRouter, Outlet, Navigate} from "react-router-dom";
import { Home } from './pages/Home'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { useContext } from 'react';
import { AuthContext } from './context/authContext';

function App() {

    const {user} = useContext(AuthContext)
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
    const ProtectedRoute = ({ children }) => {
        if (!user) {
            alert('Please Login First!')
          return <Navigate to="/login" />;
        }
        return children;
      };


    const router = createBrowserRouter([
        {
            path: "/",
            element: (

                    <Layout/>
            ),
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
                {
                    path: "/dashboard",
                element: <ProtectedRoute><Dashboard/></ProtectedRoute>
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
