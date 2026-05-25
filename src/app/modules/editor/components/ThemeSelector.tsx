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

    // Close dropdown when clicking outside
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
            >
                <i className="bi bi-palette"></i>
                <span className="theme-name">{currentTheme.name}</span>
                <i className={`bi bi-chevron-${isOpen ? 'up' : 'down'} ms-1`}></i>
            </button>

            {isOpen && (
                <div className="theme-dropdown-menu">
                    {themeList.map((theme) => (
                        <div
                            key={theme.id}
                            className={`theme-option ${selectedTheme === theme.id ? 'active' : ''}`}
                            onClick={() => handleThemeSelect(theme.id)}
                        >
                            <div className="theme-preview">
                                <div
                                    className="theme-color primary"
                                    style={{ backgroundColor: theme.colors.primary }}
                                />
                                <div
                                    className="theme-color accent"
                                    style={{ backgroundColor: theme.colors.accent }}
                                />
                            </div>
                            <div className="theme-info">
                                <div className="theme-option-name">{theme.name}</div>
                            </div>
                            {selectedTheme === theme.id && (
                                <i className="bi bi-check-circle-fill theme-check"></i>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <style>{`
                .theme-selector-dropdown {
                    position: relative;
                }

                .btn-theme-toggle {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    height: 40px;
                    padding: 0 16px;
                    border-radius: 10px;
                    border: 1px solid #e2e8f0;
                    background: white;
                    color: #475569;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .btn-theme-toggle:hover {
                    background: #f8fafc;
                    border-color: #cbd5e1;
                    color: #0f172a;
                    transform: translateY(-1px);
                }

                .btn-theme-toggle:active {
                    transform: translateY(0) scale(0.98);
                }

                .theme-name {
                    font-weight: 500;
                }

                .theme-dropdown-menu {
                    position: absolute;
                    top: calc(100% + 8px);
                    left: 0;
                    min-width: 240px;
                    max-height: 280px;
                    overflow-y: auto;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 10px;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                    z-index: 1000;
                    padding: 6px;
                }

                .theme-option {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 8px 12px;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.15s ease;
                }

                .theme-option:hover {
                    background: #f1f5f9;
                }

                .theme-option.active {
                    background: #eff6ff;
                }

                .theme-preview {
                    display: flex;
                    gap: 3px;
                    flex-shrink: 0;
                }

                .theme-color {
                    width: 20px;
                    height: 20px;
                    border-radius: 4px;
                    border: 2px solid white;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                }

                .theme-info {
                    flex: 1;
                }

                .theme-option-name {
                    font-size: 14px;
                    font-weight: 500;
                    color: #0f172a;
                }

                .theme-check {
                    color: #3b82f6;
                    font-size: 16px;
                    flex-shrink: 0;
                }

                /* Dark Mode */
                @media (prefers-color-scheme: dark) {
                    .btn-theme-toggle {
                        background: #1e293b;
                        border-color: #334155;
                        color: #94a3b8;
                    }

                    .btn-theme-toggle:hover {
                        background: #334155;
                        border-color: #475569;
                        color: #f1f5f9;
                    }

                    .theme-dropdown-menu {
                        background: #1e293b;
                        border-color: #334155;
                        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
                    }

                    .theme-option:hover {
                        background: #334155;
                    }

                    .theme-option.active {
                        background: rgba(59, 130, 246, 0.15);
                    }

                    .theme-option-name {
                        color: #f1f5f9;
                    }

                    .theme-check {
                        color: #60a5fa;
                    }
                }
            `}</style>
        </div>
    );
};

export default ThemeSelector;
