"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  FaCalendarAlt, 
  FaUser, 
  FaClock, 
  FaTag, 
  FaShare, 
  FaHeart,
  FaArrowLeft,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaCopy
} from "react-icons/fa";
import { toast } from "sonner";

// Static blog data - replace with your actual data
const STATIC_BLOGS = [
  {
    id: "1",
    title: "The Evolution of Electronic Music: From Synthesizers to AI",
    slug: "evolution-electronic-music-synthesizers-ai",
    author: {
      name: "Sarah Johnson",
        avatar: "/images/arjan.webp",
      bio: "Music journalist and electronic music enthusiast with 10+ years of experience."
    },
   featured_image: "/images/live.avif",
    content: `Electronic music has undergone a remarkable transformation since its inception in the mid-20th century. What began as experimental sounds created with primitive synthesizers has evolved into a diverse and sophisticated genre that dominates modern music production.

## The Early Days

The journey started in the 1950s and 60s with pioneers like Karlheinz Stockhausen and Pierre Schaeffer, who used tape manipulation and early electronic instruments to create entirely new soundscapes. The Moog synthesizer, introduced in the 1960s, revolutionized the field by making electronic music creation more accessible.

## The Digital Revolution

The 1980s marked a turning point with the introduction of digital sampling and MIDI technology. Artists like Jean-Michel Jarre, Kraftwerk, and Giorgio Moroder pushed the boundaries of what was possible, creating the foundation for modern electronic dance music.

### Key Milestones:

- **1970s**: Introduction of drum machines and sequencers
- **1980s**: Digital sampling and MIDI revolution
- **1990s**: Birth of techno and house music
- **2000s**: Software-based music production becomes mainstream
- **2010s**: Streaming platforms democratize music distribution

## The Modern Era

Today's electronic music landscape is incredibly diverse, encompassing everything from ambient soundscapes to hard-hitting festival anthems. The accessibility of digital audio workstations (DAWs) has democratized music production, allowing bedroom producers to create chart-topping hits.

## AI and the Future

Artificial intelligence is now entering the electronic music space, with tools that can generate melodies, arrange compositions, and even master tracks. While this raises questions about creativity and authenticity, it also opens up new possibilities for musical expression.

The future of electronic music promises even more innovation, with developments in spatial audio, virtual reality concerts, and AI collaboration pointing toward an exciting new chapter in this ever-evolving genre.`,
    excerpt: "Explore the fascinating journey of electronic music from its experimental beginnings to the AI-powered future of sound creation.",
    category: "Music History",
    tags: ["electronic", "technology", "music history", "AI", "synthesizers"],
    created_at: "2024-12-15",
    updated_at: "2024-12-15",
    read_time: 8,
    views: 2543,
    likes: 189,
    related_posts: ["2", "3"]
  },
  {
    id: "2",
    title: "Breaking Down the Biggest Music Festival Trends of 2024",
    slug: "music-festival-trends-2024",
    author: {
      name: "Mike Chen",
          avatar: "/images/arjan.webp",
      bio: "Festival photographer and music culture writer covering live events worldwide."
    },
   featured_image: "/images/upcominggig1.png",
    content: `The music festival landscape in 2024 has been nothing short of extraordinary. From technological innovations to sustainable practices, festivals are evolving to meet the demands of modern audiences while maintaining their core spirit of musical celebration.

## Sustainability Takes Center Stage

Environmental consciousness has become a major priority for festival organizers. Many events now feature:

- Zero-waste initiatives and comprehensive recycling programs
- Solar-powered stages and renewable energy sources
- Local food vendors to reduce transportation emissions
- Reusable cup programs and plastic-free policies

## Technology Integration

Festivals are embracing technology to enhance the attendee experience:

### Digital Innovation:
- **Cashless payments**: RFID wristbands for seamless transactions
- **AR experiences**: Augmented reality art installations and stage effects
- **Live streaming**: High-quality broadcasts for remote audiences
- **App integration**: Schedule management, artist discovery, and social features

## Diverse Lineups and Inclusivity

2024 has seen a significant push toward more diverse and inclusive programming:

- Increased representation of women, BIPOC, and LGBTQ+ artists
- Multi-generational lineups spanning decades of music
- Genre-blending stages featuring unexpected collaborations
- Accessibility improvements for attendees with disabilities

## The Rise of Boutique Festivals

Smaller, curated festivals are gaining popularity over mega-events:

- More intimate settings with unique locations
- Specialized genres and niche communities
- Higher production values per attendee
- Focus on artist-audience connection

## Post-Pandemic Adaptations

The industry has learned valuable lessons from recent challenges:

- Improved health and safety protocols
- Flexible ticketing and refund policies
- Hybrid online/offline experiences
- Enhanced crowd management systems

As we look toward 2025, these trends suggest a festival industry that's more conscious, inclusive, and technologically advanced than ever before.`,
    excerpt: "Discover the key trends shaping music festivals in 2024, from sustainability initiatives to cutting-edge technology integration.",
    category: "Music Industry",
    tags: ["festivals", "trends", "sustainability", "technology", "live music"],
    created_at: "2024-12-10",
    updated_at: "2024-12-10",
    read_time: 6,
    views: 1876,
    likes: 156,
    related_posts: ["1", "3"]
  },
  {
    id: "3",
    title: "Indie Artists in the Streaming Age: Strategies for Success",
    slug: "indie-artists-streaming-age-success-strategies",
    author: {
      name: "Emma Rodriguez",
      avatar: "/images/arjan.webp",
      bio: "Music industry consultant helping independent artists navigate the digital landscape."
    },
       featured_image: "/images/hero.png",
    content: `The streaming era has fundamentally changed how music is discovered, consumed, and monetized. For independent artists, this shift presents both unprecedented opportunities and unique challenges.

## The New Music Economy

Streaming platforms have democratized music distribution, allowing artists to reach global audiences without traditional gatekeepers. However, the economics are complex:

### Revenue Realities:
- Spotify pays approximately $0.003-0.005 per stream
- Apple Music slightly higher at $0.007-0.01 per stream
- YouTube Music varies widely based on ad revenue

## Building Your Digital Presence

Success in the streaming age requires a multi-platform approach:

### Essential Platforms:
1. **Spotify**: Focus on playlist placements and Spotify for Artists
2. **Apple Music**: Utilize Apple Music for Artists features
3. **YouTube**: Create engaging video content and lyric videos
4. **TikTok**: Short-form content for viral discovery
5. **Instagram**: Behind-the-scenes content and story features

## Playlist Strategy

Playlists are the new radio stations:

- **Editorial playlists**: Target Spotify's curated playlists
- **User-generated playlists**: Build relationships with playlist curators
- **Algorithm playlists**: Optimize for Discover Weekly and Release Radar
- **Create your own**: Curate playlists featuring your music alongside similar artists

## Content Marketing for Musicians

Successful indie artists are content creators:

### Content Types That Work:
- Studio session videos
- Song writing processes
- Personal stories and struggles
- Collaborative content with other artists
- Live performance videos

## Direct-to-Fan Strategies

Building a loyal fanbase is crucial:

- **Email lists**: Own your audience data
- **Patreon/Bandcamp**: Subscription-based support
- **Merchandise**: Create unique, limited edition items
- **Live streaming**: Connect directly with fans

## Data-Driven Decisions

Use analytics to guide your strategy:

- Study listener demographics and locations
- Identify which songs perform best
- Track playlist additions and removals
- Monitor social media engagement rates

The streaming age rewards consistency, authenticity, and strategic thinking. Independent artists who master these elements can build sustainable careers in today's music landscape.`,
    excerpt: "Learn essential strategies for independent artists to thrive in the streaming era, from playlist placement to direct-to-fan engagement.",
    category: "Music Business",
    tags: ["indie music", "streaming", "music marketing", "artist development", "digital strategy"],
    created_at: "2024-12-05",
    updated_at: "2024-12-05",
    read_time: 7,
    views: 3201,
    likes: 245,
    related_posts: ["1", "2"]
  }
];

