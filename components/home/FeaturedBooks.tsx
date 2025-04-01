export default function FeaturedBooks() {
  return (
    <section className="h-full flex flex-col bg-white">
      <div className="flex-1 container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">추천 도서</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((book) => (
            <div key={book} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-w-3 aspect-h-4 bg-gray-200"></div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900">도서 제목 {book}</h3>
                <p className="mt-1 text-sm text-gray-500">저자명</p>
                <div className="mt-2 flex items-center">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="h-5 w-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">(123)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 