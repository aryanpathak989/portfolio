"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  ExternalLink,
  Trophy,
  Code,
  Zap,
  Rocket,
  ChevronDown,
  Send,
  Sun,
  Moon,
  Building,
  Calendar,
  Activity,
  DollarSign,
  Clock,
  Star,
  GitBranch,
  Users,
  BookOpen,
} from "lucide-react"

const techAnimations = {
  matrix: {
    initial: { opacity: 0, y: -20 },
    animate: {
      opacity: [0, 1, 0],
      y: [0, 100, 200],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
        staggerChildren: 0.1,
      },
    },
  },
  glitch: {
    initial: { x: 0 },
    animate: {
      x: [0, -2, 2, 0],
      transition: {
        duration: 0.2,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: 3,
      },
    },
  },
  circuit: {
    initial: { pathLength: 0, opacity: 0 },
    animate: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 2, ease: "easeInOut" },
    },
  },
}

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

interface GitHubData {
  user: {
    name: string
    bio: string
    login: string
    avatarUrl: string
    followers: { totalCount: number }
    following: { totalCount: number }
    repositories: { totalCount: number }
    contributionsCollection: {
      totalCommitContributions: number
      totalPullRequestContributions: number
      totalIssueContributions: number
      totalRepositoryContributions: number
      contributionCalendar: {
        totalContributions: number
        weeks: Array<{
          contributionDays: Array<{
            contributionCount: number
            date: string
            weekday: number
          }>
        }>
      }
    }
  }
  repositories: Array<{
    name: string
    description: string
    stargazerCount: number
    forkCount: number
    primaryLanguage: { name: string; color: string } | null
    url: string
  }>
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")
  const [darkMode, setDarkMode] = useState(true)
  const [githubData, setGithubData] = useState<GitHubData | null>(null)
  const [loading, setLoading] = useState(true)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

useEffect(() => {
  const fetchGitHubData = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/github");
      const data = await res.json();

      if (res.ok) {
        setGithubData({
          user: data.user,
          repositories: data.repositories,
        });
      } else {
        console.error("API Error:", data.error);
      }
    } catch (error) {
      console.error("Failed to fetch GitHub data:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchGitHubData();
}, []);


  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "experience", "coding", "projects", "hire"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  const themeClasses = darkMode
    ? "bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white"
    : "bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 text-slate-900"

  const getContributionColor = (count: number) => {
    if (count === 0) return darkMode ? "bg-slate-800/50" : "bg-slate-200"
    if (count <= 3) return "bg-green-900"
    if (count <= 6) return "bg-green-700"
    if (count <= 9) return "bg-green-500"
    return "bg-green-400"
  }

  // const getContributionIntensity = (count: number) => {
  //   if (count === 0) return "No contributions"
  //   if (count <= 3) return "Low activity"
  //   if (count <= 6) return "Moderate activity"
  //   if (count <= 9) return "High activity"
  //   return "Very high activity"
  // }

  return (
    <div className={`min-h-screen transition-all duration-500 ${themeClasses}`}>
      {/* Tech Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Matrix Rain Effect */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute text-xs font-mono ${darkMode ? "text-blue-500/20" : "text-blue-600/10"}`}
            style={{ left: `${i * 5}%`, top: "-20px" }}
            initial="initial"
            animate="animate"
            transition={{ delay: i * 0.1 }}
          >
            {Math.random().toString(36).substring(7)}
          </motion.div>
        ))}

        {/* Circuit Pattern SVG */}
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 1000 1000">
          <motion.path
            d="M100,100 L200,100 L200,200 L300,200 L300,300 L400,300"
            stroke={darkMode ? "#3b82f6" : "#1e40af"}
            strokeWidth="2"
            fill="none"
            initial="initial"
            animate="animate"
          />
        </svg>
      </div>

      {/* Navigation */}
      <motion.nav
        className={`fixed top-0 w-full z-50 backdrop-blur-md border-b transition-all duration-300 ${
          darkMode ? "bg-slate-950/80 border-slate-800" : "bg-white/80 border-slate-200"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent"
              variants={techAnimations.glitch}
              animate="animate"
            >
              Aryan.dev
            </motion.div>
            <div className="hidden md:flex items-center space-x-8">
              {["About", "Experience", "Coding", "Projects", "Hire Me"].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(" ", ""))}
                  className={`transition-colors ${
                    activeSection === item.toLowerCase().replace(" ", "")
                      ? "text-blue-500"
                      : darkMode
                        ? "text-slate-300 hover:text-white"
                        : "text-slate-600 hover:text-slate-900"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.button>
              ))}
              <div className="flex items-center space-x-2">
                <Sun className={`w-4 h-4 ${darkMode ? "text-slate-400" : "text-yellow-500"}`} />
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                <Moon className={`w-4 h-4 ${darkMode ? "text-blue-400" : "text-slate-400"}`} />
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <div
            className={`absolute inset-0 ${darkMode ? "bg-gradient-to-r from-blue-500/10 to-cyan-500/10" : "bg-gradient-to-r from-blue-500/5 to-cyan-500/5"}`}
          />
        </motion.div>

        <div className="container mx-auto px-6 text-center z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 p-1">
              <div
                className={`w-full h-full rounded-full ${darkMode ? "bg-slate-950" : "bg-white"} flex items-center justify-center text-4xl`}
              >
                {githubData?.user?.avatarUrl ? (
                  <img
                    src={githubData.user.avatarUrl || "/placeholder.svg"}
                    alt="Aryan"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  "👨‍💻"
                )}
              </div>
            </div>
          </motion.div>

          <motion.h1
            className={`text-6xl md:text-8xl font-bold mb-6 ${darkMode ? "text-white" : "text-slate-900"}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              {githubData?.user?.name || "Aryan"}
            </span>
          </motion.h1>

          <motion.p
            className={`text-xl md:text-2xl mb-8 max-w-2xl mx-auto ${darkMode ? "text-slate-300" : "text-slate-600"}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {githubData?.user?.bio || "Full Stack Developer crafting scalable solutions with modern technologies"}
          </motion.p>

          <motion.div
            className="flex justify-center space-x-6 mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { icon: Github, href: "https://github.com/aryanpathak989", label: "GitHub" },
              { icon: Linkedin, href: "#", label: "LinkedIn" },
              { icon: Twitter, href: "#", label: "Twitter" },
              { icon: Mail, href: "#", label: "Email" },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                className={`w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors ${
                  darkMode
                    ? "bg-white/10 text-white hover:bg-blue-500/50"
                    : "bg-slate-900/10 text-slate-900 hover:bg-blue-500/50 hover:text-white"
                }`}
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="animate-bounce"
          >
            <ChevronDown
              className={`w-8 h-8 mx-auto cursor-pointer ${darkMode ? "text-slate-400" : "text-slate-600"}`}
              onClick={() => scrollToSection("about")}
            />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 ${darkMode ? "bg-slate-900/20" : "bg-slate-100/50"}`}>
        <div className="container mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? "text-white" : "text-slate-900"}`}
            >
              About Me
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className={`text-xl max-w-3xl mx-auto ${darkMode ? "text-slate-300" : "text-slate-600"}`}
            >
              I&apos;m a passionate full-stack developer with expertise in modern web technologies. I love solving complex
              problems and building scalable applications that make a difference.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { icon: Code, title: "Frontend", desc: "React, Next.js, TypeScript, Tailwind CSS" },
              { icon: Zap, title: "Backend", desc: "Node.js, Java, PostgreSQL, MongoDB, MySQL" },
              { icon: Rocket, title: "DevOps", desc: "Docker, AWS, CI/CD, Kubernetes" },
            ].map((skill) => (
              <motion.div
                key={skill.title}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className={`backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 ${
                  darkMode
                    ? "bg-white/5 border-slate-700 hover:border-blue-500/50"
                    : "bg-white/50 border-slate-200 hover:border-blue-500/50"
                }`}
              >
                <skill.icon className="w-12 h-12 text-blue-500 mb-4" />
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? "text-white" : "text-slate-900"}`}>
                  {skill.title}
                </h3>
                <p className={darkMode ? "text-slate-400" : "text-slate-600"}>{skill.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? "text-white" : "text-slate-900"}`}
            >
              Professional Journey
            </motion.h2>
            <motion.p variants={fadeInUp} className={`text-xl ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
              My career progression and key achievements
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            {[
              {
                company: "Sustvest",
                position: "Full Stack Developer",
                period: "2025 - Present",
                description:
                  "Leading development of scalable web applications using React, Node.js, and cloud technologies. Mentoring junior developers and architecting system solutions.",
                achievements: [
                  "Led team of 3 developers",
                  "Improved system performance by 40%",
                  "Implemented CI/CD pipeline",
                ],
                current: true,
              },
              {
                company: "Grip Invest",
                position: "Software Engineer",
                period: "2023 - 2024",
                description:
                  "Developed and maintained multiple product using modern web technologies. Collaborated with cross-functional teams to deliver high-quality solutions.",
                achievements: ["Built 10+ features", "Reduced load time by 60%", "Integrated RFQ systems in obpp platform"],
                current: false,
              },
            ].map((exp, index) => (
              <motion.div key={exp.company} variants={fadeInUp} className="relative mb-12 last:mb-0">
                {/* Timeline Line */}
                <div
                  className={`absolute left-8 top-16 bottom-0 w-0.5 ${
                    index === 2 ? "hidden" : darkMode ? "bg-blue-500/30" : "bg-blue-500/20"
                  }`}
                />

                <div className="flex items-start space-x-6">
                  {/* Timeline Dot */}
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center border-4 ${
                      exp.current
                        ? "bg-blue-500 border-blue-400 animate-pulse"
                        : darkMode
                          ? "bg-slate-800 border-slate-600"
                          : "bg-white border-slate-300"
                    }`}
                  >
                    <Building className={`w-6 h-6 ${exp.current ? "text-white" : "text-blue-500"}`} />
                  </div>

                  {/* Content */}
                  <Card
                    className={`flex-1 ${darkMode ? "bg-white/5 border-slate-700" : "bg-white/50 border-slate-200"}`}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className={`text-xl ${darkMode ? "text-white" : "text-slate-900"}`}>
                            {exp.position}
                          </CardTitle>
                          <CardDescription className="text-blue-500 font-semibold">{exp.company}</CardDescription>
                        </div>
                        <Badge variant={exp.current ? "default" : "secondary"} className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {exp.period}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className={`mb-4 ${darkMode ? "text-slate-300" : "text-slate-600"}`}>{exp.description}</p>
                      <div className="space-y-2">
                        <h4 className={`font-semibold text-sm ${darkMode ? "text-white" : "text-slate-900"}`}>
                          Key Achievements:
                        </h4>
                        <ul className="space-y-1">
                          {exp.achievements.map((achievement, i) => (
                            <li
                              key={i}
                              className={`text-sm flex items-center gap-2 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Coding Profiles Section */}
      <section id="coding" className={`py-20 ${darkMode ? "bg-slate-900/20" : "bg-slate-100/50"}`}>
        <div className="container mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? "text-white" : "text-slate-900"}`}
            >
              Coding Profiles
            </motion.h2>
            <motion.p variants={fadeInUp} className={`text-xl ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
              My competitive programming journey across various platforms
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {[
              {
                platform: "LeetCode",
                problems: "500+",
                rating: "1724",
                rank: "Top 11%",
                color: "from-orange-500 to-yellow-500",
              },
              {
                platform: "Codeforces",
                problems: "30+",
                rating: "900",
                rank: "New bie",
                color: "from-blue-500 to-cyan-500",
              },
              {
                platform: "GeeksforGeeks",
                problems: "300+",
                rating: 'N/A',
                rank: "650 points",
                color: "from-green-500 to-emerald-500",
              },
              {
                platform: "HackerRank",
                problems: "200+",
                rating: "N/A",
                rank: "5 Star",
                color: "from-purple-500 to-pink-500",
              },
            ].map((profile) => (
              <motion.div
                key={profile.platform}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative group"
              >
                <Card
                  className={`backdrop-blur-sm border transition-all duration-300 ${
                    darkMode
                      ? "bg-white/5 border-slate-700 hover:border-blue-500/50"
                      : "bg-white/50 border-slate-200 hover:border-blue-500/50"
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${profile.color} flex items-center justify-center mb-3`}
                    >
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className={darkMode ? "text-white" : "text-slate-900"}>{profile.platform}</CardTitle>
                    <Badge variant="secondary" className="w-fit">
                      {profile.rank}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className={darkMode ? "text-slate-400" : "text-slate-600"}>Problems Solved</span>
                      <span className={`font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}>
                        {profile.problems}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={darkMode ? "text-slate-400" : "text-slate-600"}>Rating</span>
                      <span className={`font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}>
                        {profile.rating}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* GitHub Stats */}
          <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
            <Card
              className={`backdrop-blur-sm border ${
                darkMode ? "bg-white/5 border-slate-700" : "bg-white/50 border-slate-200"
              }`}
            >
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${darkMode ? "text-white" : "text-slate-900"}`}>
                  <Github className="w-6 h-6" />
                  GitHub Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className={darkMode ? "text-slate-400" : "text-slate-600"}>Loading GitHub data...</p>
                  </div>
                ) : githubData ? (
                  <>
                    {/* GitHub Stats Grid */}
                    <div className="grid md:grid-cols-4 gap-6 mb-8">
                      {[
                        {
                          label: "Public Repos",
                          value: githubData.user.repositories.totalCount,
                          icon: <BookOpen className="w-6 h-6" />,
                          color: "text-blue-500",
                        },
                        {
                          label: "Total Stars",
                          value: githubData.repositories.reduce((acc, repo) => acc + repo.stargazerCount, 0),
                          icon: <Star className="w-6 h-6" />,
                          color: "text-yellow-500",
                        },
                        {
                          label: "Followers",
                          value: githubData.user.followers.totalCount,
                          icon: <Users className="w-6 h-6" />,
                          color: "text-green-500",
                        },
                        {
                          label: "Following",
                          value: githubData.user.following.totalCount,
                          icon: <GitBranch className="w-6 h-6" />,
                          color: "text-purple-500",
                        },
                      ].map((stat) => (
                        <motion.div key={stat.label} className="text-center" whileHover={{ scale: 1.1 }}>
                          <div className={`flex justify-center mb-2 ${stat.color}`}>{stat.icon}</div>
                          <div className={`text-2xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}>
                            {stat.value}
                          </div>
                          <div className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                            {stat.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Contribution Stats */}
                    <div className="grid md:grid-cols-4 gap-4 mb-8">
                      {[
                        {
                          label: "Commits",
                          value: githubData.user.contributionsCollection.totalCommitContributions,
                          color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
                        },
                        {
                          label: "Pull Requests",
                          value: githubData.user.contributionsCollection.totalPullRequestContributions,
                          color: "bg-green-500/10 text-green-500 border-green-500/20",
                        },
                        {
                          label: "Issues",
                          value: githubData.user.contributionsCollection.totalIssueContributions,
                          color: "bg-orange-500/10 text-orange-500 border-orange-500/20",
                        },
                        {
                          label: "Repositories",
                          value: githubData.user.contributionsCollection.totalRepositoryContributions,
                          color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
                        },
                      ].map((stat) => (
                        <div key={stat.label} className={`p-4 rounded-lg border ${stat.color}`}>
                          <div className="text-2xl font-bold">{stat.value}</div>
                          <div className="text-sm opacity-80">{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* GitHub Contribution Calendar */}
                    <div className="space-y-4">
                      <h3
                        className={`text-lg font-semibold flex items-center gap-2 ${darkMode ? "text-white" : "text-slate-900"}`}
                      >
                        <Activity className="w-5 h-5" />
                        {githubData.user.contributionsCollection.contributionCalendar.totalContributions} contributions
                        in the last year
                      </h3>

                      <div
                        className={`p-6 rounded-lg ${darkMode ? "bg-slate-900/50" : "bg-slate-100/50"} overflow-x-auto`}
                      >
                        {/* Month labels */}
                        <div className="flex mb-3">
                          <div className="w-12"></div>
                          <div className="flex space-x-1">
                            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
                              (month, index) => (
                                <div
                                  key={month}
                                  className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-600"} w-12 text-left`}
                                  style={{ marginLeft: index === 0 ? "0" : "32px" }}
                                >
                                  {month}
                                </div>
                              ),
                            )}
                          </div>
                        </div>

                        <div className="flex">
                          {/* Day labels */}
                          <div className="flex flex-col justify-between text-xs mr-3 h-20">
                            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                              <div
                                key={day}
                                className={`${darkMode ? "text-slate-400" : "text-slate-600"} leading-none`}
                              >
                                {day}
                              </div>
                            ))}
                          </div>

                          {/* Contribution grid */}
                          <div className="flex space-x-1">
                            {githubData.user.contributionsCollection.contributionCalendar.weeks.map(
                              (week, weekIndex) => (
                                <div key={weekIndex} className="flex flex-col space-y-1">
                                  {week.contributionDays.map((day, dayIndex) => (
                                    <motion.div
                                      key={`${weekIndex}-${dayIndex}`}
                                      className={`w-3 h-3 rounded-sm ${getContributionColor(day.contributionCount)} hover:ring-1 hover:ring-white/50 transition-all cursor-pointer`}
                                      title={`${day.contributionCount} contributions on ${day.date}`}
                                      whileHover={{ scale: 1.2 }}
                                    />
                                  ))}
                                </div>
                              ),
                            )}
                          </div>
                        </div>

                        {/* Legend */}
                        <div className="flex items-center justify-between mt-4 text-xs">
                          <span className={darkMode ? "text-slate-400" : "text-slate-600"}>Less</span>
                          <div className="flex items-center space-x-1">
                            <div className={`w-3 h-3 rounded-sm ${getContributionColor(0)}`}></div>
                            <div className={`w-3 h-3 rounded-sm ${getContributionColor(1)}`}></div>
                            <div className={`w-3 h-3 rounded-sm ${getContributionColor(4)}`}></div>
                            <div className={`w-3 h-3 rounded-sm ${getContributionColor(7)}`}></div>
                            <div className={`w-3 h-3 rounded-sm ${getContributionColor(10)}`}></div>
                          </div>
                          <span className={darkMode ? "text-slate-400" : "text-slate-600"}>More</span>
                        </div>
                      </div>
                    </div>

                    {/* Top Repositories */}
                    <div className="mt-8">
                      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-slate-900"}`}>
                        Top Repositories
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {githubData.repositories.slice(0, 4).map((repo) => (
                          <motion.a
                            key={repo.name}
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-4 rounded-lg border transition-all duration-300 hover:scale-105 ${
                              darkMode
                                ? "bg-white/5 border-slate-700 hover:border-blue-500/50"
                                : "bg-white/50 border-slate-200 hover:border-blue-500/50"
                            }`}
                            whileHover={{ y: -5 }}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className={`font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}>
                                {repo.name}
                              </h4>
                              <div className="flex items-center gap-2 text-sm">
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3" />
                                  {repo.stargazerCount}
                                </div>
                                <div className="flex items-center gap-1">
                                  <GitBranch className="w-3 h-3" />
                                  {repo.forkCount}
                                </div>
                              </div>
                            </div>
                            <p className={`text-sm mb-3 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                              {repo.description || "No description available"}
                            </p>
                            {repo.primaryLanguage && (
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: repo.primaryLanguage.color }}
                                />
                                <span className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                                  {repo.primaryLanguage.name}
                                </span>
                              </div>
                            )}
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className={darkMode ? "text-slate-400" : "text-slate-600"}>
                      Unable to load GitHub data. Please check your connection.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? "text-white" : "text-slate-900"}`}
            >
              Featured Projects
            </motion.h2>
            <motion.p variants={fadeInUp} className={`text-xl ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
              Some of my recent work that I&apos;m proud of
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                title: "E-Commerce Platform",
                description: "Full-stack e-commerce solution with React, Node.js, and PostgreSQL",
                tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
                image: "/placeholder.svg?height=200&width=300",
              },
              {
                title: "Task Management App",
                description: "Collaborative task management with real-time updates",
                tech: ["Next.js", "Socket.io", "MongoDB", "Tailwind"],
                image: "/placeholder.svg?height=200&width=300",
              },
              {
                title: "AI Chat Application",
                description: "AI-powered chat application with natural language processing",
                tech: ["Python", "FastAPI", "OpenAI", "React"],
                image: "/placeholder.svg?height=200&width=300",
              },
            ].map((project) => (
              <motion.div
                key={project.title}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="group"
              >
                <Card
                  className={`backdrop-blur-sm border transition-all duration-300 overflow-hidden ${
                    darkMode
                      ? "bg-white/5 border-slate-700 hover:border-blue-500/50"
                      : "bg-white/50 border-slate-200 hover:border-blue-500/50"
                  }`}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Button
                      size="sm"
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                  <CardHeader>
                    <CardTitle className={darkMode ? "text-white" : "text-slate-900"}>{project.title}</CardTitle>
                    <CardDescription className={darkMode ? "text-slate-400" : "text-slate-600"}>
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Hire Me Section */}
      <section id="hireme" className={`py-20 ${darkMode ? "bg-slate-900/20" : "bg-slate-100/50"}`}>
        <div className="container mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? "text-white" : "text-slate-900"}`}
            >
              Hire Me
            </motion.h2>
            <motion.p variants={fadeInUp} className={`text-xl ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
              Ready to bring your ideas to life? Let&apos;s work together!
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <Card
                className={`backdrop-blur-sm border ${
                  darkMode ? "bg-white/5 border-slate-700" : "bg-white/50 border-slate-200"
                }`}
              >
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${darkMode ? "text-white" : "text-slate-900"}`}>
                    <DollarSign className="w-6 h-6 text-green-500" />
                    Pricing & Services
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center p-6 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-blue-500" />
                      <span className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}>Hourly Rate</span>
                    </div>
                    <div className={`text-4xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}>$19</div>
                    <div className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}>per hour</div>
                  </div>

                  <div className="space-y-4">
                    <h4 className={`font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}>What you get:</h4>
                    {[
                      "Full-stack web development",
                      "Modern React & Next.js applications",
                      "Backend API development",
                      "Database design & optimization",
                      "Code reviews & mentoring",
                      "24/7 communication during projects",
                    ].map((service, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className={darkMode ? "text-slate-300" : "text-slate-600"}>{service}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-700">
                    <div className="space-y-3">
                      {[
                        { icon: MapPin, label: "Location", value: "Available Worldwide" },
                      ].map((contact) => (
                        <motion.div key={contact.label} className="flex items-center space-x-3" whileHover={{ x: 5 }}>
                          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <contact.icon className="w-4 h-4 text-blue-500" />
                          </div>
                          <div>
                            <div className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                              {contact.label}
                            </div>
                            <div className={`text-sm ${darkMode ? "text-white" : "text-slate-900"}`}>
                              {contact.value}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <Card
                className={`backdrop-blur-sm border ${
                  darkMode ? "bg-white/5 border-slate-700" : "bg-white/50 border-slate-200"
                }`}
              >
                <CardHeader>
                  <CardTitle className={darkMode ? "text-white" : "text-slate-900"}>Start Your Project</CardTitle>
                  <CardDescription className={darkMode ? "text-slate-400" : "text-slate-600"}>
                    Tell me about your project and let&apos;s get started!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Your Name"
                        className={`backdrop-blur-sm border transition-colors ${
                          darkMode
                            ? "bg-white/5 border-slate-600 text-white placeholder:text-slate-400"
                            : "bg-white/50 border-slate-300 text-slate-900 placeholder:text-slate-500"
                        }`}
                      />
                      <Input
                        placeholder="Your Email"
                        type="email"
                        className={`backdrop-blur-sm border transition-colors ${
                          darkMode
                            ? "bg-white/5 border-slate-600 text-white placeholder:text-slate-400"
                            : "bg-white/50 border-slate-300 text-slate-900 placeholder:text-slate-500"
                        }`}
                      />
                    </div>
                    <Input
                      placeholder="Project Budget (USD)"
                      className={`backdrop-blur-sm border transition-colors ${
                        darkMode
                          ? "bg-white/5 border-slate-600 text-white placeholder:text-slate-400"
                          : "bg-white/50 border-slate-300 text-slate-900 placeholder:text-slate-500"
                      }`}
                    />
                    <Textarea
                      placeholder="Tell me about your project..."
                      rows={5}
                      className={`backdrop-blur-sm border transition-colors ${
                        darkMode
                          ? "bg-white/5 border-slate-600 text-white placeholder:text-slate-400"
                          : "bg-white/50 border-slate-300 text-slate-900 placeholder:text-slate-500"
                      }`}
                    />
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                        <Send className="w-4 h-4 mr-2" />
                        Send Project Details
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-8 border-t ${darkMode ? "bg-slate-950/40 border-slate-800" : "bg-white/40 border-slate-200"}`}
      >
        <div className="container mx-auto px-6 text-center">
          <p className={darkMode ? "text-slate-400" : "text-slate-600"}>
            © 2024 Aryan. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  )
}
