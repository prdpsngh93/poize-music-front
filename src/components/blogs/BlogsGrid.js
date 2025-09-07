"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FaListUl, FaTh } from "react-icons/fa";
import Modal from "../common/Modal";
import BlogsGridCard from "./BlogsGridCard";
import CustomDropdown from "../GlobalComponents/CustomDropdown";
import Pagination from "../GlobalComponents/Pagination";
import NoBlogsFound from "./NoBlogsFound";

// Static blog data - same as in BlogDetail component
const STATIC_BLOGS = [
  {
    id: "1",
    title: "The Evolution of Electronic Music: From Synthesizers to AI",
    slug: "evolution-electronic-music-synthesizers-ai",
    author: {
      name: "Sarah Johnson",
      avatar: "/images/arjan.webp",
    },
    featured_image: "/images/live.avif",
    content:
      "Electronic music has undergone a remarkable transformation since its inception in the mid-20th century...",
    excerpt:
      "Explore the fascinating journey of electronic music from its experimental beginnings to the AI-powered future of sound creation.",
    category: "Music History",
    tags: ["electronic", "technology", "music history", "AI", "synthesizers"],
    created_at: "2024-12-15",
    read_time: 8,
    views: 2543,
    likes: 189,
  },
  {
    id: "2",
    title: "Breaking Down the Biggest Music Festival Trends of 2024",
    slug: "music-festival-trends-2024",
    author: {
      name: "Mike Chen",
        avatar: "/images/arjan.webp",
    },
    featured_image: "/images/upcominggig1.png",
    content:
      "The music festival landscape in 2024 has been nothing short of extraordinary...",
    excerpt:
      "Discover the key trends shaping music festivals in 2024, from sustainability initiatives to cutting-edge technology integration.",
    category: "Music Industry",
    tags: ["festivals", "trends", "sustainability", "technology", "live music"],
    created_at: "2024-12-10",
    read_time: 6,
    views: 1876,
    likes: 156,
  },
  {
    id: "3",
    title: "Indie Artists in the Streaming Age: Strategies for Success",
    slug: "indie-artists-streaming-age-success-strategies",
    author: {
      name: "Emma Rodriguez",
         avatar: "/images/arjan.webp",
    },
    featured_image: "/images/hero.png",
    content:
      "The streaming era has fundamentally changed how music is discovered, consumed, and monetized...",
    excerpt:
      "Learn essential strategies for independent artists to thrive in the streaming era, from playlist placement to direct-to-fan engagement.",
    category: "Music Business",
    tags: [
      "indie music",
      "streaming",
      "music marketing",
      "artist development",
      "digital strategy",
    ],
    created_at: "2024-12-05",
    read_time: 7,
    views: 3201,
    likes: 245,
  },
  {
    id: "4",
    title: "The Psychology of Music: How Sound Affects Our Emotions",
    slug: "psychology-music-sound-affects-emotions",
    author: {
      name: "Dr. Lisa Park",
         avatar: "/images/arjan.webp",
    },
    featured_image: "/images/upcominggig3.png",
    content:
      "Music has the remarkable ability to evoke powerful emotions and memories...",
    excerpt:
      "Explore the fascinating science behind how music influences our mood, behavior, and cognitive processes.",
    category: "Music Science",
    tags: ["psychology", "emotions", "science", "brain", "research"],
    created_at: "2024-12-01",
    read_time: 9,
    views: 1987,
    likes: 203,
  },
  {
    id: "5",
    title: "Home Studio Setup: Essential Equipment for Beginners",
    slug: "home-studio-setup-essential-equipment-beginners",
    author: {
      name: "Alex Thompson",
      avatar: "/images/arjan.webp",
    },
    featured_image: "/images/live.avif",
    content:
      "Building your first home studio can be overwhelming with so many equipment options available...",
    excerpt:
      "A comprehensive guide to setting up your first home recording studio on any budget.",
    category: "Music Production",
    tags: ["home studio", "recording", "equipment", "beginners", "production"],
    created_at: "2024-11-28",
    read_time: 12,
    views: 4532,
    likes: 387,
  },
  {
    id: "6",
    title: "Vinyl Revival: Why Physical Music is Making a Comeback",
    slug: "vinyl-revival-physical-music-comeback",
    author: {
      name: "Maria Santos",
      avatar: "/images/arjan.webp",
    },
    featured_image: "/images/hero.png",
    content:
      "In an age of digital streaming, vinyl records are experiencing an unexpected renaissance...",
    excerpt:
      "Discover why vinyl records are experiencing unprecedented growth in the digital age.",
    category: "Music Culture",
    tags: ["vinyl", "physical media", "culture", "collecting", "analog"],
    created_at: "2024-11-25",
    read_time: 5,
    views: 2156,
    likes: 178,
  },
];

