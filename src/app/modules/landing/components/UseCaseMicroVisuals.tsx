import { FC } from 'react';

export const ResumeMicroVisual: FC = () => (
  <div className="lp-uc-resume">
    <div className="lp-uc-resume-header">
      <div className="lp-uc-resume-avatar" />
      <div className="lp-uc-resume-header-text">
        <div className="lp-uc-resume-line lp-uc-w-50" />
        <div className="lp-uc-resume-line lp-uc-w-30" />
      </div>
    </div>
    <div className="lp-uc-resume-body">
      <div className="lp-uc-resume-row">
        <div className="lp-uc-resume-line lp-uc-w-80" />
        <span className="lp-uc-check-indicator">✓</span>
      </div>
      <div className="lp-uc-resume-row">
        <div className="lp-uc-resume-line lp-uc-w-70" />
        <span className="lp-uc-check-indicator lp-uc-check-indicator--delay">✓</span>
      </div>
    </div>
  </div>
);

export const ChartMicroVisual: FC = () => (
  <div className="lp-uc-chart">
    <div className="lp-uc-chart-axis-y" />
    <div className="lp-uc-chart-bars">
      <div className="lp-uc-chart-bar-wrapper">
        <div className="lp-uc-chart-bar lp-uc-chart-bar--1" />
      </div>
      <div className="lp-uc-chart-bar-wrapper">
        <div className="lp-uc-chart-bar lp-uc-chart-bar--2" />
      </div>
      <div className="lp-uc-chart-bar-wrapper">
        <div className="lp-uc-chart-bar lp-uc-chart-bar--3" />
      </div>
      <div className="lp-uc-chart-bar-wrapper">
        <div className="lp-uc-chart-bar lp-uc-chart-bar--4" />
      </div>
    </div>
    <div className="lp-uc-chart-axis-x" />
  </div>
);

export const ChecklistMicroVisual: FC = () => (
  <div className="lp-uc-checklist">
    <div className="lp-uc-checklist-row">
      <div className="lp-uc-checkbox"><span className="lp-uc-checkmark">✓</span></div>
      <span className="lp-uc-checklist-text lp-uc-checklist-text--done">Math exam formulas</span>
    </div>
    <div className="lp-uc-checklist-row">
      <div className="lp-uc-checkbox"><span className="lp-uc-checkmark">✓</span></div>
      <span className="lp-uc-checklist-text lp-uc-checklist-text--done">React hooks cheat-sheet</span>
    </div>
    <div className="lp-uc-checklist-row">
      <div className="lp-uc-checkbox" />
      <span className="lp-uc-checklist-text">Lecture 4 slide deck notes</span>
    </div>
  </div>
);

export const ContractMicroVisual: FC = () => (
  <div className="lp-uc-contract">
    <div className="lp-uc-contract-body">
      <div className="lp-uc-contract-line lp-uc-w-90" />
      <div className="lp-uc-contract-line lp-uc-w-80" />
      <div className="lp-uc-contract-line lp-uc-w-85" />
      <div className="lp-uc-contract-sig-line">
        <svg className="lp-uc-contract-svg" viewBox="0 0 100 30">
          <path
            className="lp-uc-contract-path"
            d="M 5,20 C 15,10 20,5 30,18 C 40,30 45,5 55,15 C 65,25 70,5 85,20 C 90,25 95,22 98,18"
            fill="none"
            stroke="var(--clr-amber)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
    <div className="lp-uc-contract-stamp">APPROVED</div>
  </div>
);

export const UseCaseVisual: FC<{ num: string }> = ({ num }) => {
  switch (num) {
    case '01': return <ResumeMicroVisual />;
    case '02': return <ChartMicroVisual />;
    case '03': return <ChecklistMicroVisual />;
    case '04': return <ContractMicroVisual />;
    default: return null;
  }
};
