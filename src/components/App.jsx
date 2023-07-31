import React, { useState } from 'react';
import Statistics from './Statistics';
import FeedbackOptions from './FeedbackOptions';
import Notification from './Notification';
import Section from './Section';

import { Container } from './App.styled';

const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const handleFeedback = type => {
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [type]: prevFeedback[type] + 1,
    }));
  };

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const positivePercentage =
    totalFeedback === 0 ? 0 : Math.round((feedback.good / totalFeedback) * 100);

  const options = Object.keys(feedback);

  return (
    <Container>
      <Section title="Please, leave your feedback">
        <FeedbackOptions options={options} onLeaveFeedback={handleFeedback} />
      </Section>

      <Section title="Statistics">
        {totalFeedback > 0 ? (
          <Statistics
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={totalFeedback}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </Container>
  );
};

export default App;
