import React, { useState } from "react";
import type { VocabItem } from "../../types";
import { INTERVALS } from "../../lib/srs";
import { hideWord } from "../../lib/text";
import { SpeakButton } from "../SpeakButton";

const StageDots: React.FC<{ stage: number; small?: boolean }> = ({ stage, small }) => (
  <span className={small ? "vt-stage-dots sm" : "vt-stage-dots"}>
    {INTERVALS.map((_, i) => (
      <i key={i} className={i < stage ? "f" : ""} />
    ))}
  </span>
);

export const Learn: React.FC<{
  queue: VocabItem[];
  onLearn: (id: string) => void;
  lang: string;
}> = ({ queue, onLearn, lang }) => {
  const [show, setShow] = useState(false);
  if (queue.length === 0)
    return (
      <div className="vt-empty">
        No new words right now. Move on to <b>Bridge</b> or <b>Review</b>.
      </div>
    );

  const card = queue[0];
  const learnIt = () => {
    onLearn(card.id);
    setShow(false);
  };

  return (
    <div className="vt-card">
      <div className="vt-card-head">
        <h2>Learn</h2>
        <span className="vt-cap">{queue.length} new</span>
      </div>
      <p className="vt-hint">Read it. Try to guess the meaning from the collocation before you flip.</p>

      <div className="vt-flash" onClick={() => setShow((s) => !s)}>
        <div className="vt-flash-word">
          {card.word}
          <SpeakButton text={card.word} lang={lang} />
        </div>
        {card.collocate && (
          <div className="vt-flash-coll">
            {card.collocate}
            <SpeakButton text={card.collocate} lang={lang} size="sm" />
          </div>
        )}
        <div style={{ display: 'grid' }}>
          <div style={{ gridArea: '1/1', visibility: show ? 'visible' : 'hidden' }} className="vt-flash-back">
            {card.definition && <p className="vt-flash-def">{card.definition}</p>}
            {card.context && <p className="vt-flash-ctx">"{card.context}"</p>}
            {!card.definition && !card.context && (
              <p className="vt-flash-ctx vt-dim">infer from the collocation</p>
            )}
          </div>
          <div style={{ gridArea: '1/1', visibility: show ? 'hidden' : 'visible' }} className="vt-flash-tap">
            tap to reveal
          </div>
        </div>
      </div>

      <button className="vt-primary" onClick={learnIt}>Got it — next</button>
    </div>
  );
};

export const Bridge: React.FC<{
  queue: VocabItem[];
  onBridge: (id: string, sentence: string) => void;
  onSkip: (id: string) => void;
  lang: string;
}> = ({ queue, onBridge, onSkip, lang }) => {
  const [text, setText] = useState("");
  if (queue.length === 0)
    return (
      <div className="vt-empty">
        Nothing to bridge. Learn some new words first, or go to <b>Review</b>.
      </div>
    );

  const current = queue[0];
  const commit = () => {
    if (!text.trim()) return;
    onBridge(current.id, text);
    setText("");
  };
  const skip = () => {
    onSkip(current.id);
    setText("");
  };

  return (
    <div className="vt-card">
      <div className="vt-card-head">
        <h2>Bridge</h2>
        <span className="vt-cap">{queue.length} waiting</span>
      </div>
      <p className="vt-hint">
        Write one <b>original</b> sentence in your own context, keeping the collocation whole. This
        single step converts a word you recognise into one you can use.
      </p>

      <div className="vt-target">
        <div className="vt-target-word">
          {current.word}
          <SpeakButton text={current.word} lang={lang} />
        </div>
        {current.collocate && (
          <div className="vt-target-coll">
            {current.collocate}
            <SpeakButton text={current.collocate} lang={lang} size="sm" />
          </div>
        )}
        {current.definition && <div className="vt-target-ctx">{current.definition}</div>}
      </div>

      <label className="vt-field">
        <span>Your sentence</span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Use "${current.collocate || current.word}" about your own life or an opinion.`}
          rows={3}
          autoFocus
        />
      </label>

      <button className="vt-primary" onClick={commit} disabled={!text.trim()}>
        Save & make cloze
      </button>
      <button className="vt-ghost" onClick={skip}>Skip for now (review by definition)</button>
      <p className="vt-foot vt-foot-tip">
        Coach check: is the combination native, and the register right? Flag those two — leave the
        small stuff.
      </p>
    </div>
  );
};

export const Review: React.FC<{
  queue: VocabItem[];
  onGrade: (id: string, correct: boolean) => void;
  lang: string;
}> = ({ queue, onGrade, lang }) => {
  const [revealed, setRevealed] = useState(false);
  if (queue.length === 0)
    return (
      <div className="vt-empty">
        Review queue is clear. Cards return on schedule (1·3·7·14·30 days), then graduate to{" "}
        <b>owned</b>.
      </div>
    );

  const card = queue[0];
  const hasCloze = !!card.cloze;
  const grade = (ok: boolean) => {
    onGrade(card.id, ok);
    setRevealed(false);
  };

  return (
    <div className="vt-card vt-review">
      <div className="vt-card-head">
        <h2>Review</h2>
        <span className="vt-cap">{queue.length} due</span>
      </div>

      <div className="vt-cloze">
        <StageDots stage={card.stage} />
        {hasCloze ? (
          <>
            <p className="vt-cloze-text">{card.cloze}</p>
            {card.collocate && (
              <p className="vt-cloze-hint">collocation: {hideWord(card.collocate, card.word)}</p>
            )}
          </>
        ) : (
          <>
            <p className="vt-cloze-text">{card.definition || "Recall the word for this collocation:"}</p>
            {card.collocate && <p className="vt-cloze-hint">{hideWord(card.collocate, card.word)}</p>}
          </>
        )}
      </div>

      {!revealed ? (
        <button className="vt-primary" onClick={() => setRevealed(true)}>Reveal</button>
      ) : (
        <>
          <div className="vt-answer">
            <b>
              {card.word}
              <SpeakButton text={card.word} lang={lang} />
            </b>
            {card.collocate && (
              <span>
                {card.collocate}
                <SpeakButton text={card.collocate} lang={lang} size="sm" />
              </span>
            )}
          </div>
          <div className="vt-grade">
            <button className="vt-miss" onClick={() => grade(false)}>Missed</button>
            <button className="vt-got" onClick={() => grade(true)}>Got it</button>
          </div>
        </>
      )}
    </div>
  );
};

export { StageDots };
