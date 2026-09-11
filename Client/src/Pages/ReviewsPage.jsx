import React from 'react';
import ReviewsHeroSection from '../components/PComponents/ReviewsPage/ReviewsHeroSection';
import ReviewsStatsSection from '../components/PComponents/ReviewsPage/ReviewsStatsSection';
import ReviewsFeedSection from '../components/PComponents/ReviewsPage/ReviewsFeedSection';
import WriteReviewCTASection from '../components/PComponents/ReviewsPage/WriteReviewCTASection';

export const ReviewsPage = () => {
  return (
    <main className="w-full relative z-20 bg-white flex flex-col">
      <ReviewsHeroSection />
      <ReviewsStatsSection />
      <ReviewsFeedSection />
      <WriteReviewCTASection />
    </main>
  );
};

export default ReviewsPage;
