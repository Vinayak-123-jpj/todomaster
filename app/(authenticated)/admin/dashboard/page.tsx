"use client";

import { useState, useCallback, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { TodoItem } from "@/components/TodoItem";
import { Todo, User } from "@prisma/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/Pagination";
import { useDebounceValue } from "usehooks-ts";
import { Search, Loader2, Shield, User as UserIcon, Calendar, Crown, CheckCircle2, XCircle } from "lucide-react";

interface UserWithTodos extends User {
  todos: Todo[];
}

export default function AdminDashboard() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [debouncedEmail, setDebouncedEmail] = useDebounceValue("", 300);
  const [user, setUser] = useState<UserWithTodos | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUserData = useCallback(
    async (page: number) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/admin?email=${debouncedEmail}&page=${page}`
        );
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();
        setUser(data.user);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch user data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [debouncedEmail, toast]
  );

  useEffect(() => {
    if (debouncedEmail) {
      fetchUserData(1);
    }
  }, [debouncedEmail, fetchUserData]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setDebouncedEmail(email);
  };

  const handleUpdateSubscription = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/admin", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: debouncedEmail,
          isSubscribed: !user?.isSubscribed,
        }),
      });
      if (!response.ok) throw new Error("Failed to update subscription");
      await fetchUserData(currentPage);
      toast({
        title: "Success",
        description: "Subscription updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateTodo = async (id: string, completed: boolean) => {
    try {
      const response = await fetch("/api/admin", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: debouncedEmail,
          todoId: id,
          todoCompleted: completed,
        }),
      });
      if (!response.ok) throw new Error("Failed to update todo");
      await fetchUserData(currentPage);
      toast({ title: "Success", description: "Todo updated successfully." });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update todo. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      const response = await fetch("/api/admin", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todoId: id }),
      });
      if (!response.ok) throw new Error("Failed to delete todo");
      await fetchUserData(currentPage);
      toast({ title: "Success", description: "Todo deleted successfully." });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete todo. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage users and subscriptions</p>
            </div>
          </div>
        </div>

        {/* Search Card */}
        <Card className="mb-6 border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Search User</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter user email"
                  className="pl-10"
                  required
                  aria-label="User email"
                />
              </div>
              <Button type="submit" disabled={isLoading} className="transition-all hover:scale-105">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Content */}
        {isLoading ? (
          <Card className="border-border/50 shadow-sm">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Searching for user...</p>
            </CardContent>
          </Card>
        ) : user ? (
          <>
            {/* User Details Card */}
            <Card className="mb-6 border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <UserIcon className="h-5 w-5" />
                  User Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <UserIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium truncate">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${user.isSubscribed ? 'bg-green-500/10' : 'bg-muted'}`}>
                    {user.isSubscribed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted-foreground">Subscription Status</p>
                    <p className={`font-medium ${user.isSubscribed ? 'text-green-600' : 'text-muted-foreground'}`}>
                      {user.isSubscribed ? 'Pro Plan' : 'Free Plan'}
                    </p>
                  </div>
                </div>

                {user.subscriptionEnds && (
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground">Subscription Ends</p>
                      <p className="font-medium">{new Date(user.subscriptionEnds).toLocaleDateString()}</p>
                    </div>
                  </div>
                )}

                <Button 
                  onClick={handleUpdateSubscription} 
                  className="w-full transition-all hover:scale-105"
                  disabled={isSubmitting}
                  variant={user.isSubscribed ? "destructive" : "default"}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      {user.isSubscribed ? (
                        <>
                          <XCircle className="mr-2 h-4 w-4" />
                          Cancel Subscription
                        </>
                      ) : (
                        <>
                          <Crown className="mr-2 h-4 w-4" />
                          Subscribe User
                        </>
                      )}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* User Todos Card */}
            {user.todos.length > 0 ? (
              <Card className="border-border/50 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl">User Tasks ({user.todos.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {user.todos.map((todo) => (
                      <TodoItem
                        key={todo.id}
                        todo={todo}
                        isAdmin={true}
                        onUpdate={handleUpdateTodo}
                        onDelete={handleDeleteTodo}
                        disabled={isSubmitting}
                      />
                    ))}
                  </ul>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => fetchUserData(page)}
                    disabled={isSubmitting}
                  />
                </CardContent>
              </Card>
            ) : (
              <Card className="border-border/50 shadow-sm">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No tasks yet</h3>
                  <p className="text-muted-foreground max-w-sm">
                    This user hasn&apos;t created any tasks yet.
                  </p>
                </CardContent>
              </Card>
            )}
          </>
        ) : debouncedEmail ? (
          <Card className="border-border/50 shadow-sm">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <UserIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">User not found</h3>
              <p className="text-muted-foreground max-w-sm">
                No user found with this email address. Please check and try again.
              </p>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
