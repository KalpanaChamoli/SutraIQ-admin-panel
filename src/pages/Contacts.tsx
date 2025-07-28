import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Reply, 
  Archive, 
  Trash2,
  Mail,
  Phone,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  User,
  Filter,
  Star,
  MoreHorizontal
} from "lucide-react";

const Contacts = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [replyingTo, setReplyingTo] = useState<any>(null);
  const [replyMessage, setReplyMessage] = useState("");

  const [inquiries, setInquiries] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      phone: "+1 (555) 123-4567",
      company: "Digital Innovations",
      subject: "Cloud Migration Services",
      message: "We're looking to migrate our current infrastructure to the cloud. Can you provide a consultation and quote?",
      priority: "high",
      status: "new",
      createdAt: "2023-12-20T10:30:00Z",
      avatar: "SJ",
      category: "Cloud Services"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@techstart.io",
      phone: "+1 (555) 234-5678",
      company: "TechStart Solutions",
      subject: "IT Support Package",
      message: "Our startup needs ongoing IT support. What packages do you offer for small businesses?",
      priority: "medium",
      status: "in-progress",
      createdAt: "2023-12-19T14:20:00Z",
      avatar: "MC",
      category: "Support"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.r@globalcorp.com",
      phone: "+1 (555) 345-6789",
      company: "GlobalCorp Enterprise",
      subject: "Security Audit Request",
      message: "We need a comprehensive security audit for our enterprise systems. Please provide timeline and pricing.",
      priority: "high",
      status: "responded",
      createdAt: "2023-12-18T16:45:00Z",
      avatar: "ER",
      category: "Security"
    },
    {
      id: 4,
      name: "David Park",
      email: "david@innovatetech.com",
      phone: "+1 (555) 456-7890",
      company: "InnovateTech Labs",
      subject: "Database Management",
      message: "Looking for managed database services for our research platform. Do you handle PostgreSQL and MongoDB?",
      priority: "medium",
      status: "new",
      createdAt: "2023-12-17T11:15:00Z",
      avatar: "DP",
      category: "Database"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      email: "lisa.thompson@retailplus.com",
      phone: "+1 (555) 567-8901",
      company: "RetailPlus Inc.",
      subject: "Network Infrastructure",
      message: "We're expanding to 5 new locations and need network setup. Can you handle multi-site deployments?",
      priority: "low",
      status: "closed",
      createdAt: "2023-12-16T09:30:00Z",
      avatar: "LT",
      category: "Networking"
    },
    {
      id: 6,
      name: "James Wilson",
      email: "j.wilson@manufacorp.com",
      phone: "+1 (555) 678-9012",
      company: "ManufaCorp",
      subject: "Cybersecurity Consultation",
      message: "Recent security incidents have made us realize we need better protection. Can we schedule a consultation?",
      priority: "high",
      status: "in-progress",
      createdAt: "2023-12-15T13:20:00Z",
      avatar: "JW",
      category: "Security"
    }
  ]);

  const handleReply = (inquiry: any) => {
    setReplyingTo(inquiry);
    setReplyDialogOpen(true);
  };

  const handleSendReply = () => {
    setInquiries(prev => prev.map(inquiry => 
      inquiry.id === replyingTo.id 
        ? { ...inquiry, status: "responded" }
        : inquiry
    ));
    setReplyDialogOpen(false);
    setReplyMessage("");
    toast({
      title: "Success",
      description: "Reply sent successfully!",
    });
  };

  const handleDelete = (inquiryId: number) => {
    setInquiries(prev => prev.filter(inquiry => inquiry.id !== inquiryId));
    toast({
      title: "Success",
      description: "Inquiry deleted successfully!",
    });
  };

  const handleStar = (inquiryId: number) => {
    toast({
      title: "Success",
      description: "Inquiry starred!",
    });
  };

  const handleArchive = (inquiryId: number) => {
    setInquiries(prev => prev.map(inquiry => 
      inquiry.id === inquiryId 
        ? { ...inquiry, status: "closed" }
        : inquiry
    ));
    toast({
      title: "Success",
      description: "Inquiry archived!",
    });
  };

  const handleArchiveAll = () => {
    setInquiries(prev => prev.map(inquiry => ({ ...inquiry, status: "closed" })));
    toast({
      title: "Success",
      description: "All inquiries archived!",
    });
  };

  const handleBulkReply = () => {
    const activeInquiries = inquiries.filter(i => i.status === "new" || i.status === "in-progress");
    setInquiries(prev => prev.map(inquiry => 
      activeInquiries.includes(inquiry) 
        ? { ...inquiry, status: "responded" }
        : inquiry
    ));
    toast({
      title: "Success",
      description: `Bulk reply sent to ${activeInquiries.length} inquiries!`,
    });
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inquiry.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inquiry.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedTab === "all") return matchesSearch;
    return matchesSearch && inquiry.status === selectedTab;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-gradient-primary text-primary-foreground">New</Badge>;
      case "in-progress":
        return <Badge className="bg-gradient-warning text-warning-foreground">In Progress</Badge>;
      case "responded":
        return <Badge className="bg-gradient-success text-success-foreground">Responded</Badge>;
      case "closed":
        return <Badge variant="secondary">Closed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-gradient-error text-error-foreground">High</Badge>;
      case "medium":
        return <Badge className="bg-gradient-warning text-warning-foreground">Medium</Badge>;
      case "low":
        return <Badge className="bg-gradient-success text-success-foreground">Low</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="h-4 w-4 text-error" />;
      case "medium":
        return <Clock className="h-4 w-4 text-warning" />;
      case "low":
        return <CheckCircle className="h-4 w-4 text-success" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  const tabs = [
    { id: "all", label: "All", count: inquiries.length },
    { id: "new", label: "New", count: inquiries.filter(i => i.status === "new").length },
    { id: "in-progress", label: "In Progress", count: inquiries.filter(i => i.status === "in-progress").length },
    { id: "responded", label: "Responded", count: inquiries.filter(i => i.status === "responded").length },
    { id: "closed", label: "Closed", count: inquiries.filter(i => i.status === "closed").length }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contact Inquiries</h1>
          <p className="text-muted-foreground">Manage customer inquiries and support requests</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={handleArchiveAll}>
            <Archive className="h-4 w-4" />
            Archive All
          </Button>
          <Button className="bg-gradient-primary hover:shadow-hover transition-all duration-300 gap-2" onClick={handleBulkReply}>
            <Reply className="h-4 w-4" />
            Bulk Reply
          </Button>
        </div>
      </div>

      {/* Tabs and Search */}
      <Card className="shadow-card border-0">
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Status Tabs */}
            <div className="flex space-x-1 bg-muted p-1 rounded-lg">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    selectedTab === tab.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
            
            {/* Search */}
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search inquiries..."
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
          </div>
        </CardContent>
      </Card>

      {/* Inquiries List */}
      <div className="space-y-4">
        {filteredInquiries.map((inquiry) => (
          <Card key={inquiry.id} className="shadow-card border-0 hover:shadow-hover transition-all duration-300 group">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12 flex-shrink-0">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
                    {inquiry.avatar}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{inquiry.name}</h3>
                        <span className="text-sm text-muted-foreground">from {inquiry.company}</span>
                        {getPriorityIcon(inquiry.priority)}
                      </div>
                      <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(inquiry.status)}
                      {getPriorityBadge(inquiry.priority)}
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="mb-3">
                    <h4 className="font-medium mb-1">{inquiry.subject}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">{inquiry.message}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        <span>{inquiry.category}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(inquiry.createdAt)}</span>
                      </div>
                      {inquiry.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          <span>{inquiry.phone}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-8 gap-2"
                        onClick={() => handleReply(inquiry)}
                      >
                        <Reply className="h-4 w-4" />
                        Reply
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleStar(inquiry.id)}
                      >
                        <Star className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleArchive(inquiry.id)}
                      >
                        <Archive className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(inquiry.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
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
              <div className="text-2xl font-bold text-primary">{inquiries.length}</div>
              <p className="text-sm text-muted-foreground">Total Inquiries</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card border-0">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">
                {inquiries.filter(i => i.status === "new").length}
              </div>
              <p className="text-sm text-muted-foreground">New Inquiries</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card border-0">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-error">
                {inquiries.filter(i => i.priority === "high").length}
              </div>
              <p className="text-sm text-muted-foreground">High Priority</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card border-0">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">
                {inquiries.filter(i => i.status === "responded").length}
              </div>
              <p className="text-sm text-muted-foreground">Responded</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reply Dialog */}
      <Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reply to {replyingTo?.name}</DialogTitle>
            <DialogDescription>
              Replying to: {replyingTo?.subject}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Message</label>
              <Textarea
                placeholder="Type your reply..."
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReplyDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendReply}>
              Send Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Contacts;