import React from "react";
import "./StarRating.css";

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const renderStars = () => {
    const totalStars = 5;
    const filledStars = Math.round(rating);

    const filled = "★";
    const empty = "☆";

    const filledStarString = filled.repeat(filledStars);
    const emptyStarString = empty.repeat(totalStars - filledStars);

    return `${filledStarString}${emptyStarString}`;
  };

  return <div className="text-2xl star-rating">{renderStars()}</div>;
};

export default StarRating;
