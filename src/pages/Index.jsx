import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cat, Heart, Info, Paw, Star, ArrowRight } from "lucide-react";

const CatBreed = ({ name, description, icon, rating }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="mb-4 hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            {icon}
            {name}
          </span>
          <div className="flex items-center">
            {[...Array(rating)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
            ))}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
        <Button variant="link" className="mt-2 p-0">
          Learn more <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  </motion.div>
);

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const catBreeds = [
    { name: "Siamese", description: "Known for their distinctive color points and blue eyes.", icon: <Cat className="h-5 w-5 text-blue-500" />, rating: 5 },
    { name: "Maine Coon", description: "One of the largest domestic cat breeds, known for their intelligence and playful personality.", icon: <Cat className="h-5 w-5 text-orange-500" />, rating: 4 },
    { name: "Persian", description: "Recognized for their long fur and flat faces.", icon: <Cat className="h-5 w-5 text-gray-500" />, rating: 4 },
  ];

  const catImages = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/1200px-Kittyply_edit1.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % catImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold mb-6 text-center text-purple-800"
        >
          All About Cats <Heart className="inline-block text-pink-500" />
        </motion.h1>

        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 relative h-[400px] rounded-lg overflow-hidden"
        >
          <img
            src={catImages[currentImageIndex]}
            alt={`Cat ${currentImageIndex + 1}`}
            className="mx-auto object-cover w-full h-full"
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {catImages.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentImageIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="breeds">Breeds</TabsTrigger>
            <TabsTrigger value="care">Care Tips</TabsTrigger>
          </TabsList>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="overview">
                <Card>
                  <CardHeader>
                    <CardTitle>Feline Fascination</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl text-gray-700">
                      Cats are fascinating creatures that have been domesticated for thousands of years. They are known for their
                      independence, agility, and affectionate nature. Cats come in various breeds, each with its unique
                      characteristics and personalities.
                    </p>
                    <motion.div
                      className="mt-4"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <Button>Learn More About Cats</Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="breeds">
                <h2 className="text-2xl font-semibold mb-4 text-purple-800">Popular Cat Breeds</h2>
                {catBreeds.map((breed, index) => (
                  <CatBreed key={index} {...breed} />
                ))}
              </TabsContent>
              <TabsContent value="care">
                <Card>
                  <CardHeader>
                    <CardTitle>Cat Care Essentials</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-none pl-5 space-y-4">
                      {[
                        { text: "Provide a balanced diet", icon: "🍽️" },
                        { text: "Regular veterinary check-ups", icon: "🩺" },
                        { text: "Keep the litter box clean", icon: "🧹" },
                        { text: "Offer mental and physical stimulation", icon: "🧠" },
                        { text: "Show love and affection", icon: "❤️" },
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center"
                        >
                          <span className="mr-2 text-2xl">{item.icon}</span>
                          {item.text}
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>

        <motion.div
          className="flex justify-center space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {[
            { icon: <Paw className="mr-1 h-4 w-4" />, text: "Playful" },
            { icon: <Heart className="mr-1 h-4 w-4" />, text: "Affectionate" },
            { icon: <Info className="mr-1 h-4 w-4" />, text: "Intelligent" },
          ].map((badge, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Badge variant="secondary" className="text-sm py-2 px-4">
                {badge.icon} {badge.text}
              </Badge>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
