"use client";

import { motion } from "motion/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

import Image from "next/image";

interface HeroProps {
  signupCount: number;
}

export function Hero({ signupCount }: HeroProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = (await response.json()) as { error: string };

      if (response.ok) {
        toast({
          title: "Welcome to the waitlist! 🎉",
          description: "You'll be notified when we launch.",
        });
        setEmail("");
      } else {
        toast({
          title: "Oops!",
          description:
            (data as { error: string }).error ||
            "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Network error",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)] supports-[height:100dvh]:min-h-[calc(100dvh-4.5rem)] flex flex-col justify-between items-center text-center px-4 sm:px-6">
      <Image
        className="absolute top-0 left-0 -z-50 size-full object-cover"
        src="/landing-page-bg.png"
        height={1903.5}
        width={1269}
        alt="landing-page.bg"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-3xl mx-auto w-full flex-1 flex flex-col justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-block font-bold tracking-tighter text-3xl sm:text-4xl md:text-[4rem]"
        >
          <h1>The Open Source</h1>
          <div className="flex justify-center gap-2 sm:gap-4 leading-[3rem] sm:leading-[4rem] mt-1 md:mt-2">
            <div className="relative -rotate-[2.76deg] max-w-[200px] sm:max-w-[250px] md:max-w-[454px] mt-1 sm:mt-2">
              <Image src="/frame.svg" height={79} width={459} alt="frame" />
              <span className="absolute inset-0 flex items-center justify-center text-sm sm:text-base md:text-[1em]">
                Video Editor
              </span>
            </div>
          </div>
        </motion.div>

        <motion.p
          className="mt-6 sm:mt-8 md:mt-10 text-sm sm:text-base md:text-xl text-muted-foreground font-light tracking-wide max-w-sm sm:max-w-xl mx-auto px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          A simple but powerful video editor that gets the job done. Works on
          any platform.
        </motion.p>

        <motion.div
          className="mt-8 sm:mt-10 md:mt-12 flex gap-8 justify-center px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 sm:gap-3 w-full max-w-lg flex-col sm:flex-row"
          >
            <div className="relative w-full">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-10 sm:h-11 text-sm sm:text-base flex-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                required
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="px-4 sm:px-6 h-10 sm:h-11 text-sm sm:text-base !bg-foreground"
              disabled={isSubmitting}
            >
              <span className="relative z-10">
                {isSubmitting ? "Joining..." : "Join waitlist"}
              </span>
              <ArrowRight className="relative z-10 ml-0.5 h-4 w-4 inline-block" />
            </Button>
          </form>
        </motion.div>

        {signupCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground justify-center"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>{signupCount.toLocaleString()} people already joined</span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
