import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * @typedef {Object} Client
 * @property {string} id
 * @property {string} name
 * @property {string} avatar
 * @property {string} date
 * @property {string} dueDate
 * @property {number} amount
 * @property {number} sent
 * @property {'paid' | 'unpaid' | 'draft' | 'overdue'} status
 */

/**
 * @typedef {Object} Invoice
 * @property {string} id
 * @property {string} invoiceId
 * @property {string} dateSent
 * @property {number} amount
 * @property {string} plan
 * @property {'paid' | 'unpaid' | 'draft' | 'overdue'} status
 */

const clients = [
  {
    id: "1",
    name: "Darlene Robertson",
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: "1/15/12",
    dueDate: "8/2/15",
    amount: 200,
    sent: 2,
    status: "paid",
  },
  {
    id: "2",
    name: "Jacob Jones",
    avatar:
      "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: "8/30/14",
    dueDate: "5/27/15",
    amount: 500,
    sent: 1,
    status: "unpaid",
  },
  {
    id: "3",
    name: "Annette Black",
    avatar:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: "8/2/19",
    dueDate: "2/11/12",
    amount: 1000,
    sent: 2,
    status: "paid",
  },
  {
    id: "4",
    name: "Bessie Cooper",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: "6/19/14",
    dueDate: "10/6/13",
    amount: 100,
    sent: 5,
    status: "draft",
  },
  {
    id: "5",
    name: "Marvin McKinney",
    avatar:
      "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: "2/11/12",
    dueDate: "9/18/16",
    amount: 500,
    sent: 6,
    status: "overdue",
  },
];

const invoices = [
  {
    id: "1",
    invoiceId: "WEST1000342578-001",
    dateSent: "August 2, 2019",
    amount: 80000,
    plan: "Premium Monthly",
    status: "paid",
  },
  {
    id: "2",
    invoiceId: "WEST1000342578-001",
    dateSent: "October 30, 2017",
    amount: 80000,
    plan: "Premium Monthly",
    status: "paid",
  },
  {
    id: "3",
    invoiceId: "WEST1000342578-001",
    dateSent: "May 20, 2018",
    amount: 20000,
    plan: "Premium Monthly",
    status: "draft",
  },
  {
    id: "4",
    invoiceId: "WEST1000342582-001",
    dateSent: "February 28, 2012",
    amount: 100000,
    plan: "Premium Monthly",
    status: "paid",
  },
];

