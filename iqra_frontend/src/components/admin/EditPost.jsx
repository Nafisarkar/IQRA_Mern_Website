import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostById,
  updatePost,
  selectCurrentPost,
} from "../../app/features/posts/postSlice";
import "arabic-fonts/src/css/arabic-fonts.css";

const EditPost = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const currentPost = useSelector(selectCurrentPost);
  const navigate = useNavigate();

  const [post, setPost] = useState({
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
  const [tagInput, setTagInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    dispatch(fetchPostById(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    if (currentPost) {
      setPost(currentPost);
    }
  }, [currentPost]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });

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
      await dispatch(updatePost({ id: postId, post })).unwrap();
      setMessage({
        text: "পোস্ট সফলভাবে আপডেট করা হয়েছে",
        type: "success",
      });
    } catch (error) {
      console.error("Error updating post:", error);
      setMessage({
        text: error || "পোস্ট আপডেট করতে ব্যর্থ হয়েছে",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
      navigate(-1);
    }
  };

  return (
    <div className="bg-base-300 p-6 rounded-lg shadow-lg my-10 mx-4 max-w-3xl">
      <h2 className="text-xl font-bold mb-6 font-hind text-center">
        পোস্ট সম্পাদনা করুন
      </h2>

      {message.text && (
        <div
          className={`alert ${
            message.type === "success" ? "alert-success" : "alert-error"
          } mb-4 font-hind`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* শিরোনাম */}
        <div className="form-control">
          <label className="label text-xs font-hind">শিরোনাম</label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleInputChange}
            className="input input-bordered w-full font-hind"
            placeholder="পোস্টের শিরোনাম"
            required
          />
        </div>

        {/* আরবি টেক্সট */}
        <div className="form-control">
          <label className="label text-xs font-hind">আরবি টেক্সট</label>
          <textarea
            type="text"
            name="arabic"
            value={post.arabic}
            onChange={handleInputChange}
            className="textarea textarea-bordered w-full font-indopak text-right"
            rows="4"
            dir="rtl"
            placeholder="النص العربي"
          />
        </div>

        {/* ইংরেজি অনুবাদ */}
        <div className="form-control">
          <label className="label text-xs font-hind">ইংরেজি অনুবাদ</label>
          <textarea
            type="text"
            name="english"
            value={post.english}
            onChange={handleInputChange}
            className="textarea textarea-bordered w-full font-poppins"
            rows="4"
            placeholder="English translation"
          />
        </div>

        {/* বাংলা অনুবাদ */}
        <div className="form-control">
          <label className="label text-xs font-hind">বাংলা অনুবাদ</label>
          <textarea
            name="bangla"
            value={post.bangla}
            onChange={handleInputChange}
            className="textarea textarea-bordered w-full font-hind"
            rows="4"
            placeholder="বাংলা অনুবাদ"
            required
          />
        </div>

        {/* ক্যাটেগরি */}
        <div className="form-control">
          <label className="label text-xs font-hind">ক্যাটেগরি</label>
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
          </select>
        </div>

        {/* অবস্থা */}
        <div className="form-control">
          <label className="label text-xs font-hind">অবস্থা</label>
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

        {/* লেখক */}
        <div className="form-control">
          <label className="label text-xs font-hind">লেখক</label>
          <input
            type="text"
            name="author"
            value={post.author}
            onChange={handleInputChange}
            className="input input-bordered w-full font-hind"
            placeholder="লেখকের নাম"
            required
          />
        </div>

        {/* স্লাগ */}
        <div className="form-control">
          <label className="label text-xs font-poppins">Slug</label>
          <input
            type="text"
            name="slug"
            value={post.slug}
            onChange={handleInputChange}
            className="input input-bordered w-full font-poppins"
            placeholder="auto-generated slug"
            required
          />
        </div>

        {/* ট্যাগস */}
        <div className="form-control">
          <label className="label text-xs font-hind">ট্যাগস</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), handleAddTag())
              }
              className="input input-bordered flex-1 font-hind"
              placeholder="ট্যাগ লিখুন"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="btn btn-warning"
            >
              যোগ করুন
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {post.tags.map((tag) => (
              <div
                key={tag}
                className="badge badge-outline font-hind gap-1 px-2"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="btn btn-xs btn-ghost btn-circle"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* সাবমিট */}
        <div className="mt-6">
          <button
            type="submit"
            className={`btn btn-info w-full ${
              isSubmitting ? "loading" : ""
            } font-hind`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "আপডেট করা হচ্ছে..." : "আপডেট করুন"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
