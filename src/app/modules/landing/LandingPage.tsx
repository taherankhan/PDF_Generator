import { FC } from "react";
import { useNavigate } from "react-router-dom";
import './LandingPage.css';

const LandingPage: FC = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-page-bg">
            <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 80px)', position: 'relative', zIndex: 1, padding: '40px 20px' }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-12 col-xl-12">
                            {/* Main Card */}
                            <div className="professional-card smooth-fade-in">
                                <div className="card-body p-lg-8 p-5">
                                    {/* Features Grid */}
                                    <div className="row g-4 mb-7">
                                        {/* Feature 1 */}
                                        <div className="col-md-4">
                                            <div className="feature-card smooth-fade-in" style={{ animationDelay: '0.1s' }}>
                                                <div className="card-body p-5 text-center">
                                                    <div className="icon-container icon-blue mb-4">
                                                        <i className="bi bi-pencil-square fs-1 text-white"></i>
                                                    </div>
                                                    <h5 className="text-primary-dark mb-3">
                                                        Live Markdown Editor
                                                    </h5>
                                                    <p className="text-secondary">
                                                        Write markdown with syntax highlighting and instant formatting
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Feature 2 */}
                                        <div className="col-md-4">
                                            <div className="feature-card smooth-fade-in" style={{ animationDelay: '0.2s' }}>
                                                <div className="card-body p-5 text-center">
                                                    <div className="icon-container icon-green mb-4">
                                                        <i className="bi bi-eye fs-1 text-white"></i>
                                                    </div>
                                                    <h5 className="text-primary-dark mb-3">
                                                        Real-time Preview
                                                    </h5>
                                                    <p className="text-secondary">
                                                        See your formatted document as you type with live preview
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Feature 3 */}
                                        <div className="col-md-4">
                                            <div className="feature-card smooth-fade-in" style={{ animationDelay: '0.3s' }}>
                                                <div className="card-body p-5 text-center">
                                                    <div className="icon-container icon-orange mb-4">
                                                        <i className="bi bi-file-earmark-pdf fs-1 text-white"></i>
                                                    </div>
                                                    <h5 className="text-primary-dark mb-3">
                                                        PDF Export with Themes
                                                    </h5>
                                                    <p className="text-secondary">
                                                        Export to PDF with 5 beautiful themes for professional results
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* CTA Button */}
                                    <div className="text-center mb-6">
                                        <button
                                            className="btn btn-professional smooth-fade-in"
                                            style={{ animationDelay: '0.4s' }}
                                            onClick={() => navigate('/editor')}
                                        >
                                            <i className="bi bi-rocket-takeoff fs-4 me-2 text-warning"></i>
                                            Get Started Now
                                        </button>
                                    </div>

                                    {/* Additional Info */}
                                    <div className="d-flex align-items-center justify-content-center gap-3 flex-wrap smooth-fade-in" style={{ animationDelay: '0.5s' }}>
                                        <div className="info-badge">
                                            <i className="bi bi-check-circle-fill text-success"></i>
                                            <span>No signup required</span>
                                        </div>
                                        <div className="info-badge">
                                            <i className="bi bi-shield-check text-success"></i>
                                            <span>100% client-side</span>
                                        </div>
                                        <div className="info-badge">
                                            <i className="bi bi-lightning-charge-fill text-warning"></i>
                                            <span>Instant conversion</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
