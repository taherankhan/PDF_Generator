import { FC } from 'react';
import { USE_CASES } from '../landingData';
import { UseCaseVisual } from '../components/UseCaseMicroVisuals';

const UseCasesSection: FC = () => (
  <section id="lp-usecases" className="lp-section">
    <div className="lp-usecases-section-inner">
      <div className="lp-usecases-header-col lp-reveal lp-reveal--sticky">
        <div className="lp-section-label">Use Cases</div>
        <h2 className="lp-section-title">Built for Real-World<br />Workflows</h2>
        <p className="lp-section-desc">
          Whether you&apos;re a developer, student, or business professional — PDF Generator fits
          right into your workflow.
        </p>
      </div>

      <div className="lp-usecases-grid-new">
        {USE_CASES.map((uc, i) => (
          <article
            key={uc.title}
            className={`lp-usecase-card-new lp-reveal lp-reveal-delay-${(i % 4) + 1}`}
          >
            <div className="lp-usecase-card-header">
              <div className={`lp-usecase-icon-new ${uc.cls}`}>{uc.icon}</div>
              <span className="lp-usecase-num-new">{uc.num}</span>
            </div>
            <div className="lp-usecase-card-body">
              <h3 className="lp-usecase-title-new">{uc.title}</h3>
              <p className="lp-usecase-desc-new">{uc.desc}</p>
            </div>
            <div className="lp-uc-visual-container">
              <UseCaseVisual num={uc.num} />
            </div>
            <div className="lp-usecase-card-footer">
              <span className="lp-usecase-tag-new">{uc.tag}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default UseCasesSection;
