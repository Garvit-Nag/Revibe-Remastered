"use client";
import { motion } from "framer-motion";
import { AudioWaveform, Brain, ListMusic, Radar } from "lucide-react";

const AboutPage = () => {
  const features = [
    {
      title: "Machine Learning Powered",
      description: "Using K-means clustering with distinct clusters, we group songs based on their audio features to find the most similar tracks.",
      icon: <Brain className="w-6 h-6" />,
    },
    {
      title: "Audio Analysis",
      description: "We analyze multiple audio features including danceability, energy, valence, acousticness, and tempo to understand each song's unique characteristics.",
      icon: <AudioWaveform className="w-6 h-6" />,
    },
    {
      title: "Vast Music Database",
      description: "Our system is built on a comprehensive database of songs, allowing for diverse and accurate recommendations across different genres and styles.",
      icon: <ListMusic className="w-6 h-6" />,
    },
    {
      title: "Personalized Discovery",
      description: "Find new music based on songs you already love, helping you discover artists and tracks that match your musical taste.",
      icon: <Radar className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#040404] pt-20 px-4 md:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          About Revibe
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          Revibe is an intelligent music recommendation system that helps you
          discover new music through advanced audio analysis and machine learning
          technology.
        </p>
      </motion.section>

      {/* Features Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800"
          >
            <div className="bg-indigo-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <div className="text-indigo-500">{feature.icon}</div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* Technical Details */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="max-w-4xl mx-auto mb-16"
      >
        <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-6">How It Works</h2>
          <div className="space-y-4 text-gray-400">
  <p>
    Revibe uses a sophisticated K-means clustering algorithm with 20 clusters to group songs based on their audio features. Our recommendation process follows these steps:
  </p>
  <ol className="list-decimal list-inside space-y-2 pl-4">
    <li>Standardizes the song&apos;s audio features using StandardScaler</li>
    <li>Identifies which of the 20 clusters the song belongs to</li>
    <li>Finds songs within the same cluster</li>
    <li>Calculates Euclidean distances to find the most similar matches</li>
    <li>Enriches results with iTunes preview data</li>
  </ol>
  <p className="mt-6">
    The audio features we analyze include:
  </p>
  <ul className="grid grid-cols-2 gap-2 pl-4">
    <li>• Acousticness</li>
    <li>• Danceability</li>
    <li>• Energy</li>
    <li>• Instrumentalness</li>
    <li>• Liveness</li>
    <li>• Loudness</li>
    <li>• Speechiness</li>
    <li>• Tempo</li>
    <li>• Valence</li>
  </ul>
</div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;