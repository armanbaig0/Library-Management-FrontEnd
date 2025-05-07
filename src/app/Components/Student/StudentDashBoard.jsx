"use client";
import { useState } from 'react';
import AvailableBooks from './AvailableBooks';
import Notifications from './Notifications';
import Link from 'next/link';
import LogOut from './LogOut';


export default function StudentDashBoard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('');

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <nav className=" shadow p-8 bg-gradient-to-r from-blue-500 to-purple-500 flex justify-between items-center">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-white ">Student Dashboard</h1>

        <LogOut />
      </nav>

      <div className="flex flex-1 ">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'block' : 'hidden'} md:block bg-white w-64 p-4 shadow-md`}>
          <ul className="space-y-4">
            <li>
              <Link href="#" 
                 className="block p-2 rounded shadow-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 hover:shadow-lg text-center text-white font-bold"
                 onClick={() => setActiveTab('Available Books')}>Available Books</Link>
            </li>
             <li>
              <a href="#" 
              className="block p-2 rounded shadow-xl text-center bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold hover:scale-105 hover:shadow-lg"
              onClick={() => setActiveTab('Notifications')}>Notifications</a>
            </li> 
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
        <h2 className="text-xl font-semibold mb-4">Welcome Student </h2>
          <h1 className='text-xl font-semibold lg:hidden mb-4'> Please Select From Side Bar</h1>

          {/* Conditional Rendering based on Active Tab */}
          {activeTab === 'Available Books' && <AvailableBooks />}
          {activeTab === 'Notifications' && <Notifications />}
          
          {/* {activeTab === 'Make a Request' && <MakeRequest />} */}
        </main>
      </div>
    </div>
  );
}
