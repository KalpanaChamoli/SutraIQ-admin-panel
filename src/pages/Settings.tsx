import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Settings as SettingsIcon, 
  User, 
  Mail, 
  Bell, 
  Shield, 
  Palette, 
  Globe,
  Save,
  Upload,
  Key,
  Database,
  Monitor
} from "lucide-react";

const Settings = () => {
  const { toast } = useToast();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    inquiries: true,
    alerts: true,
    reports: false,
    marketing: false
  });
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account and application preferences</p>
        </div>
        <div className="flex gap-2">
          <Button 
            className="bg-gradient-primary hover:shadow-hover transition-all duration-300"
            onClick={() => toast({ title: "Success", description: "Settings saved successfully!" })}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
          <Button 
            variant="destructive" 
            onClick={() => setLogoutDialogOpen(true)}
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>Update your personal information and profile details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-foreground">JD</span>
                </div>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2"
                    onClick={() => {
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = 'image/*';
                      input.onchange = () => {
                        toast({ title: "Success", description: "Photo uploaded successfully!" });
                      };
                      input.click();
                    }}
                  >
                    <Upload className="h-4 w-4" />
                    Upload Photo
                  </Button>
                  <p className="text-xs text-muted-foreground">JPG, PNG up to 2MB</p>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="john.doe@itzenith.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" placeholder="Tell us about yourself..." />
              </div>
            </CardContent>
          </Card>

          {/* Company Settings */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Company Information
              </CardTitle>
              <CardDescription>Manage your company details and branding</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" defaultValue="IT Zenith" />
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" defaultValue="https://itzenith.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" defaultValue="+1 (555) 123-4567" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" placeholder="Company address..." />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security & Privacy
              </CardTitle>
              <CardDescription>Manage your security preferences and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Switch 
                    checked={twoFactorEnabled}
                    onCheckedChange={(checked) => {
                      setTwoFactorEnabled(checked);
                      toast({ 
                        title: checked ? "Enabled" : "Disabled", 
                        description: `Two-factor authentication ${checked ? "enabled" : "disabled"}!` 
                      });
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Login Notifications</p>
                    <p className="text-sm text-muted-foreground">Get notified of new logins</p>
                  </div>
                  <Switch 
                    checked={notifications.email}
                    onCheckedChange={(checked) => {
                      setNotifications(prev => ({ ...prev, email: checked }));
                      toast({ 
                        title: checked ? "Enabled" : "Disabled", 
                        description: `Login notifications ${checked ? "enabled" : "disabled"}!` 
                      });
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Notification Settings */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription>Configure your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Email Notifications</p>
                    <p className="text-xs text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Switch 
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">New Client Inquiries</p>
                    <p className="text-xs text-muted-foreground">Get notified instantly</p>
                  </div>
                  <Switch 
                    checked={notifications.inquiries}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, inquiries: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Service Alerts</p>
                    <p className="text-xs text-muted-foreground">System status updates</p>
                  </div>
                  <Switch 
                    checked={notifications.alerts}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, alerts: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Weekly Reports</p>
                    <p className="text-xs text-muted-foreground">Performance summaries</p>
                  </div>
                  <Switch 
                    checked={notifications.reports}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, reports: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Marketing Updates</p>
                    <p className="text-xs text-muted-foreground">Product news and tips</p>
                  </div>
                  <Switch 
                    checked={notifications.marketing}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, marketing: checked }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Theme Settings */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Appearance
              </CardTitle>
              <CardDescription>Customize your interface</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-sm mb-2">Theme</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="justify-start">
                      <div className="w-4 h-4 rounded-full bg-background border mr-2"></div>
                      Light
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      <div className="w-4 h-4 rounded-full bg-foreground mr-2"></div>
                      Dark
                    </Button>
                  </div>
                </div>
                
                <div>
                  <p className="font-medium text-sm mb-2">Accent Color</p>
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-primary"></div>
                    <div className="w-6 h-6 rounded-full bg-green-500 border"></div>
                    <div className="w-6 h-6 rounded-full bg-purple-500 border"></div>
                    <div className="w-6 h-6 rounded-full bg-orange-500 border"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Info */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                System Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Version</span>
                <Badge variant="outline">v2.1.4</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Last Updated</span>
                <span className="text-sm">Dec 20, 2023</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Storage Used</span>
                <span className="text-sm">2.4 GB / 10 GB</span>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-3">
                Check for Updates
              </Button>
            </CardContent>
          </Card>

          {/* API Settings */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Access
              </CardTitle>
              <CardDescription>Manage API keys and integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <div className="flex gap-2">
                  <Input id="apiKey" value="sk-..." readOnly className="font-mono text-sm" />
                  <Button variant="outline" size="sm">Copy</Button>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Generate New Key
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to logout? You will need to sign in again to access your account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLogoutDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                toast({ title: "Logged out", description: "You have been logged out successfully!" });
                setLogoutDialogOpen(false);
                // In a real app, this would redirect to login page
              }}
            >
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Settings;