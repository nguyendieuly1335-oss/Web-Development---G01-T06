import {
  CheckCircle2,
  Star,
  Filter,
  MessageSquare,
  TrendingUp,
  ShieldCheck,
  Truck,
  Loader2,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";

import api from "../lib/api";
import { useProduct } from "../providers/ProductProvider";
import RatingStars from "../components/RatingStars";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444"];

const DetailPage = () => {
  const { id } = useParams();
  const { getProductById } = useProduct();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(true);

  const [loadingReviews, setLoadingReviews] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const [filterSource, setFilterSource] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchProductData = async () => {
      if (!id) return;
      setLoadingProduct(true);
      try {
        const data = await getProductById(id);
        data ? setProduct(data) : console.error("Product 404");
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingProduct(false);
      }
    };
    fetchProductData();
  }, [id, getProductById]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!id) return;

      if (page === 1) {
        setLoadingReviews(true);
      } else {
        setLoadingMore(true);
      }

      try {
        const params = new URLSearchParams({
          page,
          limit: 10,
          sortBy,
          ...(filterSource !== "All" && { source: filterSource }),
        });

        const response = await api.get(
          `/reviews/byProductId/${id}?${params.toString()}`
        );

        const result = response.data;

        if (result && result.success) {
          const incomingReviews = result.data || [];
          const meta = result.meta || {};

          setReviews((prev) => {
            if (page === 1) return incomingReviews;
            return [...prev, ...incomingReviews];
          });

          setTotalPages(meta.totalPages || 1);
        } else {
          if (page === 1) setReviews([]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoadingReviews(false);
        setLoadingMore(false);
      }
    };

    fetchReviews();
  }, [id, filterSource, sortBy, page]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handleFilterChange = (e) => {
    setFilterSource(e.target.value);
    setPage(1);
    setReviews([]);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setPage(1);
    setReviews([]);
  };

  const stats = useMemo(() => {
    if (!reviews?.length) return null;

    const total = reviews.length;
    const sumRating = reviews.reduce(
      (acc, curr) => acc + Number(curr.rating),
      0
    );
    const avgRating = (sumRating / total).toFixed(1);

    const starCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      const rating = Math.round(Number(r.rating));
      if (starCounts[rating] !== undefined) starCounts[rating]++;
    });

    const starChartData = Object.keys(starCounts)
      .reverse()
      .map((key) => ({
        name: `${key} ★`,
        count: starCounts[key],
        fullMark: total,
      }));

    const sourceCounts = {};
    reviews.forEach((r) => {
      const src = r.source || "Other";
      sourceCounts[src] = (sourceCounts[src] || 0) + 1;
    });

    const sourceChartData = Object.keys(sourceCounts).map((key, index) => ({
      name: key,
      value: sourceCounts[key],
      color: COLORS[index % COLORS.length],
    }));

    return { total, avgRating, starChartData, sourceChartData };
  }, [reviews]);

  const getSourceBadgeStyle = (source) => {
    switch (source) {
      case "Amazon":
        return "bg-[#FF9900]/10 text-[#FF9900] border-[#FF9900]/20";
      case "Walmart":
        return "bg-[#0071DC]/10 text-[#0071DC] border-[#0071DC]/20";
      case "BestBuy":
        return "bg-[#FFF200]/10 text-[#0046BE] border-[#FFF200]/50";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loadingProduct)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full"
        />
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-slate-500">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <button
          onClick={() => navigate('/')}
          className="text-indigo-600 hover:underline"
        >
          Go Back
        </button>
      </div>
    );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-[#F8FAFC] pb-20 font-sans text-slate-800"
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 relative z-10"
          >
            <motion.div
              className="group relative w-full aspect-square bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden flex items-center justify-center"
              whileHover={{ scale: 1.005 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-50" />
              <div className="absolute inset-0 bg-radial-gradient from-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <motion.img
                src={product.image_url}
                alt={product.title}
                className="relative z-20 w-[80%] h-[80%] object-contain mix-blend-multiply drop-shadow-xl transition-all duration-500 ease-out group-hover:scale-110 group-hover:-rotate-2"
              />
            </motion.div>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="lg:col-span-7 flex flex-col justify-center space-y-6"
          >
            <div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-block px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full mb-3 shadow-lg shadow-indigo-200"
              >
                PREMIUM ELECTRONICS
              </motion.span>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                {product.title}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                  ${product.price}
                </span>
                {stats && (
                  <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-lg border border-yellow-100">
                    <Star
                      size={18}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    <span className="font-bold text-slate-700">
                      {stats.avgRating}
                    </span>
                    <span className="text-slate-400 text-sm">/ 5.0</span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: ShieldCheck, text: "Authentic" },
                { icon: Truck, text: "Free Shipping" },
                { icon: CheckCircle2, text: "Warranty" },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <feature.icon className="text-indigo-500 mb-2" size={24} />
                  <span className="text-xs font-semibold text-slate-600 uppercase">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-slate-500 leading-relaxed text-sm">
              High-quality product with superior features, highly rated by the
              user community.
            </p>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="mb-12">
          <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <TrendingUp className="text-indigo-600" /> Review Analytics
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 lg:col-span-2">
              <h4 className="text-lg font-bold text-slate-700 mb-4">
                Rating Distribution
              </h4>
              <div className="h-64">
                {stats ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={stats.starChartData}
                      margin={{ top: 0, right: 30, left: 20, bottom: 0 }}
                    >
                      <XAxis type="number" hide />
                      <YAxis
                        dataKey="name"
                        type="category"
                        axisLine={false}
                        tickLine={false}
                        width={40}
                        tick={{
                          fill: "#64748b",
                          fontSize: 12,
                          fontWeight: 600,
                        }}
                      />
                      <Tooltip
                        cursor={{ fill: "#f1f5f9" }}
                        contentStyle={{
                          borderRadius: "12px",
                          border: "none",
                          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        }}
                      />
                      <Bar dataKey="count" barSize={24} radius={[0, 10, 10, 0]}>
                        {stats.starChartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={index === 0 ? "#fbbf24" : "#e2e8f0"}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-300">
                    No Data
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100">
              <h4 className="text-lg font-bold text-slate-700 mb-4">Source</h4>
              <div className="h-64 relative">
                {stats ? (
                  <>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={stats.sourceChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {stats.sourceChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: "12px" }} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-3xl font-bold text-slate-800">
                        {stats.total}
                      </span>
                      <span className="text-xs text-slate-400 uppercase font-bold">
                        Total Reviews
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-300">
                    No Data
                  </div>
                )}
              </div>
              <div className="flex justify-center gap-3 flex-wrap mt-2">
                {stats?.sourceChartData.map((entry, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    ></span>
                    <span className="text-xs font-medium text-slate-600">
                      {entry.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/60 border border-slate-100"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 pb-6 border-b border-slate-100">
            <div>
              <h3 className="text-2xl font-bold text-slate-800">
                Community Feedback
              </h3>
              <p className="text-slate-500 text-sm mt-1">
                Hear from verified buyers ({stats?.total || 0} reviews)
              </p>
            </div>

            <div className="flex gap-3">
              <div className="relative group">
                <Filter
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-indigo-500 transition-colors"
                  size={16}
                />
                <select
                  value={filterSource}
                  onChange={handleFilterChange}
                  className="pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:border-indigo-300 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none appearance-none cursor-pointer"
                >
                  <option value="All">All Sources</option>
                  <option value="Amazon">Amazon</option>
                  <option value="Walmart">Walmart</option>
                  <option value="BestBuy">BestBuy</option>
                </select>
              </div>
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:border-indigo-300 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none appearance-none cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
              </select>
            </div>
          </div>

          <div className="space-y-6">
            {loadingReviews && page === 1 ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse flex gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-100 rounded w-1/4"></div>
                    <div className="h-20 bg-slate-100 rounded-xl"></div>
                  </div>
                </div>
              ))
            ) : reviews.length > 0 ? (
              <>
                <AnimatePresence mode="popLayout">
                  {reviews.map((review) => (
                    <motion.div
                      key={review.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="group p-6 rounded-2xl bg-slate-50/50 hover:bg-white border border-transparent hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-50/50 transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full border-2 border-white shadow-md overflow-hidden relative">
                            <img
                              src={`https://i.pravatar.cc/150?u=${
                                review.author || review.id
                              }`}
                              alt={review.author}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.nextSibling.style.display = "flex";
                              }}
                            />
                            <div className="absolute inset-0 hidden items-center justify-center bg-indigo-100 text-indigo-600 font-bold">
                              {review.author?.charAt(0)}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900">
                              {review.author}
                            </h4>
                            <div className="flex items-center gap-3 mt-1">
                              <RatingStars rating={review.rating} size={14} />
                              <span className="text-xs text-slate-400">•</span>
                              <span className="text-xs text-slate-400">
                                {new Date(review.created_at).toLocaleDateString(
                                  "en-US"
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        <span
                          className={`px-3 py-1 rounded-lg text-[10px] font-bold border uppercase tracking-wide ${getSourceBadgeStyle(
                            review.source
                          )}`}
                        >
                          {review.source}
                        </span>
                      </div>

                      <h5 className="font-bold text-slate-800 mb-2">
                        {review.title}
                      </h5>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {review.body}
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {page < totalPages && (
                  <div className="pt-8 flex justify-center">
                    <button
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      className="group flex items-center gap-2 px-8 py-3 bg-white border border-indigo-100 text-indigo-600 font-bold rounded-full shadow-sm hover:bg-indigo-50 hover:border-indigo-200 hover:shadow-indigo-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loadingMore ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          <span>Loading more...</span>
                        </>
                      ) : (
                        <>
                          <span>Load More Reviews</span>
                          <ChevronDown
                            size={18}
                            className="group-hover:translate-y-1 transition-transform"
                          />
                        </>
                      )}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 flex flex-col items-center">
                <MessageSquare size={64} className="text-slate-200 mb-4" />
                <p className="text-slate-400 font-medium">
                  No reviews match your filter.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DetailPage;