export default function PaymentsBilling() {
  const [selectedClients, setSelectedClients] = useState([]);
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPlan, setFilterPlan] = useState("All");

  const getStatusBadge = (status) => {
    const statusStyles = {
      paid: "bg-green-100 text-green-800",
      unpaid: "bg-yellow-100 text-yellow-800",
      draft: "bg-gray-100 text-gray-800",
      overdue: "bg-red-100 text-red-800",
    };

    return (
      <Badge variant="outline" className={cn("text-xs", statusStyles[status])}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleClientSelect = (clientId) => {
    setSelectedClients((prev) =>
      prev.includes(clientId)
        ? prev.filter((id) => id !== clientId)
        : [...prev, clientId]
    );
  };

  const handleInvoiceSelect = (invoiceId) => {
    setSelectedInvoices((prev) =>
      prev.includes(invoiceId)
        ? prev.filter((id) => id !== invoiceId)
        : [...prev, invoiceId]
    );
  };

  const filteredClients = clients.filter((client) => {
    const matchesStatus =
      filterStatus === "All" || client.status === filterStatus.toLowerCase();
    const matchesSearch = client.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesStatus =
      filterStatus === "All" || invoice.status === filterStatus.toLowerCase();
    const matchesPlan = filterPlan === "All" || invoice.plan === filterPlan;
    const matchesSearch = invoice.invoiceId
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesStatus && matchesPlan && matchesSearch;
  });

  return (
    <div className="space-y-6 h-full overflow-y-auto">
      {/* Statistics Cards */}
      <div className="grid grid-cols-4 gap-6 flex-shrink-0">
        <Card className="bg-green-50 border-green-200">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <CardTitle className="text-sm font-medium text-green-800">
                Paid
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">170</div>
            <p className="text-xs text-green-600">value: $30,000</p>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <CardTitle className="text-sm font-medium text-yellow-800">
                Unpaid
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-800">10</div>
            <p className="text-xs text-yellow-600">value: $9,000</p>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <CardTitle className="text-sm font-medium text-red-800">
                Overdue
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-800">2</div>
            <p className="text-xs text-red-600">value: $30,000</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-50 border-gray-200">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <CardTitle className="text-sm font-medium text-gray-800">
                Draft
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">20</div>
            <p className="text-xs text-gray-600">value: $90,000</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex space-x-4 flex-shrink-0 ">
        <div className="relative w-64 ">
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 bg-gray-50 border-gray-200 text-sm"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All, Paid, Unpaid, Draft, Overdue" />
          </SelectTrigger>
          <SelectContent className={"bg-white"}>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="unpaid">Unpaid</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterPlan} onValueChange={setFilterPlan}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Plans" />
          </SelectTrigger>
          <SelectContent className={"bg-white"}>
            <SelectItem value="All">All Plans</SelectItem>
            <SelectItem value="Premium Monthly">Premium Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Client Table */}
      <Card className="flex-shrink-0">
        <CardHeader>
          <CardTitle>Client</CardTitle>
          <p className="text-sm text-gray-600">
            Effortlessly manage your billing and invoices right here
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-purple-600 hover:bg-purple-600">
                  <TableHead className="text-white">
                    <Checkbox className="border-white data-[state=checked]:bg-white data-[state=checked]:text-purple-600" />
                  </TableHead>
                  <TableHead className="text-white">Client</TableHead>
                  <TableHead className="text-white">Create</TableHead>
                  <TableHead className="text-white">Due</TableHead>
                  <TableHead className="text-white">Amount</TableHead>
                  <TableHead className="text-white">Sent</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedClients.includes(client.id)}
                        onCheckedChange={() => handleClientSelect(client.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={client.avatar} />
                          <AvatarFallback>
                            {client.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{client.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{client.date}</TableCell>
                    <TableCell>{client.dueDate}</TableCell>
                    <TableCell>${client.amount.toLocaleString()}</TableCell>
                    <TableCell>{client.sent}</TableCell>
                    <TableCell>{getStatusBadge(client.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between mt-4">
            <Button variant="ghost" size="sm" className="text-purple-600">
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            <Button variant="ghost" size="sm" className="text-purple-600">
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card className="flex-shrink-0">
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
          <p className="text-sm text-gray-600">
            Effortlessly manage your billing and invoices right here
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-purple-600 hover:bg-purple-600">
                  <TableHead className="text-white">
                    <Checkbox className="border-white data-[state=checked]:bg-white data-[state=checked]:text-purple-600" />
                  </TableHead>
                  <TableHead className="text-white">Invoice ID</TableHead>
                  <TableHead className="text-white">Date Sent</TableHead>
                  <TableHead className="text-white">Amount</TableHead>
                  <TableHead className="text-white">Plan</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                  <TableHead className="text-white">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedInvoices.includes(invoice.id)}
                        onCheckedChange={() => handleInvoiceSelect(invoice.id)}
                      />
                    </TableCell>
                    <TableCell>{invoice.invoiceId}</TableCell>
                    <TableCell>{invoice.dateSent}</TableCell>
                    <TableCell>${invoice.amount.toLocaleString()}</TableCell>
                    <TableCell>{invoice.plan}</TableCell>
                    <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 text-gray-600" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4 text-gray-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between mt-4">
            <Button variant="ghost" size="sm" className="text-purple-600">
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            <Button variant="ghost" size="sm" className="text-purple-600">
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
