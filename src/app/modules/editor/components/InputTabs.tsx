import { FC } from 'react';

interface InputTabsProps {
    activeTab: 'editor' | 'upload';
    onTabChange: (tab: 'editor' | 'upload') => void;
}

const InputTabs: FC<InputTabsProps> = ({ activeTab, onTabChange }) => {
    return (
        <div className="input-tabs">
            <button
                className={`tab-button ${activeTab === 'editor' ? 'active' : ''}`}
                onClick={() => onTabChange('editor')}
            >
                <i className="bi bi-pencil-square"></i>
                <span>Write Markdown</span>
            </button>
            <button
                className={`tab-button ${activeTab === 'upload' ? 'active' : ''}`}
                onClick={() => onTabChange('upload')}
            >
                <i className="bi bi-cloud-upload"></i>
                <span>Upload Files</span>
            </button>

            <style>{`
                .input-tabs {
                    display: flex;
                    gap: 2px;
                    padding: 0 24px;
                    background: white;
                }

                .tab-button {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 20px;
                    border: none;
                    background: transparent;
                    color: #64748b;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    border-bottom: 2px solid transparent;
                    position: relative;
                }

                .tab-button:hover {
                    color: #3b82f6;
                    background: #f8f9fa;
                }

                .tab-button.active {
                    color: #3b82f6;
                    border-bottom-color: #3b82f6;
                }

                .tab-button i {
                    font-size: 16px;
                }

                /* Dark Mode */
                @media (prefers-color-scheme: dark) {
                    .input-tabs {
                        background: #1e293b;
                    }

                    .tab-button {
                        color: #94a3b8;
                    }

                    .tab-button:hover {
                        color: #60a5fa;
                        background: #334155;
                    }

                    .tab-button.active {
                        color: #60a5fa;
                        border-bottom-color: #60a5fa;
                    }
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .input-tabs {
                        padding: 0 16px;
                    }

                    .tab-button {
                        padding: 12px 16px;
                        font-size: 13px;
                    }

                    .tab-button span {
                        display: none;
                    }

                    .tab-button i {
                        font-size: 18px;
                    }
                }
            `}</style>
        </div>
    );
};

export default InputTabs;
