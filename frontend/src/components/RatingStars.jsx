import { Star } from "lucide-react";

const RatingStars = ({ rating, size = 4 }) => (
  <div className="flex items-center space-x-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star key={star} className={`w-${size} h-${size} ${star <= Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
    ))}
  </div>
);

export default RatingStars