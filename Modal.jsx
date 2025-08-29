import React from 'react';
import { X } from 'lucide-react';
  
const Modal = ({ isOpen, title, content, onClose, DANDLE_COLORS }) => {
    if (!isOpen) return null;
  
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">  
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-auto">  
                <div className="flex justify-between items-center mb-4">  
                    <h3 className="text-xl font-bold">{title}</h3>  
                    <button onClick={onClose}><X size={24} /></button>  
                </div>  
                <div className="text-sm">{content}</div>  
                <button onClick={onClose} className="mt-4 px-4 py-2 text-white rounded-lg" style={{ background: DANDLE_COLORS.primary }}>Close</button>  
            </div>  
        </div>  
    );  
};  
  
export default Modal;

