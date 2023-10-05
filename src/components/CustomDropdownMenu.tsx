import React, { useState, useEffect } from 'react';
import './styles/dropdownMenu.scss';

type DropdownProps = {
  modes: string[];
  onMenuOption: (mode: string) => void;
};

export function DropdownMenu({ modes, onMenuOption }: DropdownProps) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState('');

  const closeDropdownOnOutsideClick = () => setDropdownOpen(false);

  useEffect(() => {
    document.body.addEventListener('click', closeDropdownOnOutsideClick);
    return function cleanup() {
      document.body.removeEventListener('click', closeDropdownOnOutsideClick);
    };
  }, []);

  function handleDropdownClick(e: React.MouseEvent) {
    setDropdownOpen(!isDropdownOpen);
    e.stopPropagation();
  }

  function handleOptionSelection(mode: string) {
    setSelectedMode(mode);
    onMenuOption(mode);
    setDropdownOpen(false);
  }

  return (
    <div className='dropdownMenu'>
      <button className='dropdownMenu__toggle' onClick={handleDropdownClick}>
        {selectedMode || 'Select a mode'}
      </button>
      {isDropdownOpen && (
        <ul className='dropdownMenu__options'>
          {modes.map((mode) => (
            <li key={mode} onClick={() => handleOptionSelection(mode)}>
              {mode}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
