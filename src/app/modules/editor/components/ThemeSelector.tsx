import { FC, useState, useRef, useEffect } from 'react';
import { themes } from '../../../../themes/themeConfig';

interface ThemeSelectorProps {
    selectedTheme: string;
    onThemeChange: (themeId: string) => void;
}

const ThemeSelector: FC<ThemeSelectorProps> = ({ selectedTheme, onThemeChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const themeList = Object.values(themes);
    const currentTheme = themes[selectedTheme];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleThemeSelect = (themeId: string) => {
        onThemeChange(themeId);
        setIsOpen(false);
    };

    return (
        <div className="theme-selector-dropdown" ref={dropdownRef}>
            <button
                className="btn-theme-toggle"
                onClick={() => setIsOpen(!isOpen)}
                title="Select Theme"
                type="button"
            >
                <i className="bi bi-palette"></i>
                <span className="theme-name">{currentTheme.name}</span>
                <i className={`bi bi-chevron-${isOpen ? 'up' : 'down'}`}></i>
            </button>

            {isOpen && (
                <div className="theme-dropdown-menu">
                    <div className="theme-dropdown-header">PDF Theme</div>
                    <div className="theme-dropdown-list">
                    {themeList.map((theme) => (
                        <div
                            key={theme.id}
                            className={`theme-option ${selectedTheme === theme.id ? 'active' : ''}`}
                            onClick={() => handleThemeSelect(theme.id)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    handleThemeSelect(theme.id);
                                }
                            }}
                        >
                            <div
                                className="theme-swatch"
                                aria-hidden="true"
                            >
                                <div
                                    className="theme-swatch-page"
                                    style={{ backgroundColor: theme.colors.background }}
                                >
                                    <span
                                        className="theme-swatch-bar"
                                        style={{ backgroundColor: theme.colors.primary }}
                                    />
                                    <span
                                        className="theme-swatch-heading"
                                        style={{ backgroundColor: theme.colors.headings }}
                                    />
                                    <span
                                        className="theme-swatch-accent"
                                        style={{ backgroundColor: theme.colors.accent }}
                                    />
                                </div>
                            </div>
                            <div className="theme-info">
                                <div className="theme-option-name">{theme.name}</div>
                                <div className="theme-option-desc">{theme.description}</div>
                            </div>
                            {selectedTheme === theme.id && (
                                <i className="bi bi-check-lg theme-check"></i>
                            )}
                        </div>
                    ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ThemeSelector;
