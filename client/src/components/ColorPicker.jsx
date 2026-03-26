import { Check, Palette } from "lucide-react";
import { useState } from "react";

const ColorPicker = ({selectedColor, onChange}) => {

    const color = [
        { name: 'Red', value: '#EF4444' },
        { name: 'Blue', value: '#3B82F6' },
        { name: 'Indigo', value: '#6366F1' },
        { name: 'Green', value: '#10B981' },
        { name: 'Yellow', value: '#F59E0B' },
        { name: 'Purple', value: '#8B5CF6' },
        { name: 'Pink', value: '#EC4899' },
        { name: 'Orange', value: '#F97316' },
        { name: 'Teal', value: '#14B8A6' },
        { name: 'Gray', value: '#6B7280' },
        { name: 'Black', value: '#000000' }
    ]

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 text-sm text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 ring-purple-300 hover:ring transition-all px-3 py-2 rounded-lg">
                <Palette size={16}/> <span className="max-sm:hidden">Accent</span>
            </button>

            {
                isOpen && (
                    <div className="grid grid-cols-4 w-60 gap-2 absolute top-full left-0 right-0 p-3 mt-2 z-10 bg-white rounded-md border border-gray-200 shadow-md">
                        {color.map((color) => (
                            <div 
                            key={color.value}
                            onClick={() => {onChange(color.value); setIsOpen(false);}}
                            className="relative cursor-pointer group flex flex-col rounded-full"
                            // style={{backgroundColor: color.value}}
                            >
                                <div 
                                className={`w-12 h-12 rounded-full border-2 border-transparent group-hover:border-black/25 transition-colors`}
                                style={{backgroundColor: color.value}}
                                ></div>
                                {selectedColor === color.value && (
                                        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                                            <Check className="text-white size-5"/>
                                        </div>
                                )}
                            </div>
                        ))}
                        <p className="text-xs text-center mt-1 text-gray-600">{color.name}</p>
                    </div>
                )
            }
        </div>
    );
};

export default ColorPicker;