const BlogsGrid = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredBlogs, setFilteredBlogs] = useState(STATIC_BLOGS);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [viewMode, setViewMode] = useState("grid");

  // FILTER STATES - Minimal for blogs
  const [filters, setFilters] = useState({
    sortBy: "Default Sorting",
    showCount: 6,
  });

  // MODAL STATES
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewBlogId, setViewBlogId] = useState(null);
  const [loading, setLoading] = useState(false);

  const sortingOptions = [
    "Default Sorting",
    "Newest First",
    "Oldest First",
    "Title A-Z",
    "Title Z-A",
    "Most Popular",
  ];
  const showOptions = [6, 12, 18, 24];

  // HANDLE FILTER CHANGES
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
    setCurrentPage(1);
  };

  // HANDLE SORTING CHANGE
  const handleSortingChange = (selectedOption) => {
    handleFilterChange("sortBy", selectedOption);
  };

  // HANDLE SHOW COUNT CHANGE
  const handleShowCountChange = (selectedCount) => {
    handleFilterChange("showCount", selectedCount);
  };

  // SORT AND PAGINATE BLOGS
  const processBlogs = useCallback(() => {
    setLoading(true);

    let sortedBlogs = [...STATIC_BLOGS];

    // Apply sorting
    switch (filters.sortBy) {
      case "Newest First":
        sortedBlogs.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        break;
      case "Oldest First":
        sortedBlogs.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
        break;
      case "Title A-Z":
        sortedBlogs.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Title Z-A":
        sortedBlogs.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "Most Popular":
        sortedBlogs.sort((a, b) => b.views - a.views);
        break;
      default:
        // Default sorting - keep original order
        break;
    }

    // Calculate pagination
    const itemsPerPage = filters.showCount;
    const totalItems = sortedBlogs.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Get current page items
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageBlogs = sortedBlogs.slice(startIndex, endIndex);

    setFilteredBlogs(currentPageBlogs);
    setTotalPages(totalPages);
    setTotalItems(totalItems);

    setTimeout(() => setLoading(false), 500); // Simulate loading
  }, [currentPage, filters]);

  // PROCESS BLOGS WHEN FILTERS CHANGE
  useEffect(() => {
    processBlogs();
  }, [processBlogs]);

  // NAVIGATE TO BLOG DETAIL
  const navigateToBlogDetail = (slug) => {
    router.push(`/blogs/${slug}`);
  };

  // List View Component
  const BlogsListView = ({ blogs }) => {
    return (
      <div className="space-y-4">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300 p-4"
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Image */}
              <div className="w-full md:w-48 h-32 flex-shrink-0">
                <img
                  src={blog.featured_image || "/images/blog-placeholder.jpg"}
                  alt={blog.title}
                  className="w-full h-full object-cover rounded-lg cursor-pointer"
                  onClick={() => navigateToBlogDetail(blog.slug)}
                />
              </div>

              {/* Content */}
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <h3
                    className="text-lg font-semibold text-[#1B3139] hover:text-[#1FB58F] cursor-pointer line-clamp-2"
                    onClick={() => navigateToBlogDetail(blog.slug)}
                  >
                    {blog.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span>👤 {blog.author?.name || "Anonymous"}</span>
                  <span>
                    📅 {new Date(blog.created_at).toLocaleDateString()}
                  </span>
                  {blog.category && <span>🏷️ {blog.category}</span>}
                  {blog.read_time && <span>⏱️ {blog.read_time} min read</span>}
                </div>

                <p className="text-gray-700 text-sm line-clamp-3">
                  {blog.excerpt}
                </p>

                <div className="flex justify-between items-center pt-2">
                  <div className="flex gap-2">
                    {blog.tags &&
                      blog.tags.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigateToBlogDetail(blog.slug)}
                      className="px-3 py-1 border border-[#1FB58F] text-[#1FB58F] rounded hover:bg-[#1FB58F] hover:text-white transition-colors text-sm"
                    >
                      Read More
                    </button>
                    <button
                      onClick={() => {
                        setViewBlogId(blog.id);
                        setViewModalOpen(true);
                      }}
                      className="px-3 py-1 bg-[#1FB58F] text-white rounded hover:bg-[#17a07b] transition-colors text-sm"
                    >
                      Quick View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const currentViewBlog = STATIC_BLOGS.find((b) => b.id === viewBlogId);

  return (
    <div className="max-w-7xl mx-auto px-4 ">
      <div className="flex flex-col">
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#1B3139]">Music Blog</h1>
            <p className="text-sm text-gray-600 mt-1">
              Discover the latest music news, artist stories, and industry
              insights
            </p>
          </div>

          {/* TOP FILTERS */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="text-sm text-gray-600">
              {loading
                ? "Loading..."
                : `Showing ${filteredBlogs.length} of ${totalItems} articles`}
              {filters.sortBy !== "Default Sorting" && (
                <span className="ml-2 text-blue-600">
                  • Sorted by {filters.sortBy}
                </span>
              )}
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <CustomDropdown
                label="Sort By"
                options={sortingOptions}
                value={filters.sortBy}
                onChange={handleSortingChange}
              />
              <CustomDropdown
                label="Show"
                options={showOptions}
                value={filters.showCount}
                onChange={handleShowCountChange}
              />
            </div>
          </div>

          {/* VIEW TOGGLE */}
          <div className="flex justify-between bg-[#1FB58F] rounded-lg px-6 py-4 text-white mb-8">
            <div className="font-semibold text-sm md:text-base flex gap-6">
              <button
                onClick={() => setViewMode("list")}
                className={`hover:underline transition-opacity ${
                  viewMode === "list" ? "opacity-100" : "opacity-70"
                }`}
              >
                Article List
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`hover:underline transition-opacity ${
                  viewMode === "grid" ? "opacity-100" : "opacity-70"
                }`}
              >
                Article Grid
              </button>
            </div>
            <div className="flex gap-3 text-xl">
              <button
                onClick={() => setViewMode("list")}
                className={`transition-colors ${
                  viewMode === "list"
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <FaListUl />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`transition-colors ${
                  viewMode === "grid"
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <FaTh />
              </button>
            </div>
          </div>

          {/* ACTIVE FILTERS DISPLAY */}
          {(filters.sortBy !== "Default Sorting" ||
            filters.showCount !== 6) && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg border">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm font-medium text-gray-700">
                  Active Filters:
                </span>
                {filters.sortBy !== "Default Sorting" && (
                  <span className="px-2 py-1 bg-green-200 text-green-800 rounded-full text-xs">
                    Sort: {filters.sortBy}
                  </span>
                )}
                {filters.showCount !== 6 && (
                  <span className="px-2 py-1 bg-purple-200 text-purple-800 rounded-full text-xs">
                    Show: {filters.showCount}
                  </span>
                )}
                <button
                  onClick={() => {
                    setFilters({
                      sortBy: "Default Sorting",
                      showCount: 6,
                    });
                    setCurrentPage(1);
                  }}
                  className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full text-xs ml-2"
                >
                  Clear All
                </button>
              </div>
            </div>
          )}

          {/* LOADER */}
          {loading && (
            <div className="text-center py-10">
              <div className="w-8 h-8 border-4 border-[#1FB58F] border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-gray-600 mt-2">Loading articles...</p>
            </div>
          )}

          {/* BLOGS DISPLAY */}
          {!loading &&
            (filteredBlogs.length > 0 ? (
              viewMode === "grid" ? (
                // GRID VIEW
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredBlogs.map((blog) => (
                    <BlogsGridCard
                      key={blog.id}
                      blogId={blog.id}
                      image={
                        blog.featured_image || "/images/blog-placeholder.jpg"
                      }
                      title={blog.title}
                      author={blog.author?.name || "Anonymous"}
                      date={new Date(blog.created_at).toLocaleDateString()}
                      category={blog.category}
                      excerpt={blog.excerpt}
                      readTime={blog.read_time}
                      tags={blog.tags}
                      onClick={() => navigateToBlogDetail(blog.slug)}
                      onQuickView={() => {
                        setViewBlogId(blog.id);
                        setViewModalOpen(true);
                      }}
                    />
                  ))}
                </div>
              ) : (
                // LIST VIEW
                <BlogsListView blogs={filteredBlogs} />
              )
            ) : (
              <NoBlogsFound />
            ))}

          {/* PAGINATION */}
          {!loading && filteredBlogs.length > 0 && totalPages > 1 && (
            <div className="mt-10">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>

      {/* QUICK VIEW MODAL */}
      <Modal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        title={currentViewBlog?.title || "Blog Details"}
      >
        {currentViewBlog && (
          <div className="space-y-4 max-h-[70dvh] overflow-y-auto">
            <img
              src={
                currentViewBlog.featured_image || "/images/blog-placeholder.jpg"
              }
              alt={currentViewBlog.title}
              className="w-full rounded-lg max-h-64 object-cover"
            />

            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span>
                <strong>Author:</strong>{" "}
                {currentViewBlog.author?.name || "Anonymous"}
              </span>
              <span>
                <strong>Date:</strong>{" "}
                {new Date(currentViewBlog.created_at).toLocaleDateString()}
              </span>
              {currentViewBlog.category && (
                <span>
                  <strong>Category:</strong> {currentViewBlog.category}
                </span>
              )}
              {currentViewBlog.read_time && (
                <span>
                  <strong>Read Time:</strong> {currentViewBlog.read_time} min
                </span>
              )}
            </div>

            {currentViewBlog.tags && currentViewBlog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <strong className="text-sm">Tags:</strong>
                {currentViewBlog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {currentViewBlog.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t">
              <button
                onClick={() => {
                  setViewModalOpen(false);
                  navigateToBlogDetail(currentViewBlog.slug);
                }}
                className="w-full py-3 bg-[#1FB58F] text-white rounded-lg hover:bg-[#17a07b] transition-colors font-medium"
              >
                Read Full Article
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BlogsGrid;
