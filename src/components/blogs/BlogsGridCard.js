import React from "react";
import { FaClock, FaUser, FaCalendarAlt, FaTag, FaEye } from "react-icons/fa";

const BlogsGridCard = ({
  blogId,
  image,
  title,
  author,
  date,
  category,
  excerpt,
  readTime,
  tags,
  onClick,
  onQuickView,
}) => {
  return (
    <div className="bg-white  rounded-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      {/* Image */}
      <div className="w-full h-48 overflow-hidden cursor-pointer" onClick={onClick}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Category Badge */}
        {category && (
          <div className="flex justify-between items-start">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#1FB58F] bg-opacity-10 text-white">
              <FaTag className="w-3 h-3 mr-1" />
              {category}
            </span>
            {readTime && (
              <span className="inline-flex items-center text-xs text-gray-500">
                <FaClock className="w-3 h-3 mr-1" />
                {readTime} min
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <h3
          className="text-lg font-semibold text-[#1B3139] hover:text-[#1FB58F] cursor-pointer line-clamp-2 leading-tight"
          onClick={onClick}
        >
          {title}
        </h3>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
          <span className="flex items-center">
            <FaUser className="w-3 h-3 mr-1" />
            {author}
          </span>
          <span className="flex items-center">
            <FaCalendarAlt className="w-3 h-3 mr-1" />
            {date}
          </span>
        </div>

        {/* Excerpt */}
        <p className="text-gray-700 text-sm line-clamp-3 leading-relaxed">
          {excerpt}
        </p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded text-xs transition-colors"
              >
                #{tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 py-1 text-gray-500 text-xs">
                +{tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-2 flex gap-2">
          <button
            onClick={onClick}
            className="flex-1 py-2 bg-[#1FB58F] hover:bg-[#17a07b] text-white rounded-lg transition-colors duration-200 font-medium text-sm"
          >
            Read Article
          </button>
          <button
            onClick={onQuickView}
            className="px-3 py-2 border border-[#1FB58F] text-[#1FB58F] hover:bg-[#1FB58F] hover:text-white rounded-lg transition-colors duration-200 text-sm"
            title="Quick View"
          >
            <FaEye />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogsGridCard;