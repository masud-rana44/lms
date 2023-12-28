import React from "react";

interface EmojiRatingProps {
  rating: number;
}

const EmojiRating: React.FC<EmojiRatingProps> = ({ rating }) => {
  const renderEmoji = () => {
    const emojis = ["😠", "😕", "😐", "🙂", "😃", "😍"]; // Replace with your own set of emojis
    return emojis[Math.floor(rating) - 1] || emojis[0];
  };

  return <div>{renderEmoji()}</div>;
};

export default EmojiRating;
