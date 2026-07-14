import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CheckSquare, Clock, Github, Twitter, Facebook, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function Home() {
  const { userId } = auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-16 md:py-24 flex-grow">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            <span>Boost your productivity today</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-foreground/70">
            Master Your Tasks with TodoMaster
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            The ultimate task management solution for professionals and teams. Stay organized, focused, and productive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg h-12 px-8 transition-all hover:scale-105">
              <Link href="/sign-up">Get Started Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg h-12 px-8 transition-all hover:scale-105">
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto mb-16 md:mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to stay organized</h2>
            <p className="text-muted-foreground text-lg">Powerful features designed for modern workflows</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <CheckSquare className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Smart Organization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Effortlessly categorize and prioritize tasks with our intuitive interface designed for clarity and speed.
                </p>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Real-time Sync</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Access your tasks anywhere with instant synchronization across all your devices. Never lose track again.
                </p>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Team Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Share tasks and collaborate seamlessly with your team. Stay aligned and achieve goals together.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Testimonials */}
        <div className="max-w-4xl mx-auto mb-16 md:mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by thousands</h2>
            <p className="text-muted-foreground text-lg">See what our users have to say</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-border/50">
              <CardContent className="p-6">
                <blockquote className="text-base text-muted-foreground leading-relaxed mb-4">
                  &ldquo;TodoMaster has transformed the way our team manages projects. It&apos;s intuitive, powerful, and indispensable!&rdquo;
                </blockquote>
                <footer className="font-semibold text-foreground">
                  Sarah J. — Project Manager
                </footer>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-6">
                <blockquote className="text-base text-muted-foreground leading-relaxed mb-4">
                  &ldquo;I&apos;ve tried many task management apps, but TodoMaster is by far the best. It&apos;s boosted my productivity tenfold!&rdquo;
                </blockquote>
                <footer className="font-semibold text-foreground">
                  Mark T. — Entrepreneur
                </footer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary to-primary/90 border-0">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary-foreground">Ready to boost your productivity?</h2>
            <p className="text-primary-foreground/90 mb-6 text-lg">Join thousands of users who have already transformed their workflow.</p>
            <Button asChild size="lg" variant="secondary" className="text-lg h-12 px-8 transition-all hover:scale-105">
              <Link href="/sign-up">Start Free Today</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <CheckSquare className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">TodoMaster</span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-accent"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-accent"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-accent"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; 2024 TodoMaster. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
