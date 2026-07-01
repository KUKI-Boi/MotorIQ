import { PageContainer, PageHeader } from '@/components/PageContainer'
import { Section, SectionHeader, Grid, Card, CardHeader, CardTitle, CardContent, Divider, Stack } from '@/components/ui/layout'
import { Button } from '@/components/ui/button/Button'
import { IconButton } from '@/components/ui/button/IconButton'
import { Fab } from '@/components/ui/button/Fab'
import { MetricCard, CompactMetric } from '@/components/ui/metric'
import { HealthBadge, Chip, Tag } from '@/components/ui/status'
import { Input, Label } from '@/components/ui/form/Input'
import { Switch } from '@/components/ui/form/Switch'
import { Checkbox } from '@/components/ui/form/Checkbox'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/feedback/Alert'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/data/Table'
import { EmptyState } from '@/components/ui/empty/EmptyState'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog/Dialog'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/navigation/Tabs'
import { Typography } from '@/components/ui/typography/Typography'
import { Textarea } from '@/components/ui/form/Textarea'
import { Banner } from '@/components/ui/feedback/Banner'
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/dialog/Tooltip'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/dialog/Popover'
import { SegmentedControl } from '@/components/ui/navigation/SegmentedControl'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/navigation/Breadcrumb'
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from '@/components/ui/navigation/Pagination'
import { Drawer } from '@/components/ui/dialog/Drawer'
import { Fade, SlideUp, HoverLift } from '@/components/ui/animation'
import { Activity, Plus, Settings, ShieldAlert, Cpu, Download, Search, Info } from 'lucide-react'
import { useState } from 'react'

