import { motion } from "framer-motion";

interface ArticleCounterProps {
  count: number;
}

const ArticleCounter: React.FC<ArticleCounterProps> = ({ count }) => {
  return (
    <section className="w-full py-12 bg-gray-900 text-white text-center mt-5">
      <div className="container mx-auto flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide">
          Total Articles Published
        </h2>
        <motion.div
          className="mt-4 text-5xl md:text-7xl font-extrabold text-indigo-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {count}
        </motion.div>
        <p className="mt-2 text-gray-400 text-lg">and growing every day!</p>
      </div>
    </section>
  );
};

export default ArticleCounter;
