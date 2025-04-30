export function ProjectCard({ title, description, imageUrl, tags = [], isHighContrast = false }) {
  return (
    <div className={`group relative overflow-hidden rounded-lg border-2 transition-all duration-500 transform hover:scale-[1.02] ${
      isHighContrast 
        ? 'border-white/30 hover:border-white bg-gray-800' 
        : 'border-gray-200 hover:border-gray-300 bg-white shadow-sm'
    }`}>
      <div className={`aspect-video relative overflow-hidden ${
        isHighContrast ? 'bg-gray-700' : 'bg-gray-50'
      }`}>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${
          isHighContrast 
            ? 'from-gray-900/90 via-transparent to-transparent' 
            : 'from-gray-900/10 via-transparent to-transparent'
        }`} />
      </div>
      <div className={`p-4 sm:p-6 backdrop-blur-xs ${
        isHighContrast ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h3 className={`text-xl sm:text-2xl font-pixel mb-2 sm:mb-3 group-hover:transition-colors duration-300 ${
          isHighContrast 
            ? 'text-white group-hover:text-gray-300' 
            : 'text-gray-800 group-hover:text-gray-600'
        }`}>
          {title}
        </h3>
        <p className={`text-sm sm:text-base mb-3 sm:mb-4 ${
          isHighContrast ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {description}
        </p>
        
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-pixel border ${
                  isHighContrast
                    ? 'bg-gray-700 text-white border-white/30'
                    : 'bg-gray-50 text-gray-700 border-gray-200'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button className={`pixel-button w-full sm:w-auto group-hover:animate-pulse-slow ${
            isHighContrast ? 'bg-white text-black hover:bg-gray-200' : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}>
            Demo →
          </button>
          <button className={`pixel-button w-full sm:w-auto group-hover:animate-float ${
            isHighContrast 
              ? 'bg-gray-700 text-white hover:bg-gray-600' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}>
            GitHub
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className={`absolute top-0 left-0 w-12 sm:w-16 h-12 sm:h-16 rounded-br-full transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-500 ${
        isHighContrast ? 'bg-white/10' : 'bg-blue-50'
      }`} />
      <div className={`absolute bottom-0 right-0 w-12 sm:w-16 h-12 sm:h-16 rounded-tl-full transform translate-x-1/2 translate-y-1/2 group-hover:scale-150 transition-transform duration-500 ${
        isHighContrast ? 'bg-white/10' : 'bg-gray-50'
      }`} />
    </div>
  );
} 