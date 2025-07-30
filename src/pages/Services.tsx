import { useState , useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import axios from "axios";
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

type Service = {
  _id: string;
  title: string;
  description: string;
  icon: string;
  createdAt: string;
};

const Services = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const colorMap: Record<string, string> = {
    primary: "bg-gradient-to-r from-blue-500 to-indigo-500",
    error: "bg-gradient-to-r from-red-500 to-pink-500",
    warning: "bg-gradient-to-r from-yellow-400 to-orange-500",
    success: "bg-gradient-to-r from-green-500 to-emerald-500",
  };

 useEffect(() => {
  const fetchServices = async () => {
    try {
      const baseUrl = "https://website-admin-rfup.onrender.com/";
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODllYzIwZjdmZDE2NmI4MGI2NjcyMiIsImlhdCI6MTc1Mzg2OTQ0MiwiZXhwIjoxNzU0MDQyMjQyfQ.JcUk8otGk8G261mRqe_Mwq0GET14A_abM7f4QktRQ8o";

      const res = await axios.get("https://website-admin-rfup.onrender.com/api/services/" ,{
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODllYzIwZjdmZDE2NmI4MGI2NjcyMiIsImlhdCI6MTc1Mzg2OTQ0MiwiZXhwIjoxNzU0MDQyMjQyfQ.JcUk8otGk8G261mRqe_Mwq0GET14A_abM7f4QktRQ8o`,
        },
      });

      console.log("API response data:", res.data);

      const data = Array.isArray(res.data) ? res.data : [res.data];
      setServices(data);
    } catch (error) {
      console.error("Fetch error:", error);
      toast({
        title: "Error",
        description: "Failed to load services.",
      });
    } finally {
      setLoading(false);
    }
  };

  fetchServices();
}, []);

  const filteredServices = (services || []).filter((service) =>
  service.title.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground">Your fetched services from the backend</p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-hover">
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Service Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredServices.map((service) => (
          <Card key={service._id} className="shadow-card hover:shadow-hover transition-all duration-300">
            <CardHeader className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <div className="text-2xl">{service.icon || "🛠️"}</div>
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </div>
              <Badge variant="outline" className="text-xs">
                {new Date(service.createdAt).toLocaleDateString()}
              </Badge>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {service.description}
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="text-red-500">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {!loading && filteredServices.length === 0 && (
        <p className="text-muted-foreground">No services found.</p>
      )}
    </div>
  );
};

export default Services;