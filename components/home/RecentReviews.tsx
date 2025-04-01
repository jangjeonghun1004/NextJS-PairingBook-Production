export default function RecentReviews() {
  return (
    <section className="h-full flex flex-col bg-white">
      <div className="flex-1 container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">최근 리뷰</h2>
        <div className="space-y-6">
          {[1, 2, 3].map((review) => (
            <div key={review} className="border-b pb-6 hover:bg-gray-50 p-4 rounded-lg transition-colors duration-300">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900">사용자명</h3>
                  <p className="text-sm text-gray-500">도서 제목 {review}</p>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <span>2시간 전</span>
                <span className="mx-2">•</span>
                <span>5점</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 