export default function ComponentsShowcase() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [segment, setSegment] = useState("daily")

  return (
    <PageContainer>
      <PageHeader title="Design System" subtitle="MotorIQ Reusable UI Components Showcase" />
      <div className="text-sm bg-info/10 text-info p-4 rounded-xl border border-info/20 mb-8 font-medium">
        This route is for development purposes only. It showcases every reusable UI component built during Milestone 3.
      </div>

      <Section>
        <SectionHeader title="Design Tokens" description="Typography scales and global colors." />
        <Grid cols={2}>
          <Card>
            <CardHeader><CardTitle>Typography</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Typography variant="heading">Heading</Typography>
              <Typography variant="subheading">Subheading</Typography>
              <Typography variant="body">Body Text. The quick brown fox jumps.</Typography>
              <Typography variant="caption">Caption text</Typography>
              <Typography variant="label">Label Text</Typography>
              <Typography variant="monospace">Mono</Typography>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Colors</CardTitle></CardHeader>
            <CardContent>
              <Stack direction="row" className="flex-wrap gap-2">
                <div className="w-10 h-10 rounded bg-primary" title="Primary" />
                <div className="w-10 h-10 rounded bg-secondary" title="Secondary" />
                <div className="w-10 h-10 rounded bg-accent" title="Accent" />
                <div className="w-10 h-10 rounded bg-success" title="Success" />
                <div className="w-10 h-10 rounded bg-warning" title="Warning" />
                <div className="w-10 h-10 rounded bg-danger" title="Danger" />
                <div className="w-10 h-10 rounded bg-info" title="Info" />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Section>
      <Divider />
      
      {/* 1. Layout & Cards */}
      <Section>
        <SectionHeader title="Layout & Cards" description="Responsive grids and structural containers." />
        <Grid cols={3}>
          <Card>
            <CardHeader><CardTitle>Standard Card</CardTitle></CardHeader>
            <CardContent>A simple, reusable surface for displaying grouped content.</CardContent>
          </Card>
          <Card className="bg-primary text-white border-transparent">
            <CardHeader><CardTitle className="text-white">Highlighted Card</CardTitle></CardHeader>
            <CardContent className="text-white/80">Useful for calling attention to a specific feature or warning.</CardContent>
          </Card>
          <Card className="border-danger/30 bg-danger/5">
            <CardHeader><CardTitle className="text-danger">Danger Card</CardTitle></CardHeader>
            <CardContent className="text-danger/80">Used for critical system faults or destructive actions.</CardContent>
          </Card>
        </Grid>
      </Section>
      <Divider />

      {/* 2. Buttons */}
      <Section>
        <SectionHeader title="Buttons" description="Interactive triggers across the application." />
        <Stack direction="row" className="flex-wrap items-center">
          <Button variant="primary">Primary Action</Button>
          <Button variant="secondary">Secondary Action</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="danger">Stop Motor</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="link">Documentation</Button>
        </Stack>
        <Stack direction="row" className="flex-wrap items-center mt-4">
          <Button size="sm">Small Size</Button>
          <Button size="default">Default Size</Button>
          <Button size="lg">Large Size</Button>
          <IconButton icon={Settings} variant="outline" />
          <IconButton icon={Download} variant="primary" />
        </Stack>
      </Section>
      <Divider />

      {/* 3. Metrics */}
      <Section>
        <SectionHeader title="Metrics & Telemetry" description="Components for visualizing real-time ESP32 data." />
        <Grid cols={3}>
          <MetricCard title="Motor Speed" value="1,450" unit="RPM" icon={Activity} trend={{ trend: 'up', value: '+12 RPM' }} />
          <MetricCard title="Input Voltage" value="24.5" unit="V" icon={Cpu} trend={{ trend: 'neutral', value: 'Stable' }} />
          <MetricCard title="System Temp" value="45" unit="°C" icon={ShieldAlert} trend={{ trend: 'down', value: '-2 °C' }} />
        </Grid>
        <div className="mt-6 w-full max-w-sm">
          <CompactMetric title="CPU Load" value="85" unit="%" trend={{ trend: 'up', value: 'High' }} />
        </div>
      </Section>
      <Divider />

      {/* 4. Badges & Status */}
      <Section>
        <SectionHeader title="Badges & Status" description="Visual indicators of system state." />
        <Stack direction="row" className="flex-wrap items-center">
          <HealthBadge label="Online" variant="success" />
          <HealthBadge label="Warning" variant="warning" />
          <HealthBadge label="Fault" variant="danger" />
          <HealthBadge label="Offline" variant="neutral" />
          <HealthBadge label="Updating" variant="info" />
        </Stack>
        <Stack direction="row" className="flex-wrap items-center mt-4">
          <Chip label="Firmware v1.2" />
          <Chip label="Filter: Logs" onDelete={() => {}} />
          <Tag label="BETA" />
          <Tag label="NEW" />
        </Stack>
      </Section>
      <Divider />

      {/* 5. Forms */}
      <Section>
        <SectionHeader title="Form Controls" description="Accessible inputs for tuning and settings." />
        <Grid cols={2} className="max-w-4xl">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search Logs</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-text-secondary" />
                <Input id="search" placeholder="Type to search..." className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pid-p">Proportional Gain (Kp)</Label>
              <Input id="pid-p" type="number" defaultValue={1.5} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Enter session notes..." />
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-card border border-navigation/60 rounded-xl">
              <div className="space-y-0.5">
                <Label>Auto-tuning</Label>
                <p className="text-xs text-text-secondary">Enable PID auto-calibration</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center space-x-3 p-4 bg-card border border-navigation/60 rounded-xl">
              <Checkbox id="terms" />
              <div className="space-y-1 leading-none">
                <Label htmlFor="terms">Accept limits override</Label>
                <p className="text-xs text-text-secondary">Allow operator to bypass safety RPM limits.</p>
              </div>
            </div>
          </div>
        </Grid>
      </Section>
      <Divider />

      {/* 6. Feedback & Alerts */}
      <Section>
        <SectionHeader title="Feedback & Alerts" description="Communicating system events to the user." />
        <div className="mb-4 space-y-2">
          <Banner variant="info" onClose={() => {}}>
            <Info className="w-5 h-5" /> Motor Firmware v2.0 is available for OTA update.
          </Banner>
          <Banner variant="danger">
            <ShieldAlert className="w-5 h-5" /> Critical Error: ESP32 connection lost.
          </Banner>
        </div>
        <Grid cols={2}>
          <Alert variant="default">
            <AlertTitle>Update Available</AlertTitle>
            <AlertDescription>Motor controller firmware v1.3 is ready to install.</AlertDescription>
          </Alert>
          <Alert variant="danger">
            <AlertTitle>Thermal Runaway Detected</AlertTitle>
            <AlertDescription>Motor temperature exceeded 85°C. System halted.</AlertDescription>
          </Alert>
          <Alert variant="warning">
            <AlertTitle>High Current Draw</AlertTitle>
            <AlertDescription>Motor is drawing 15A which is above the 12A threshold.</AlertDescription>
          </Alert>
          <Alert variant="success">
            <AlertTitle>Calibration Complete</AlertTitle>
            <AlertDescription>PID loop has been successfully auto-tuned.</AlertDescription>
          </Alert>
        </Grid>
      </Section>
      <Divider />

      {/* 7. Dialogs & Tabs */}
      <Section>
        <SectionHeader title="Dialogs & Navigation" />
        <Grid cols={2}>
          <Card className="p-6 flex flex-col items-start gap-4">
            <h4 className="font-semibold text-text-primary">Dialog Primitive</h4>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Open Settings Modal</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Network Settings</DialogTitle>
                  <DialogDescription>Make changes to the ESP32 WiFi configuration here.</DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                  <div className="space-y-2">
                    <Label>SSID</Label>
                    <Input defaultValue="Factory_IoT_Net" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button variant="primary">Save Changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Card>
          <Card className="p-6">
            <Tabs defaultValue="account">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">General</TabsTrigger>
                <TabsTrigger value="password">Security</TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="text-sm text-text-secondary mt-4">
                General settings panel content goes here.
              </TabsContent>
              <TabsContent value="password" className="text-sm text-text-secondary mt-4">
                Security settings panel content goes here.
              </TabsContent>
            </Tabs>
          </Card>
        </Grid>
        <Grid cols={2} className="mt-6">
          <Card className="p-6">
            <h4 className="font-semibold text-text-primary mb-4">Popover & Tooltip</h4>
            <Stack direction="row" className="gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Hover Me</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    This is a highly accessible tooltip.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Open Popover</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <h4 className="font-semibold mb-2">Options</h4>
                  <p className="text-sm text-text-secondary">Configure your advanced settings here.</p>
                </PopoverContent>
              </Popover>
            </Stack>
          </Card>

          <Card className="p-6">
            <h4 className="font-semibold text-text-primary mb-4">Drawer Component</h4>
            <Button onClick={() => setDrawerOpen(true)}>Open Right Drawer</Button>
            <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} side="right">
              <h2 className="text-xl font-sora font-semibold mb-4">Drawer Title</h2>
              <p className="text-sm text-text-secondary">This drawer slides in from the right edge smoothly using Framer Motion.</p>
            </Drawer>
          </Card>
        </Grid>
      </Section>
      <Divider />

      <Section>
        <SectionHeader title="Advanced Navigation" />
        <Grid cols={2}>
          <Card className="p-6">
            <h4 className="font-semibold text-text-primary mb-4">Breadcrumb</h4>
            <Breadcrumb>
              <BreadcrumbItem><BreadcrumbLink href="#">Dashboard</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink href="#">Settings</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem isCurrentPage>Network</BreadcrumbItem>
            </Breadcrumb>
          </Card>
          <Card className="p-6">
            <h4 className="font-semibold text-text-primary mb-4">Segmented Control</h4>
            <SegmentedControl 
              value={segment} 
              onValueChange={setSegment} 
              options={[
                { label: 'Daily', value: 'daily' },
                { label: 'Weekly', value: 'weekly' },
                { label: 'Monthly', value: 'monthly' },
              ]} 
            />
          </Card>
        </Grid>
        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
              <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
              <PaginationItem><PaginationNext href="#" /></PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </Section>
      <Divider />

      {/* 8. Data Display */}
      <Section>
        <SectionHeader title="Data Tables" description="Displaying dense arrays of information." />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Event Type</TableHead>
              <TableHead>Value</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">10:45:21 AM</TableCell>
              <TableCell>Speed Setpoint</TableCell>
              <TableCell>1,500 RPM</TableCell>
              <TableCell className="text-right"><HealthBadge label="OK" variant="success" /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">10:42:05 AM</TableCell>
              <TableCell>Temp Warning</TableCell>
              <TableCell>82 °C</TableCell>
              <TableCell className="text-right"><HealthBadge label="WARN" variant="warning" /></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Section>
      
      <Section>
        <SectionHeader title="Empty States" />
        <EmptyState 
          icon={Search} 
          title="No events found" 
          description="There are no logs matching your current filter criteria. Try adjusting the search." 
          action={<Button variant="outline">Clear Filters</Button>}
        />
      </Section>

      {/* Floating FAB Demo */}
      <Fab icon={Plus} title="Add Widget" />
    </PageContainer>
  )
}
