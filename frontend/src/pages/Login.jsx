import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const Login = () => {
    
    const [credentials, setCredentials] = useState({roll:"", password:""})

    const handleSubmit = () =>{
        console.log('submitted')
    }


    const onchange = (e) =>{
        e.preventDefault()
        setCredentials({...credentials, [e.target.name] : e.target.value})
        console.log(credentials)
    }

    return (


        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=teal&shade=600" alt="Your Company" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                <form id="studentForm" className="space-y-6" action="/login/student" method="POST">
                    <div>
                        <label htmlFor="roll" className="block text-sm font-medium leading-6 text-gray-900">Roll Number</label>
                        <div className="mt-2">
                            <input id="roll" name="roll" type="text" onChange={onchange} value={credentials.roll} className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6" />
                        </div>

                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            <div className="text-sm">
                                <Link to="/" className="font-semibold text-teal-600 hover:text-teal-500">Forgot password?</Link>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" onChange={onchange} value={credentials.password}  autoComplete="current-password" className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6" />
                        </div>

                    </div>

                    <div>
                        <button type="submit" name='submit' onClick={handleSubmit} className="flex w-full justify-center rounded-md bg-teal-600 py-1.5 px-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">Sign in</button>
                    </div>
                </form>

                <p className="mt-4 text-center text-sm text-gray-500">
                    Don't have an account?
                    <Link to="/" className="font-semibold leading-6 text-teal-600 hover:text-teal-500">Register now</Link>
                </p>
            </div>
        </div>


    )
}
