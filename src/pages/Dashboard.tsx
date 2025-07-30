"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Users,
  Server,
  MessageSquare,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Activity,
} from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const colorMap: Record<string, string> = {
    primary: "bg-gradient-to-r from-blue-500 to-indigo-500",
    error: "bg-gradient-to-r from-red-500 to-pink-500",
    warning: "bg-gradient-to-r from-yellow-400 to-orange-500",
    success: "bg-gradient-to-r from-green-500 to-emerald-500",
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "https://website-admin-rfup.onrender.com/api/dashboard/stats",
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODllYzIwZjdmZDE2NmI4MGI2NjcyMiIsImlhdCI6MTc1Mzg2OTQ0MiwiZXhwIjoxNzU0MDQyMjQyfQ.JcUk8otGk8G261mRqe_Mwq0GET14A_abM7f4QktRQ8o`,
            },
          }
        );

        const data = res.data.data;

        const processedStats = [
          {
            title: "Total Projects",
            value: data.projects.total,
            change: `+${data.projects.last7Days}`,
            trend: "up",
            icon: Server,
            color: "primary",
          },
          {
            title: "Pending Projects",
            value: data.projects.pending,
            change: data.projects.pending > 0 ? "+%" : "-%",
            trend: data.projects.pending > 0 ? "up" : "down",
            icon: AlertCircle,
            color: "error",
          },
          {
            title: "Total Services",
            value: data.services,
            change: "+0%",
            trend: "up",
            icon: DollarSign,
            color: "warning",
          },
          {
            title: "Messages (7 days)",
            value: data.messages.last7Days,
            change: "+0%",
            trend: "up",
            icon: MessageSquare,
            color: "success",
          },
          {
            title: "Team Members",
            value: data.team,
            change: "+0%",
            trend: "up",
            icon: Users,
            color: "primary",
          },
          {
            title: "Blogs",
            value: data.blogs,
            change: "+0%",
            trend: "up",
            icon: Activity,
            color: "primary",
          },
        ];

        setStats(processedStats);
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your IT services.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <TrendingUp className="h-4 w-4 mr-2" />
            View Reports
          </Button>
          <Button className="bg-gradient-primary hover:shadow-hover transition-all duration-300">
            <Users className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      {loading ? (
        <p>Loading stats...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card
              key={`${stat.title}-${index}`}
              className="hover:shadow-hover transition-all duration-300 border-0 shadow-card"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${colorMap[stat.color]}`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3 text-success mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-error mr-1" />
                  )}
                  <span
                    className={stat.trend === "up" ? "text-success" : "text-error"}
                  >
                    {stat.change}
                  </span>
                  <span className="ml-1">from last week</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Frequently used actions for your IT services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 hover:shadow-card transition-all duration-300"
            >
              <Server className="h-6 w-6" />
              <span className="text-sm">Add Service</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 hover:shadow-card transition-all duration-300"
            >
              <Users className="h-6 w-6" />
              <span className="text-sm">New Client</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 hover:shadow-card transition-all duration-300"
            >
              <MessageSquare className="h-6 w-6" />
              <span className="text-sm">View Inquiries</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 hover:shadow-card transition-all duration-300"
            >
              <TrendingUp className="h-6 w-6" />
              <span className="text-sm">Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
