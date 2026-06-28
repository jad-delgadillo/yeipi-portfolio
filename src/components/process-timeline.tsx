type ProcessStep = {
  title: string;
  text: string;
};

type ProcessTimelineProps = {
  steps: ProcessStep[];
};

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <div className="handoff-timeline">
      <div className="handoff-rail" aria-hidden="true" />

      <div className="handoff-list">
        {steps.map((step, index) => (
          <article className="handoff-item" key={step.title}>
            <span className="handoff-dot" aria-hidden="true" />
            <div className="handoff-item-copy">
              <div className="handoff-kicker">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <i aria-hidden="true" />
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
