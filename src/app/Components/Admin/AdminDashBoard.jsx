"use client";
import { useState } from 'react';
import ManageBooks from './ManageBooks';
import HandleRequest from './HandleRequest';
import Link from 'next/link';
import LogOut from '../Student/LogOut';



export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('');

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <nav className="shadow p-8 bg-gradient-to-r from-blue-500 to-purple-500 flex justify-between items-center">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
      
      <LogOut />

      </nav>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'block' : 'hidden'} md:block bg-white w-64 p-4 shadow-md`}>
          <ul className="space-y-4">
            <li>
              <Link href="#" 
                 className="block p-2 rounded shadow-xl bg-gradient-to-r from-blue-500 to-purple-500 text-center hover:scale-105 hover:shadow-lg text-white font-bold"
                 onClick={() => setActiveTab('Books')} >Books</Link>
            </li>
            <li>
              <Link href="#" 
              className="block p-2 rounded shadow-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 hover:shadow-lg text-center text-white font-bold"
              onClick={() => setActiveTab('Requests')}>Requests</Link>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="px-2 w-auto flex-1 p-6">
        <h2 className="text-xl font-semibold mb-4">Welcome Admin </h2>
          <h1 className='text-xl font-semibold lg:hidden mb-4'> Please Select From Side Bar</h1>

          {/* Conditional Rendering based on Active Tab */}
          {activeTab === 'Books' && <ManageBooks />}
          {activeTab === 'Requests' && <HandleRequest />}
        </main>
      </div>
    </div>
  );
}
