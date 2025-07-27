import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  Activity
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "$54,230",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "primary"
    },
    {
      title: "Active Clients",
      value: "1,234",
      change: "+8.2%",
      trend: "up", 
      icon: Users,
      color: "success"
    },
    {
      title: "Services Running",
      value: "98",
      change: "+3.1%",
      trend: "up",
      icon: Server,
      color: "warning"
    },
    {
      title: "Pending Inquiries",
      value: "23",
      change: "-2.4%",
      trend: "down",
      icon: MessageSquare,
      color: "error"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "service",
      title: "Cloud Infrastructure Setup",
      client: "TechCorp Inc.",
      status: "completed",
      time: "2 hours ago"
    },
    {
      id: 2,
      type: "inquiry",
      title: "New Support Request",
      client: "Innovation Labs",
      status: "pending",
      time: "4 hours ago"
    },
    {
      id: 3,
      type: "client",
      title: "Client Onboarding",
      client: "StartupXYZ",
      status: "in-progress",
      time: "6 hours ago"
    },
    {
      id: 4,
      type: "service",
      title: "Security Audit Completed",
      client: "MegaCorp Ltd.",
      status: "completed",
      time: "1 day ago"
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: "Server Maintenance",
      priority: "high",
      dueDate: "Today, 3:00 PM",
      client: "Global Systems"
    },
    {
      id: 2,
      title: "Client Meeting",
      priority: "medium",
      dueDate: "Tomorrow, 10:00 AM",
      client: "TechStart Inc."
    },
    {
      id: 3,
      title: "Security Review",
      priority: "high",
      dueDate: "Dec 28, 2:00 PM",
      client: "Enterprise Corp"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "pending":
        return <Clock className="h-4 w-4 text-warning" />;
      case "in-progress":
        return <Activity className="h-4 w-4 text-primary" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: "bg-gradient-error text-error-foreground",
      medium: "bg-gradient-warning text-warning-foreground", 
      low: "bg-gradient-success text-success-foreground"
    };
    return variants[priority as keyof typeof variants] || variants.medium;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your IT services.</p>
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-hover transition-all duration-300 border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-${stat.color}`}>
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
                <span className={stat.trend === "up" ? "text-success" : "text-error"}>
                  {stat.change}
                </span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activities */}
        <Card className="shadow-card border-0 hover:shadow-hover transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activities
            </CardTitle>
            <CardDescription>Latest updates from your IT services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-all duration-200">
                <div className="flex items-center gap-3">
                  {getStatusIcon(activity.status)}
                  <div>
                    <p className="font-medium text-sm">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.client}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge 
                    variant="secondary"
                    className={`text-xs ${
                      activity.status === "completed" ? "bg-success/10 text-success" :
                      activity.status === "pending" ? "bg-warning/10 text-warning" :
                      "bg-primary/10 text-primary"
                    }`}
                  >
                    {activity.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="shadow-card border-0 hover:shadow-hover transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Upcoming Tasks
            </CardTitle>
            <CardDescription>Tasks that need your attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-all duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <div>
                    <p className="font-medium text-sm">{task.title}</p>
                    <p className="text-xs text-muted-foreground">{task.client}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={`text-xs ${getPriorityBadge(task.priority)}`}>
                    {task.priority}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{task.dueDate}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used actions for your IT services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col gap-2 hover:shadow-card transition-all duration-300">
              <Server className="h-6 w-6" />
              <span className="text-sm">Add Service</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 hover:shadow-card transition-all duration-300">
              <Users className="h-6 w-6" />
              <span className="text-sm">New Client</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 hover:shadow-card transition-all duration-300">
              <MessageSquare className="h-6 w-6" />
              <span className="text-sm">View Inquiries</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 hover:shadow-card transition-all duration-300">
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