const BlogDetail = () => {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;

  // Find blog by slug
  const blog = STATIC_BLOGS.find(b => b.slug === slug);

  // Get related blogs
  const relatedBlogs = blog ? 
    STATIC_BLOGS.filter(b => blog.related_posts.includes(b.id)).slice(0, 2) :
    [];

  // Handle sharing
  const handleShare = (platform) => {
    const url = window.location.href;
    const title = blog?.title;
    
    let shareUrl = '';
    
    switch(platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!');
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  // Handle like (you can integrate with your backend)
  const handleLike = () => {
    toast.success('Thanks for liking this article!');
  };

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog Not Found</h1>
        <p className="text-gray-600 mb-8">The article you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/blogs" className="bg-[#1FB58F] text-white px-6 py-3 rounded-lg hover:bg-[#17a07b] transition-colors">
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-gray-50">
      

      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Article Header */}
        <header className="mb-8">
          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#1FB58F] bg-opacity-10 text-white">
              <FaTag className="w-3 h-3 mr-1" />
              {blog.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-[#1B3139] mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Author and Meta Info */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <img
                src={blog.author.avatar || "/images/avatar-placeholder.jpg"}
                alt={blog.author.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-800">{blog.author.name}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <FaCalendarAlt className="w-3 h-3 mr-1" />
                    {new Date(blog.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <span className="flex items-center">
                    <FaClock className="w-3 h-3 mr-1" />
                    {blog.read_time} min read
                  </span>
                </div>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 mr-2">Share:</span>
              <button
                onClick={() => handleShare('facebook')}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              >
                <FaFacebook />
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="p-2 text-blue-400 hover:bg-blue-50 rounded-full transition-colors"
              >
                <FaTwitter />
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="p-2 text-blue-700 hover:bg-blue-50 rounded-full transition-colors"
              >
                <FaLinkedin />
              </button>
              <button
                onClick={() => handleShare('copy')}
                className="p-2 text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
              >
                <FaCopy />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-6 text-sm text-gray-600 pb-6 border-b">
            <span>{blog.views.toLocaleString()} views</span>
            <button
              onClick={handleLike}
              className="flex items-center space-x-1 hover:text-red-500 transition-colors"
            >
              <FaHeart />
              <span>{blog.likes}</span>
            </button>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-8">
          <img
            src={blog.featured_image || "/images/blog-placeholder.jpg"}
            alt={blog.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div 
            className="text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: blog.content.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br />').replace(/^/, '<p>').replace(/$/, '</p>')
                .replace(/## (.*?)(?=<)/g, '<h2 class="text-2xl font-bold text-[#1B3139] mt-8 mb-4">$1</h2>')
                .replace(/### (.*?)(?=<)/g, '<h3 class="text-xl font-semibold text-[#1B3139] mt-6 mb-3">$1</h3>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/- \*\*(.*?)\*\*:/g, '<li><strong>$1</strong>:</li>')
                .replace(/- (.*?)(?=<|$)/g, '<li>$1</li>')
            }}
          />
        </div>

        {/* Tags */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-[#1B3139] mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag, index) => (
              <Link
                key={index}
                href={`/blogs?tag=${tag}`}
                className="px-3 py-1 bg-gray-100 hover:bg-[#1FB58F] hover:text-white text-gray-700 rounded-full text-sm transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Author Bio */}
        <div className="bg-white rounded-lg p-6 mb-8 border">
          <div className="flex items-start space-x-4">
            <img
              src={blog.author.avatar || "/images/avatar-placeholder.jpg"}
              alt={blog.author.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h4 className="text-lg font-semibold text-[#1B3139] mb-2">About {blog.author.name}</h4>
              <p className="text-gray-600">{blog.author.bio}</p>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-[#1B3139] mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <Link
                  key={relatedBlog.id}
                  href={`/blogs/${relatedBlog.slug}`}
                  className="bg-white rounded-lg border hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <img
                    src={relatedBlog.featured_image || "/images/blog-placeholder.jpg"}
                    alt={relatedBlog.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <span className="text-xs text-[#1FB58F] font-medium">{relatedBlog.category}</span>
                    <h4 className="text-lg font-semibold text-[#1B3139] mt-1 mb-2 line-clamp-2">
                      {relatedBlog.title}
                    </h4>
                    <p className="text-gray-600 text-sm line-clamp-2">{relatedBlog.excerpt}</p>
                    <div className="flex items-center space-x-4 mt-3 text-xs text-gray-500">
                      <span>{relatedBlog.author.name}</span>
                      <span>{new Date(relatedBlog.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back to Blogs */}
        <div className="text-center">
          <Link
            href="/blogs"
            className="inline-flex items-center px-6 py-3 bg-[#1FB58F] text-white rounded-lg hover:bg-[#17a07b] transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to All Blogs
          </Link>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;