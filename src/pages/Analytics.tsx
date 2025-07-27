import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown,
  BarChart3, 
  PieChart,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Users,
  DollarSign,
  Server,
  Activity
} from "lucide-react";

const Analytics = () => {
  const metrics = [
    {
      title: "Revenue Growth",
      value: "+23.5%",
      trend: "up",
      description: "vs last month",
      chart: "📈"
    },
    {
      title: "Client Satisfaction",
      value: "94.2%",
      trend: "up", 
      description: "Average rating",
      chart: "⭐"
    },
    {
      title: "Service Uptime",
      value: "99.8%",
      trend: "up",
      description: "This month",
      chart: "🔧"
    },
    {
      title: "Response Time",
      value: "2.3 hrs",
      trend: "down",
      description: "Average",
      chart: "⚡"
    }
  ];

  const serviceMetrics = [
    { name: "Cloud Infrastructure", clients: 45, revenue: "$13,455", growth: "+12%" },
    { name: "Cybersecurity Suite", clients: 32, revenue: "$6,368", growth: "+8%" },
    { name: "IT Support", clients: 67, revenue: "$6,633", growth: "+15%" },
    { name: "Network Management", clients: 28, revenue: "$4,172", growth: "+5%" },
    { name: "Database Management", clients: 18, revenue: "$4,662", growth: "+18%" }
  ];

  const clientActivity = [
    { month: "Jul", clients: 85, revenue: 28000 },
    { month: "Aug", clients: 92, revenue: 31000 },
    { month: "Sep", clients: 88, revenue: 29500 },
    { month: "Oct", clients: 105, revenue: 35000 },
    { month: "Nov", clients: 118, revenue: 42000 },
    { month: "Dec", clients: 125, revenue: 48000 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Comprehensive insights into your IT services performance</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="h-4 w-4" />
            Last 30 days
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button className="bg-gradient-primary hover:shadow-hover transition-all duration-300 gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title} className="shadow-card border-0 hover:shadow-hover transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 text-success mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-success mr-1" />
                    )}
                    <span>{metric.description}</span>
                  </div>
                </div>
                <div className="text-2xl">{metric.chart}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <Card className="shadow-card border-0 hover:shadow-hover transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Revenue Trends
            </CardTitle>
            <CardDescription>Monthly revenue and client growth</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clientActivity.map((data, index) => (
                <div key={data.month} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <span className="text-xs font-bold text-primary-foreground">{data.month}</span>
                    </div>
                    <div>
                      <p className="font-medium">{data.clients} Clients</p>
                      <p className="text-sm text-muted-foreground">${data.revenue.toLocaleString()} Revenue</p>
                    </div>
                  </div>
                  <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-primary transition-all duration-500"
                      style={{ width: `${(data.revenue / 50000) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Service Performance */}
        <Card className="shadow-card border-0 hover:shadow-hover transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Service Performance
            </CardTitle>
            <CardDescription>Revenue breakdown by service type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {serviceMetrics.map((service, index) => (
                <div key={service.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      index === 0 ? 'bg-primary' :
                      index === 1 ? 'bg-success' :
                      index === 2 ? 'bg-warning' :
                      index === 3 ? 'bg-error' : 'bg-muted-foreground'
                    }`}></div>
                    <div>
                      <p className="font-medium text-sm">{service.name}</p>
                      <p className="text-xs text-muted-foreground">{service.clients} clients</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">{service.revenue}</p>
                    <Badge 
                      variant="secondary"
                      className="text-xs bg-success/10 text-success"
                    >
                      {service.growth}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Client Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Enterprise</span>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="w-8/12 h-full bg-gradient-primary"></div>
                  </div>
                  <span className="text-sm font-medium">45%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">SMB</span>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="w-6/12 h-full bg-gradient-success"></div>
                  </div>
                  <span className="text-sm font-medium">35%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Startup</span>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="w-4/12 h-full bg-gradient-warning"></div>
                  </div>
                  <span className="text-sm font-medium">20%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Server Uptime</span>
                <Badge className="bg-gradient-success text-success-foreground">99.9%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Response Time</span>
                <Badge className="bg-gradient-success text-success-foreground">Fast</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Security Status</span>
                <Badge className="bg-gradient-success text-success-foreground">Secure</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Backup Status</span>
                <Badge className="bg-gradient-success text-success-foreground">Current</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Financial Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Monthly Revenue</span>
                <span className="font-bold">$48,230</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">YTD Revenue</span>
                <span className="font-bold">$425,650</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Profit Margin</span>
                <span className="font-bold text-success">34.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Growth Rate</span>
                <span className="font-bold text-success">+18.5%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;