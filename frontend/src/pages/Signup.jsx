import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const Signup = () => {

    const [credentials, setCredentials] = useState({roll:"", name:"", email:"", password:"", contact:"", dept:""})

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
                <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register </h2>
            </div>


            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form id="studentForm" className="space-y-6" action="/register/student" method="POST">
                    <div>
                        <label htmlFor="roll" className="block text-sm font-medium leading-6 text-gray-900">Roll Number</label>
                        <div className="mt-2">
                            <input id="roll" name="roll" type="text" onChange={onchange} value={credentials.roll} autoComplete="roll" className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6" />
                        </div>

                    </div>

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                        <div className="mt-2">
                            <input id="name" name="name" type="text" onChange={onchange} value={credentials.name} autoComplete="name" className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6" />
                        </div>

                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email" onChange={onchange} value={credentials.email} autoComplete="email" className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6" />
                        </div>

                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" onChange={onchange} value={credentials.password} autoComplete="current-password" className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6" />
                        </div>

                    </div>

                    <div>
                        <label htmlFor="contact" className="block text-sm font-medium leading-6 text-gray-900">Contact</label>
                        <div className="mt-2">
                            <input id="contact" name="contact" type="text" onChange={onchange} value={credentials.contact} autoComplete="contact" className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6" />
                        </div>

                    </div>

                    <div>

                        <label htmlFor="dept" className="block text-sm font-medium leading-6 text-gray-900">Department</label>
                        <div className="mt-2">
                            <select name="dept" id="dept" onChange={onchange} className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6">
                                <option value="null">Choose a department</option>
                                <option value="CSE">Computer Science and Engineering</option>
                                <option value="ECE">Electronics and Communication Engineering</option>
                                <option value="EEE">Electrical and Electronics Engineering</option>
                                <option value="ME">Mechanical Engineering</option>
                                <option value="CE">Civil Engineering</option>
                                <option value="Physics">Physics</option>
                                <option value="Chemistry">Chemistry</option>
                                <option value="HSS">Humanities and Social Sciences</option>
                            </select>
                        </div>

                    </div>

                    <div>
                        <button type="submit" name="submit" onClick={handleSubmit} className="flex w-full justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">Register</button>
                    </div>
                </form>
                <p className="mt-10 text-center text-sm text-gray-500">
                    Already have an account?
                    <Link to="/login" className="font-semibold leading-6 text-teal-600 hover:text-teal-500">Login</Link>
                </p>
            </div>
        </div>
    )
}
