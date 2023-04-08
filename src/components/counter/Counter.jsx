import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from './Counter.module.css';
import FeedbackStatistics from '../feedbackStat/FeedbackStatistics';

const buttonValues = ['Good', 'Neutral', 'Bad'];

const Counter = ({ initialGood = 0, initialNeutral = 0, initialBad = 0 }) => {
  const [good, setGood] = useState(initialGood);
  const [neutral, setNeutral] = useState(initialNeutral);
  const [bad, setBad] = useState(initialBad);
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  const handleClick = (value) => {
    switch (value) {
      case 'Good':
        setGood(good + 1);
        break;
      case 'Neutral':
        setNeutral(neutral + 1);
        break;
      case 'Bad':
        setBad(bad + 1);
        break;
      default:
        break;
    }
    setFeedbackGiven(true);
  };

  const countTotalFeedback = () => good + neutral + bad;

  const countPositiveFeedbackPercentage = () => {
    const total = good + neutral + bad;
    return total > 0 ? Math.round((good / total) * 100) : 0;
  };

  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();

  return (
    <section className={style.buttons}>
      <h1>Please leave feedback</h1>

      <div className={style.button}>
        {buttonValues.map((button, index) => (
          <button className={style.buttons_tree} key={index} onClick={() => handleClick(button)}>
            {button}
          </button>
        ))}
      </div>

      {feedbackGiven ? (
        <FeedbackStatistics good={good} neutral={neutral} bad={bad} total={total} positivePercentage={positivePercentage} />
      ) : (
        <h2 className="text-feedback">No feedbacks given</h2>
      )}
    </section>
  );
};

Counter.propTypes = {
  initialGood: PropTypes.number,
  initialNeutral: PropTypes.number,
  initialBad: PropTypes.number,
};

export default Counter;
