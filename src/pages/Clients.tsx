import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Building2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Filter,
  MoreHorizontal
} from "lucide-react";

const Clients = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterIndustry, setFilterIndustry] = useState("all");
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<any>(null);
  const [viewingClient, setViewingClient] = useState<any>(null);

  const [clients, setClients] = useState([
    {
      id: 1,
      name: "TechCorp Inc.",
      email: "contact@techcorp.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      joinDate: "2023-01-15",
      totalSpent: "$12,450",
      services: ["Cloud Infrastructure", "Cybersecurity"],
      status: "active",
      avatar: "TC",
      industry: "Technology"
    },
    {
      id: 2,
      name: "Innovation Labs",
      email: "hello@innovationlabs.io",
      phone: "+1 (555) 234-5678",
      location: "San Francisco, CA",
      joinDate: "2023-03-22",
      totalSpent: "$8,920",
      services: ["IT Support", "Network Management"],
      status: "active",
      avatar: "IL",
      industry: "Research"
    },
    {
      id: 3,
      name: "StartupXYZ",
      email: "team@startupxyz.com",
      phone: "+1 (555) 345-6789",
      location: "Austin, TX",
      joinDate: "2023-06-10",
      totalSpent: "$5,670",
      services: ["Cloud Infrastructure"],
      status: "pending",
      avatar: "SX",
      industry: "Startup"
    },
    {
      id: 4,
      name: "MegaCorp Ltd.",
      email: "it@megacorp.com",
      phone: "+1 (555) 456-7890",
      location: "Chicago, IL",
      joinDate: "2022-11-08",
      totalSpent: "$25,890",
      services: ["Cybersecurity", "Database Management", "IT Support"],
      status: "active",
      avatar: "MC",
      industry: "Enterprise"
    },
    {
      id: 5,
      name: "Global Systems",
      email: "admin@globalsys.com",
      phone: "+1 (555) 567-8901",
      location: "Seattle, WA",
      joinDate: "2023-02-14",
      totalSpent: "$18,340",
      services: ["Network Management", "Cloud Infrastructure"],
      status: "active",
      avatar: "GS",
      industry: "Consulting"
    },
    {
      id: 6,
      name: "Enterprise Corp",
      email: "support@enterprise.com",
      phone: "+1 (555) 678-9012",
      location: "Boston, MA",
      joinDate: "2023-04-30",
      totalSpent: "$9,760",
      services: ["IT Support"],
      status: "inactive",
      avatar: "EC",
      industry: "Manufacturing"
    }
  ]);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
      industry: "",
      services: ""
    }
  });

  const handleAddClient = (data: any) => {
    const newClient = {
      id: clients.length + 1,
      name: data.name,
      email: data.email,
      phone: data.phone,
      location: data.location,
      joinDate: new Date().toISOString().split('T')[0],
      totalSpent: "$0",
      services: data.services.split(',').map((s: string) => s.trim()),
      status: "active",
      avatar: data.name.split(' ').map((n: string) => n[0]).join(''),
      industry: data.industry
    };
    setClients(prev => [...prev, newClient]);
    setIsAddClientOpen(false);
    form.reset();
    toast({
      title: "Success",
      description: "Client added successfully!",
    });
  };

  const handleDeleteClient = (clientId: number) => {
    setClients(prev => prev.filter(client => client.id !== clientId));
    toast({
      title: "Success",
      description: "Client deleted successfully!",
    });
  };

  const handleFilter = () => {
    const industries = ["all", "Technology", "Research", "Startup", "Enterprise", "Consulting", "Manufacturing"];
    const currentIndex = industries.indexOf(filterIndustry);
    const nextIndex = (currentIndex + 1) % industries.length;
    setFilterIndustry(industries[nextIndex]);
    toast({
      title: "Filter Applied",
      description: `Showing ${industries[nextIndex]} clients`,
    });
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterIndustry === "all" || client.industry === filterIndustry;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-gradient-success text-success-foreground">Active</Badge>;
      case "pending":
        return <Badge className="bg-gradient-warning text-warning-foreground">Pending</Badge>;
      case "inactive":
        return <Badge className="bg-gradient-error text-error-foreground">Inactive</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getIndustryColor = (industry: string) => {
    const colors = {
      Technology: "bg-blue-500/10 text-blue-600",
      Research: "bg-purple-500/10 text-purple-600",
      Startup: "bg-green-500/10 text-green-600",
      Enterprise: "bg-red-500/10 text-red-600",
      Consulting: "bg-orange-500/10 text-orange-600",
      Manufacturing: "bg-indigo-500/10 text-indigo-600"
    };
    return colors[industry as keyof typeof colors] || "bg-gray-500/10 text-gray-600";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="text-muted-foreground">Manage your client relationships and accounts</p>
        </div>
        <Dialog open={isAddClientOpen} onOpenChange={setIsAddClientOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:shadow-hover transition-all duration-300">
              <Plus className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
              <DialogDescription>Add a new client to your system</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddClient)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter company name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="contact@company.com" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 123-4567" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="City, State" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Technology">Technology</SelectItem>
                          <SelectItem value="Research">Research</SelectItem>
                          <SelectItem value="Startup">Startup</SelectItem>
                          <SelectItem value="Enterprise">Enterprise</SelectItem>
                          <SelectItem value="Consulting">Consulting</SelectItem>
                          <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Add Client</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-card border-0">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2" onClick={handleFilter}>
              <Filter className="h-4 w-4" />
              Filter ({filterIndustry})
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Clients Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredClients.map((client) => (
          <Card key={client.id} className="shadow-card border-0 hover:shadow-hover transition-all duration-300 group">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
                      {client.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{client.name}</CardTitle>
                    <Badge 
                      variant="outline" 
                      className={`text-xs mt-1 ${getIndustryColor(client.industry)}`}
                    >
                      {client.industry}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(client.status)}
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{client.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(client.joinDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Active Services:</h4>
                <div className="flex flex-wrap gap-1">
                  {client.services.slice(0, 2).map((service, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                  {client.services.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{client.services.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <span className="font-bold text-primary">{client.totalSpent}</span>
                </div>
                <div className="flex gap-1">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => setViewingClient(client)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => setEditingClient(client)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleDeleteClient(client.id)}
                  >
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
              <div className="text-2xl font-bold text-primary">{clients.length}</div>
              <p className="text-sm text-muted-foreground">Total Clients</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card border-0">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">
                {clients.filter(c => c.status === "active").length}
              </div>
              <p className="text-sm text-muted-foreground">Active Clients</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card border-0">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">
                {clients.filter(c => c.status === "pending").length}
              </div>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card border-0">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                ${clients.reduce((sum, client) => {
                  const amount = parseFloat(client.totalSpent.replace(/[$,]/g, ''));
                  return sum + amount;
                }, 0).toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* View Client Dialog */}
      <Dialog open={!!viewingClient} onOpenChange={() => setViewingClient(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{viewingClient?.name}</DialogTitle>
            <DialogDescription>Client details and information</DialogDescription>
          </DialogHeader>
          {viewingClient && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Contact Information</h4>
                <p className="text-sm text-muted-foreground">{viewingClient.email}</p>
                <p className="text-sm text-muted-foreground">{viewingClient.phone}</p>
                <p className="text-sm text-muted-foreground">{viewingClient.location}</p>
              </div>
              <div>
                <h4 className="font-medium">Industry</h4>
                <p className="text-sm text-muted-foreground">{viewingClient.industry}</p>
              </div>
              <div>
                <h4 className="font-medium">Total Spent</h4>
                <p className="text-sm text-muted-foreground">{viewingClient.totalSpent}</p>
              </div>
              <div>
                <h4 className="font-medium">Active Services</h4>
                <div className="flex flex-wrap gap-1 mt-1">
                  {viewingClient.services?.map((service: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Clients;