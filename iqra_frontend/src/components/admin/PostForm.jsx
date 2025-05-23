import React, { useState } from "react";
import "arabic-fonts/src/css/arabic-fonts.css";
const PostForm = () => {
  const [post, setPost] = useState({
    title: "",
    english: "",
    arabic: "",
    bangla: "",
    category: "hadith", // Default value
    tags: [],
    author: "",
    status: "published",
    slug: "",
  });

  const [tagInput, setTagInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });

    // Auto-generate slug from title
    if (name === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-");
      setPost((prev) => ({ ...prev, slug }));
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !post.tags.includes(tagInput.trim())) {
      setPost({ ...post, tags: [...post.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setPost({
      ...post,
      tags: post.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/post`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(post),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create post");
      }

      setMessage({
        text: "পোস্ট সফলভাবে যোগ করা হয়েছে",
        type: "success",
      });

      // Reset form
      setPost({
        title: "",
        english: "",
        arabic: "",
        bangla: "",
        category: "hadith",
        tags: [],
        author: "",
        status: "published",
        slug: "",
      });
    } catch (error) {
      console.error("Error creating post:", error);
      setMessage({
        text: error.message || "পোস্ট তৈরি করতে ব্যর্থ হয়েছে",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-base-300 p-12 rounded-[5px] shadow-lg">
      <h2 className="text-xl font-bold mb-4 font-hind">নতুন পোস্ট যোগ করুন</h2>

      {message.text && (
        <div
          className={`alert ${
            message.type === "success" ? "alert-success" : "alert-error"
          } mb-4`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label font-hind">শিরোনাম</label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleInputChange}
            className="input input-bordered w-full font-hind"
            required
            placeholder="নিয়ত অনুযায়ী প্রতিফল"
          />
        </div>

        <div className="form-control">
          <label className="label font-hind">আরবি টেক্সট</label>
          <input
            type="text"
            name="arabic"
            value={post.arabic}
            onChange={handleInputChange}
            className="input input-bordered w-full text-right font-indopak"
            dir="rtl"
            placeholder="إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ"
          />
        </div>

        <div className="form-control">
          <label className="label font-hind">ইংরেজি অনুবাদ</label>
          <input
            type="text"
            name="english"
            value={post.english}
            onChange={handleInputChange}
            className="input input-bordered w-full font-poppins"
            placeholder="Actions are judged by intentions."
          />
        </div>

        <div className="form-control">
          <label className="label font-hind">বাংলা অনুবাদ</label>
          <textarea
            name="bangla"
            value={post.bangla}
            onChange={handleInputChange}
            className="textarea textarea-bordered w-full font-hind "
            rows="3"
            placeholder="নিয়ত অনুযায়ীই কাজের ফলাফল নির্ধারিত হয়।"
            required
          />
        </div>

        <div className="form-control">
          <label className="label font-hind">ক্যাটেগরি</label>
          <select
            name="category"
            value={post.category}
            onChange={handleInputChange}
            className="select select-bordered w-full font-hind"
            required
          >
            <option value="hadith">হাদিস</option>
            <option value="quran">কুরআন</option>
            <option value="fatwa">ফতোয়া</option>
            <option value="bukhari">সহীহ বুখারী</option>
            <option value="muslim">সহীহ মুসলিম</option>
            <option value="dawood">সুনানে আবু দাউদ</option>
            <option value="tirmidhi">সুনান আত-তিরমিযি</option>
            <option value="nasa'i">সুনানে নাসাই</option>
            <option value="majah">সুনানে ইবনে মাজাহ</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label font-hind">অবস্থা</label>
          <select
            name="status"
            value={post.status}
            onChange={handleInputChange}
            className="select select-bordered w-full font-hind"
            required
          >
            <option value="published">প্রকাশিত</option>
            <option value="draft">খসড়া</option>
            <option value="archived">আর্কাইভড</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label font-hind">লেখক</label>
          <input
            type="text"
            name="author"
            value={post.author}
            onChange={handleInputChange}
            className="input input-bordered w-full font-hind"
            required
            placeholder="লেখকের নাম"
          />
        </div>

        <div className="form-control">
          <label className="label font-hind">স্লাগ</label>
          <input
            type="text"
            name="slug"
            value={post.slug}
            onChange={handleInputChange}
            className="input input-bordered w-full font-hind"
            required
            placeholder="actions-intentions"
          />
        </div>

        <div className="form-control">
          <label className="label font-hind">ট্যাগস</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), handleAddTag())
              }
              className="input input-bordered flex-1"
              placeholder="ট্যাগ যোগ করুন"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="btn btn-primary font-hind"
            >
              যোগ করুন
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2 font-hind">
            {post.tags.map((tag) => (
              <div key={tag} className="badge badge-primary gap-1 font-hind">
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="btn btn-xs btn-ghost btn-circle font-hind"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 font-hind">
          <button
            type="submit"
            className={`btn btn-primary w-full ${
              isSubmitting ? "loading" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "পোস্ট করা হচ্ছে..." : "পোস্ট করুন"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
