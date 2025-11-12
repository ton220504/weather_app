import React from 'react'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const ButtonMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <div>
            {/* Menu góc trái */}
            <button
                onClick={toggleMenu}
                className='fixed top-4 left-4 z-50 bg-white/20 hover:bg-white/30 text-white p-2 rounded-xl backdrop-blur-md transition-all duration-300'
            >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>


            {/* Overlay làm mờ khi mở menu */}
            {isMenuOpen && (
                <div
                    onClick={closeMenu}
                    className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity'
                ></div>
            )}

            {/* Side menu */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white/90 backdrop-blur-xl shadow-lg z-50 transform transition-transform duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Menu</h2>
                    <ul className="space-y-3 text-gray-700 font-medium">
                        <li className="hover:text-blue-500 cursor-pointer">🏠 Trang chủ</li>
                        <li className="hover:text-blue-500 cursor-pointer">🌦️ Thời tiết</li>
                        <li className="hover:text-blue-500 cursor-pointer">📍 Địa điểm</li>
                        <li className="hover:text-blue-500 cursor-pointer">⚙️ Cài đặt</li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default ButtonMenu