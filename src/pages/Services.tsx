import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Server,
  Shield,
  Cloud,
  Monitor,
  Smartphone,
  Database,
  Filter
} from "lucide-react";

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const services = [
    {
      id: 1,
      name: "Cloud Infrastructure",
      description: "Complete cloud setup and management services",
      category: "Infrastructure",
      price: "$299/month",
      status: "active",
      clients: 45,
      icon: Cloud,
      features: ["24/7 Monitoring", "Auto Scaling", "Backup & Recovery"]
    },
    {
      id: 2,
      name: "Cybersecurity Suite",
      description: "Advanced security solutions and threat protection",
      category: "Security",
      price: "$199/month",
      status: "active",
      clients: 32,
      icon: Shield,
      features: ["Threat Detection", "Firewall Management", "Security Audits"]
    },
    {
      id: 3,
      name: "Network Management",
      description: "Complete network setup and maintenance",
      category: "Networking",
      price: "$149/month",
      status: "active",
      clients: 28,
      icon: Server,
      features: ["Network Monitoring", "Performance Optimization", "Troubleshooting"]
    },
    {
      id: 4,
      name: "IT Support",
      description: "24/7 technical support and helpdesk services",
      category: "Support",
      price: "$99/month",
      status: "active",
      clients: 67,
      icon: Monitor,
      features: ["24/7 Support", "Remote Assistance", "Ticket Management"]
    },
    {
      id: 5,
      name: "Mobile Device Management",
      description: "Enterprise mobile device security and management",
      category: "Mobile",
      price: "$79/month",
      status: "draft",
      clients: 12,
      icon: Smartphone,
      features: ["Device Security", "App Management", "Remote Wipe"]
    },
    {
      id: 6,
      name: "Database Management",
      description: "Database optimization and maintenance services",
      category: "Database",
      price: "$259/month",
      status: "active",
      clients: 18,
      icon: Database,
      features: ["Performance Tuning", "Backup Solutions", "Migration Services"]
    }
  ];

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-gradient-success text-success-foreground">Active</Badge>;
      case "draft":
        return <Badge className="bg-gradient-warning text-warning-foreground">Draft</Badge>;
      case "inactive":
        return <Badge className="bg-gradient-error text-error-foreground">Inactive</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Infrastructure: "bg-blue-500/10 text-blue-600 border-blue-200",
      Security: "bg-red-500/10 text-red-600 border-red-200",
      Networking: "bg-green-500/10 text-green-600 border-green-200",
      Support: "bg-purple-500/10 text-purple-600 border-purple-200",
      Mobile: "bg-orange-500/10 text-orange-600 border-orange-200",
      Database: "bg-indigo-500/10 text-indigo-600 border-indigo-200"
    };
    return colors[category as keyof typeof colors] || "bg-gray-500/10 text-gray-600 border-gray-200";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground">Manage your IT services and offerings</p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-hover transition-all duration-300">
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-card border-0">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Services Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredServices.map((service) => (
          <Card key={service.id} className="shadow-card border-0 hover:shadow-hover transition-all duration-300 group">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-primary">
                    <service.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <Badge 
                      variant="outline" 
                      className={`text-xs mt-1 ${getCategoryColor(service.category)}`}
                    >
                      {service.category}
                    </Badge>
                  </div>
                </div>
                {getStatusBadge(service.status)}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <CardDescription className="text-sm leading-relaxed">
                {service.description}
              </CardDescription>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Key Features:</h4>
                <div className="flex flex-wrap gap-1">
                  {service.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <div>
                  <p className="text-lg font-bold text-primary">{service.price}</p>
                  <p className="text-xs text-muted-foreground">{service.clients} clients</p>
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-destructive hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Statistics Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-card border-0">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{services.length}</div>
              <p className="text-sm text-muted-foreground">Total Services</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card border-0">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">
                {services.filter(s => s.status === "active").length}
              </div>
              <p className="text-sm text-muted-foreground">Active Services</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card border-0">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">
                {services.filter(s => s.status === "draft").length}
              </div>
              <p className="text-sm text-muted-foreground">Draft Services</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card border-0">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                {services.reduce((sum, service) => sum + service.clients, 0)}
              </div>
              <p className="text-sm text-muted-foreground">Total Clients</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Services;